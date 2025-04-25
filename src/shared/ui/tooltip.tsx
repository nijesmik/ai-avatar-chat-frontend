import { Tooltip as HeroUITooltip, type TooltipProps } from "@heroui/react";

export const Tooltip = ({
  color = "primary",
  children,
  ...props
}: TooltipProps) => {
  return (
    <HeroUITooltip {...props} className="px-3 py-2" color={color}>
      {children}
    </HeroUITooltip>
  );
};
