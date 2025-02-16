import React, { useEffect, useRef, useState } from "react";
import NotificationAudio from "./notification/notification-audio";
import { useStateContext } from "@/providers/AppContextProvider";

export default function NotificationContainer() {
  const audioRef = useRef(null);
  const { event } = useStateContext();
  const [playCount, setPlayCount] = useState(0);

  useEffect(() => {
    if (event.flag === "create") {
      if (audioRef.current && audioRef.current.readyState >= 2) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    } else if (event.flag === "update") {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [event.flag, event.pooling]);

  const handleEnded = (e) => {
    if (playCount < 2) {
      setTimeout(() => {
        if (audioRef && audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
          setPlayCount(playCount + 1);
        }
      }, 2500);
    } else {
      setPlayCount(0);
    }
  };

  return (
    <>
      <NotificationAudio
        ref={audioRef}
        onEnded={handleEnded}
        src="/assets/audio/ringtone.mp3"
      />
    </>
  );
}
