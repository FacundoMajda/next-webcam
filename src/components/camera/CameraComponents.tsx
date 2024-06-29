'use client'
import { useCapture } from '@/hooks/useCapture';
import Image from 'next/image';
import Webcam from "react-webcam";

const CameraComponent = () => {
  const {
    webcamRef,
    captureImage,
    captureStatus,
    imageSrc,
    error
  } = useCapture();

  return (
    <div className="flex flex-col items-center justify-center my-8 border">
            <h1 className='text-2xl'>Webcam Testing!!!</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={720}
        height={1080}
        className="shadow-lg rounded-lg border border-gray-300"
      />
      <button
        onClick={captureImage}
        className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 border border-gray-300"
      >
        Capturar Imagen
      </button>
      {captureStatus === 'success' && imageSrc && (
        <div className="mt-4 border border-gray-300">
          <h2 className="text-lg font-semibold">Imagen Capturada:</h2>
          <Image src={imageSrc} alt="Captura" width={720} height={1080} className="rounded-lg shadow-lg border border-gray-300" />
        </div>
      )}
      {captureStatus === 'error' && error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <h2 className="font-semibold">Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default CameraComponent;