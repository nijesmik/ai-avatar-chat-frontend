import { memo } from "react";

import { useAvatar } from "../hook/useAvatar";

const AvatarCanvas = () => {
  const { canvasRef } = useAvatar();

  return (
    <div className="flex aspect-square w-fit items-center justify-center overflow-hidden rounded-full border">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default memo(AvatarCanvas);
