"use client";

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  type RadioProps,
  cn,
} from "@heroui/react";
import { Settings2 } from "lucide-react";
import { useEffect } from "react";

import { useAvatarCanvas, useAvatarStore } from "@/features/avatar";
import { clearScene } from "@/features/avatar/lib/three";
import { useWebSocketStore } from "@/features/websocket";

const Avatar = ({ gender }: { gender: Gender }) => {
  const model = useAvatarStore((state) =>
    gender === "male" ? state.defaultModelMale : state.defaultModelFemale,
  );
  const { canvasRef, sceneRef } = useAvatarCanvas(160);

  useEffect(() => {
    if (model) {
      const clone = model.clone();
      clone.visible = true;
      sceneRef.current.add(clone);
    }

    return () => {
      clearScene(sceneRef.current);
    };
  }, [model]);

  return (
    <div className="m-2 flex aspect-square w-fit items-center justify-center overflow-hidden rounded-full border">
      <canvas ref={canvasRef} />
    </div>
  );
};

const radioStyles = {
  base: cn(
    "hover:bg-content2 m-1 flex-col-reverse rounded-lg",
    "data-[selected=true]:border-secondary border-2 border-transparent",
  ),
} satisfies RadioProps["classNames"];

const SelectAvatar = () => {
  const socket = useWebSocketStore((state) => state.socket);
  const setGender = useAvatarStore((state) => state.setGender);
  const selected = useAvatarStore((state) => state.gender);
  const onSelect = (value: string) => {
    const gender = value as Gender;
    socket.emit("voice", { gender }, (response: WebsocketResponse) => {
      if (response.status === "ok") {
        setGender(gender);
      }
    });
  };

  return (
    <Popover placement="bottom-end" shadow="sm">
      <PopoverTrigger>
        <Button isIconOnly variant="light">
          <Settings2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2">
        <RadioGroup
          classNames={{ wrapper: "flex-row gap-0.5" }}
          color="secondary"
          value={selected}
          onValueChange={onSelect}
        >
          <Radio classNames={radioStyles} value="male">
            <Avatar gender="male" />
          </Radio>
          <Radio classNames={radioStyles} value="female">
            <Avatar gender="female" />
          </Radio>
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
};

export default SelectAvatar;
