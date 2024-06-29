import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

export const useCapture = () => {
  const webcamRef = useRef<Webcam>(null);
  const [captureStatus, setCaptureStatus] = useState<
    "starting" | "capturing" | "success" | "error"
  >("starting");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const captureImage = useCallback(() => {
    console.log("Intentando capturar imagen...");
    setCaptureStatus("capturing");

    const webcam = webcamRef.current;
    if (!webcam || !webcam.getScreenshot) {
      const errorMsg =
        "Referencia a webcam no disponible o método getScreenshot no definido.";
      console.log(errorMsg);
      setError(errorMsg);
      setCaptureStatus("error");
      return;
    }

    try {
      console.log("Webcam detectada. Obteniendo captura...");
      const image = webcam.getScreenshot();
      if (image) {
        console.log("Imagen capturada exitosamente.");
        console.log("Base64 de la imagen capturada:", image);

        setImageSrc(image);
        setCaptureStatus("success");
      } else {
        const errorMsg =
          "No se pudo obtener la captura de la imagen. Asegúrate de que la cámara esté activa y funcional.";
        console.log(errorMsg);
        setError(errorMsg);
        setCaptureStatus("error");
      }
    } catch (error) {
      console.error("Error al capturar la imagen:", error);
      setError("Error al capturar la imagen.");
      setCaptureStatus("error");
    }
  }, []);

  return { webcamRef, captureImage, captureStatus, imageSrc, error };
};
