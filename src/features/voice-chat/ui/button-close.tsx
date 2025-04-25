import { Button } from "@heroui/react";
import { X } from "lucide-react";

import { Tooltip } from "@/shared/ui";

interface Props {
  onClick: () => void;
}

const ButtonClose = ({ onClick }: Props) => {
  return (
    <Tooltip content="끝내기">
      <Button
        isIconOnly
        className="size-16"
        radius="full"
        size="lg"
        variant="flat"
        onPress={onClick}
      >
        <X size={28} />
      </Button>
    </Tooltip>
  );
};

export default ButtonClose;
