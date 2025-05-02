import { memo } from "react";

import { useAvatarCanvas } from "../hook/useAvatarCanvas";

const AvatarCanvas = () => {
  const { canvasRef } = useAvatarCanvas();

  return (
    <div className="flex aspect-square w-fit items-center justify-center overflow-hidden rounded-full border">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default memo(AvatarCanvas);
