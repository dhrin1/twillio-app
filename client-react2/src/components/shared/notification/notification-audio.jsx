import React, { forwardRef } from "react";

const NotificationAudio = forwardRef(({ ...props }, ref) => {
  return (
    <audio {...props} ref={ref}>
      <source src={props.src} type="audio/mpeg" />
    </audio>
  );
});

export default NotificationAudio;
