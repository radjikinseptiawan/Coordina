import { Dispatch, RefObject, SetStateAction } from "react";

export const startCamera = async ({
  setError,
  setCapturedPhoto,
  cameraRef,
  setIsCameraActive,
}: {
  setError: Dispatch<SetStateAction<string | null>>;
  setCapturedPhoto: Dispatch<SetStateAction<string | null>>;
  cameraRef: RefObject<HTMLVideoElement | null> | null;
  setIsCameraActive: Dispatch<SetStateAction<boolean>>;
}) => {
  try {
    setError(null);
    setCapturedPhoto(null);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
    });

    if (cameraRef?.current) {
      cameraRef.current.srcObject = stream;
      setIsCameraActive(true);
    }
  } catch (err) {
    console.error(err);
    setError("Cant access camera, please give access!.");
  }
};

export const takePhoto = ({
  cameraRef,
  canvasRef,
  setCapturedPhoto,
  setIsCameraActive,
}: {
  cameraRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  setCapturedPhoto: Dispatch<SetStateAction<string | null>>;
  setIsCameraActive: Dispatch<SetStateAction<boolean>>;
}) => {
  const camera = cameraRef.current;
  const canvas = canvasRef.current;

  if (camera && canvas) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = camera.videoWidth;
    canvas.height = camera.videoHeight;

    ctx.drawImage(camera, 0, 0, canvas.width, canvas.height);

    const photoData = canvas.toDataURL("image/jpeg");
    setCapturedPhoto(photoData);

    const stream = camera.srcObject as MediaStream;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setIsCameraActive(false);
  }
};
