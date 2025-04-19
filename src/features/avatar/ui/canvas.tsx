import { useAvatar } from "../hook/useAvatar";

const AvatarCanvas = () => {
  const { canvasRef } = useAvatar();

  return <canvas ref={canvasRef} />;
};

export default AvatarCanvas;
