import { DetailAgenda } from "@/_shared/custom/@types/agenda.type";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { convertDate } from "@/lib/utils";
import { agendaSpesific } from "@/service/organizations/agenda.service";
import { Download, Camera, RefreshCw } from "lucide-react";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useRef, useState } from "react";
import BoxLeftComponent from "./oat.box";
import { uploadFile } from "@/lib/uploads";
import { toast } from "sonner";
import axios from "axios";
import { startCamera, takePhoto } from "../oat.hooks/oat.utils";
import {
  createAbsence,
  historyAbsence,
} from "@/service/organizations/attendance.service";
import { PayloadAttendance } from "@/_shared/custom/@types/attendance.type";

const permission = ["PRESENT", "PERMISSION", "ABSENT", "SICK"];

export default function AttendanceOrgCards() {
  const [data, setData] = useState<DetailAgenda>();
  const [index, setIndex] = useState(0);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [editable, setEditable] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const slugs = usePathname();
  const slug = slugs.split("/")[1];
  const params = useSearchParams().get("agenda");

  const cameraRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const submitAttendance = async () => {
    try {
      if (!capturedPhoto) return;

      const response = await fetch(capturedPhoto);
      const blob = await response.blob();

      const file = new File([blob], "attendance.jpg", { type: "image/jpeg" });

      const media = new FormData();
      media.append("image", file);

      const resultUpload = await uploadFile(media);

      const payload: PayloadAttendance = {
        proof_attendance: resultUpload.url as string,
        method: "Photo",
        status: permission[index],
      };

      const res = await createAbsence({ slug, id: params as string, payload });
      console.log(res);
      getDataDetail();
    } catch (e: any) {
      console.error("error Detail:", e);
      toast.error(`${e.response.data.message}!`);
    }
  };

  const getDataDetail = async () => {
    try {
      if (!params || !slug) return;
      const hitResponse = await agendaSpesific(slug, params);
      const result = hitResponse.response.agenda;

      const hitResponse2 = await historyAbsence(slug, params as string);
      const resultData = await hitResponse2.response.attendance;

      setData({
        ...result,
        result: resultData,
      } as DetailAgenda);

      if (
        resultData.proof_attendance == "waiting" ||
        resultData.status == "ABSENT"
      ) {
        setEditable(false);
      } else {
        setEditable(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDataDetail();
  }, []);

  console.log(data);

  return (
    <Card>
      <CardContent className="p-4">
        <CardTitle>{data?.agenda_name}</CardTitle>
        <CardDescription>
          Created By : {data?.user_member_profile?.fullname}
        </CardDescription>
        <hr className="my-2" />

        <div className="flex flex-col justify-center items-center md:justify-between md:flex-row-reverse">
          <div className="flex flex-col items-center">
            {data?.result.status !== "ABSENT" ? (
              <div className="bg-gray-300 my-2 rounded-md w-60 h-72 overflow-hidden flex flex-col items-center justify-center relative">
                <img
                  src={data?.result.proof_attendance}
                  alt="Bukti Absen"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <>
                <div
                  onClick={() =>
                    !isCameraActive && !capturedPhoto
                      ? startCamera({
                          setError,
                          setCapturedPhoto,
                          cameraRef,
                          setIsCameraActive,
                        })
                      : undefined
                  }
                  className={`bg-gray-300 my-2 rounded-md w-60 h-72 overflow-hidden flex flex-col items-center justify-center relative ${
                    !isCameraActive && !capturedPhoto
                      ? "cursor-pointer hover:bg-gray-400 transition-all"
                      : ""
                  }`}
                >
                  {!isCameraActive && !capturedPhoto && (
                    <div className="text-center p-4 text-gray-700 text-sm font-medium pointer-events-none">
                      {error ? (
                        <p className="text-red-500 text-xs">{error}</p>
                      ) : (
                        "Click for take photo"
                      )}
                    </div>
                  )}

                  <video
                    ref={cameraRef}
                    autoPlay
                    playsInline
                    className={`w-full h-full object-cover ${isCameraActive ? "block" : "hidden"}`}
                  />

                  {capturedPhoto && (
                    <img
                      src={capturedPhoto}
                      alt="Absen"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <canvas ref={canvasRef} className="hidden" />

                {isCameraActive && (
                  <Button
                    onClick={() =>
                      takePhoto({
                        cameraRef,
                        canvasRef,
                        setCapturedPhoto,
                        setIsCameraActive,
                      })
                    }
                  >
                    <Camera size={16} /> Take Photo
                  </Button>
                )}

                {capturedPhoto && (
                  <Button
                    onClick={() =>
                      startCamera({
                        setError,
                        setCapturedPhoto,
                        cameraRef,
                        setIsCameraActive,
                      })
                    }
                    variant="outline"
                    className="mt-1 w-60 gap-2"
                  >
                    <RefreshCw size={16} /> Retry
                  </Button>
                )}
              </>
            )}
          </div>

          <BoxLeftComponent data={data as DetailAgenda}>
            <Button
              disabled={editable}
              onClick={() => {
                setIndex((prevIndex) => (prevIndex + 1) % permission.length);
              }}
            >
              {permission[index]}
            </Button>
          </BoxLeftComponent>
        </div>

        <Button disabled={editable} onClick={submitAttendance} className="mt-4">
          {data?.result.status !== "ABSENT" ? "Already absence" : "Submit"}
        </Button>
      </CardContent>
    </Card>
  );
}
