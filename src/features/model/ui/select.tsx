import { Select, SelectItem, Slider } from "@heroui/react";

import { useWebSocketStore } from "@/features/websocket";

import { MODELS } from "../config";
import { useModelStore } from "../store";

const Metrics = ({ label, value }: { label: string; value: number }) => {
  return (
    <Slider
      hideThumb
      hideValue
      isDisabled
      color="secondary"
      label={label}
      size="sm"
      value={value}
    />
  );
};

const SelectModel = () => {
  const isConnected = useWebSocketStore((state) => state.isConnected);
  const selected = useModelStore((state) => state.model);

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const model = e.target.value as Model;
    if (!model) {
      return;
    }
    const { socket } = useWebSocketStore.getState();
    socket.emit("model", { model }, (res: WebsocketResponse) => {
      if (res.status === "ok") {
        useModelStore.getState().setModel(model);
      }
    });
  };

  return (
    <Select
      classNames={{ base: "max-w-80", label: "font-normal" }}
      disabled={!isConnected}
      items={MODELS}
      label="Model"
      renderValue={(items) =>
        items.map((item) => (
          <div
            key={item.data?.key}
            className="text-default-600 pt-1 text-xl font-semibold"
          >
            {item.data?.label}
          </div>
        ))
      }
      selectedKeys={[selected]}
      selectionMode="single"
      onChange={onSelect}
    >
      {(item) => (
        <SelectItem key={item.key}>
          <div className="text-medium">{item.label}</div>
          <div className="grid grid-cols-3 gap-5">
            <Metrics label="Speed" value={item.speed} />
            <Metrics label="Accuracy" value={item.accuracy} />
          </div>
        </SelectItem>
      )}
    </Select>
  );
};

export default SelectModel;
