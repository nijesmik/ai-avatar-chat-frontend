import { Button } from "@heroui/react";
import { CornerDownLeft } from "lucide-react";

interface Props {
  onClick: () => void;
}

const ButtonSendMessage = ({ onClick }: Props) => {
  return (
    <Button
      isDisabled
      isIconOnly
      color="primary"
      radius="full"
      onPress={onClick}
    >
      <CornerDownLeft />
    </Button>
  );
};

export default ButtonSendMessage;
