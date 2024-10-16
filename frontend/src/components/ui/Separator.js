import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "../../lib/utils";

const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      className={cn(
        orientation === "horizontal" ? "h-[1px] w-full" : "w-[1px] h-full",
        "bg-border",
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
