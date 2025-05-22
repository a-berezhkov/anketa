
"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value: RdxValue, min = 0, max = 100, step = 1, ...props }, ref) => {
  const [currentValue, setCurrentValue] = React.useState(Array.isArray(RdxValue) ? RdxValue[0] : RdxValue ?? min);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  
  React.useEffect(() => {
    if (RdxValue !== undefined) {
      setCurrentValue(Array.isArray(RdxValue) ? RdxValue[0] : RdxValue);
    }
  }, [RdxValue]);

  const getSliderColorStyles = () => {
    if (!isMounted) { // Avoid SSR mismatch by not calculating styles on server
        return { rangeStyle: {}, thumbStyle: {} };
    }

    const val = typeof currentValue === 'number' ? currentValue : min;
    const percentage = (val - min) / (max - min);

    // Get HSL values from CSS variables
    const rootStyle = getComputedStyle(document.documentElement);
    const startH = parseFloat(rootStyle.getPropertyValue('--slider-start-h').trim());
    const startS = parseFloat(rootStyle.getPropertyValue('--slider-start-s').trim().replace('%', ''));
    const startL = parseFloat(rootStyle.getPropertyValue('--slider-start-l').trim().replace('%', ''));
    const endH = parseFloat(rootStyle.getPropertyValue('--slider-end-h').trim());
    const endS = parseFloat(rootStyle.getPropertyValue('--slider-end-s').trim().replace('%', ''));
    const endL = parseFloat(rootStyle.getPropertyValue('--slider-end-l').trim().replace('%', ''));

    // Interpolate HSL values
    const currentH = startH + (endH - startH) * percentage;
    const currentS = startS + (endS - startS) * percentage;
    const currentL = startL + (endL - startL) * percentage;

    const color = `hsl(${currentH}, ${currentS}%, ${currentL}%)`;

    return {
      rangeStyle: { backgroundColor: color },
      thumbStyle: { borderColor: color },
    };
  };
  
  const { rangeStyle, thumbStyle } = getSliderColorStyles();

  const handleValueChange = (newValue: number[]) => {
    setCurrentValue(newValue[0]);
    if (props.onValueChange) {
      props.onValueChange(newValue);
    }
  };

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      value={typeof currentValue === 'number' ? [currentValue] : [min]}
      min={min}
      max={max}
      step={step}
      onValueChange={handleValueChange}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range
          className="absolute h-full transition-colors duration-300 ease-in-out"
          style={rangeStyle}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block h-5 w-5 rounded-full border-2 bg-background ring-offset-background transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        style={thumbStyle}
      />
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
