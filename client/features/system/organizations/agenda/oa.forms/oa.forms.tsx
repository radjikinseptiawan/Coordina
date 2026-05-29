"use client";
import { Input } from "@/components/ui/input";
import { UseOrganizationAgendaForms } from "../oa.hooks/oa.hooks";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { OrganizationAgendaSchemaType } from "./oa.schema";
import { ReactNode, useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { createAgenda } from "@/service/organizations/agenda.service";

export default function OrganizationAgendaForms({
  children,
}: {
  children: ReactNode;
}) {
  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
    setValue,
  } = UseOrganizationAgendaForms();
  const slug = usePathname();
  const router = useRouter();
  const isOnline = watch("is_online");
  const location = watch("lokasi");
  const embedUrl = location
    ? `https://www.google.com/maps?q=${encodeURIComponent(
        location,
      )}&output=embed`
    : "";

  const mapLink = `https://www.google.com/maps/search/${location?.replaceAll(" ", "+")}/`;
  useEffect(() => {
    setValue("link_lokasi", mapLink);
  }, [mapLink]);

  const submitForm = async (data: any) => {
    const slugs = slug.split("/");
    console.log("dari form ui", data);
    const response = await createAgenda(data, slugs[1]);
    console.log("hasil response:", response);
    router.push("agenda");
  };
  return (
    <form onSubmit={handleSubmit(submitForm)} className="w-full">
      <div className="flex flex-col md:flex-row md:gap-x-5 w-full justify-center gap-y-4 h-80 overflow-y-auto">
        <div className="flex flex-col gap-y-2">
          <div className="mt-80 md:mt-0">
            <Label>Agenda Name</Label>
            <Input {...register("agenda_name")} />
            {errors.agenda_name && (
              <p className="text-red-500 text-sm">
                {errors.agenda_name.message}
              </p>
            )}
          </div>

          <div>
            <Label>Agenda Date</Label>
            <Input {...register("tanggal_agenda")} type="date" />
            {errors.tanggal_agenda && (
              <p className="text-red-500 text-sm">
                {errors.tanggal_agenda.message}
              </p>
            )}
          </div>

          <div>
            <Label>Note</Label>
            <Textarea {...register("note")} className="resize-none" />
            {errors.note && (
              <p className="text-red-500 text-[12px]">{errors.note.message}</p>
            )}
            <div>
              <div>
                <Label>Start at</Label>
                <Input {...register("start_at")} type="time" />
                {errors.start_at && (
                  <p className="text-red-500 text-[12px]">
                    {errors.start_at.message}
                  </p>
                )}
              </div>

              <div>
                <Label>End at</Label>
                <Input {...register("end_at")} type="time" />
                {errors.end_at && (
                  <p className="text-red-500 text-[12px]">
                    {errors.end_at.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <div>
            <Label>Lampiran</Label>
            <Input type="file" {...register("lampiran")} />
            {/* {errors.lampiran && ( */}
            {/* <p className="text-red-500 text-sm">{errors.la}</p> */}
            {/* )} */}
            <div className="flex gap-2">
              <Label>Type : </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  size={1}
                  {...register("is_online")}
                  value="online"
                  id="online"
                />
                <Label htmlFor="online">Online</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  size={1}
                  {...register("is_online")}
                  value="offline"
                  id="offline"
                />
                <Label htmlFor="offline">Offline</Label>
              </div>
            </div>
            <div>
              {isOnline === "online" && (
                <>
                  <div>
                    <Label>Link</Label>
                    <Input type="text" {...register("meetingLink")} />
                    {errors.meetingLink && (
                      <p className="text-red-500 text-[12px]">
                        {errors.meetingLink.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Room Password</Label>
                    <Input type="text" {...register("password")} />
                    {errors.password && (
                      <p className="text-red-500 text-[12px]">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
            <div>
              {isOnline === "offline" && (
                <div>
                  <Label>Location</Label>
                  <Input type="text" {...register("lokasi")} />
                  {errors.lokasi && (
                    <p className="text-red-500 text-[12px]">
                      {errors.lokasi.message}
                    </p>
                  )}

                  <div className="shadow px-2 py-2 my-2 rounded-md">
                    {embedUrl ? (
                      <iframe
                        src={embedUrl ? embedUrl : ""}
                        width="240"
                        height="150"
                        loading="lazy"
                      ></iframe>
                    ) : (
                      <div className="mx-2 w-[235px] h-[150px]">
                        <p>There`s empty location</p>
                      </div>
                    )}
                  </div>

                  <Label>Link Maps</Label>
                  <Input
                    type="text"
                    value={mapLink}
                    {...register("link_lokasi")}
                  />
                  {errors.link_lokasi && (
                    <p className="text-red-500 text-[12px]">
                      {errors.link_lokasi.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {children}
    </form>
  );
}
