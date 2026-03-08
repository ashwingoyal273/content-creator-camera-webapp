import { useEffect, useRef, useState } from "react";
import type { CreatePresetPayload } from "../types/preset";

type CameraRecorderProps = {
  cue: CreatePresetPayload;
};

export default function CameraRecorder({ cue }: CameraRecorderProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [status, setStatus] = useState("Camera not enabled");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  async function enableCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCameraEnabled(true);
      setStatus("Camera enabled");
    } catch (error) {
      console.error(error);
      setStatus("Failed to enable camera");
    }
  }

  function startRecording() {
    const stream = streamRef.current;
    if (!stream) {
      setStatus("Enable camera first");
      return;
    }

    chunksRef.current = [];

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      setStatus("Recording complete");
    };

    recorder.start();
    setIsRecording(true);
    setStatus(
      `Recording, mock track start at ${cue.start_time_ms} ms for ${cue.duration_ms} ms`
    );

    window.setTimeout(() => {
      recorder.stop();
      setIsRecording(false);
    }, cue.duration_ms);
  }

  function handleRecord() {
    if (!cameraEnabled) {
      setStatus("Enable camera first");
      return;
    }

    setStatus("Countdown started");
    setCountdown(cue.countdown_seconds);

    let current = cue.countdown_seconds;

    const intervalId = window.setInterval(() => {
      current -= 1;

      if (current > 0) {
        setCountdown(current);
      } else {
        window.clearInterval(intervalId);
        setCountdown(null);
        startRecording();
      }
    }, 1000);
  }

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [previewUrl]);

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8 }}>
      <h2>Camera Recorder</h2>

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{
          width: 320,
          height: 480,
          background: "#000",
          objectFit: "cover",
          borderRadius: 8,
        }}
      />

      <div style={{ marginTop: 12 }}>
        <button onClick={enableCamera}>Enable Camera</button>{" "}
        <button onClick={handleRecord} disabled={isRecording}>
          {isRecording ? "Recording..." : "Record Synced Take"}
        </button>
      </div>

      <p>Status: {status}</p>

      {countdown !== null && <h3>Countdown: {countdown}</h3>}

      {previewUrl && (
        <div style={{ marginTop: 16 }}>
          <h3>Recorded Preview</h3>
          <video
            src={previewUrl}
            controls
            style={{
              width: 320,
              height: 480,
              background: "#000",
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        </div>
      )}
    </div>
  );
}
