import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round:"rounded- [5px]",
};
const variants = {
  outline: {
    black_900: "border-black-900 border border-solid text-black-900"
    purple_700: "border-purple-700 border border-solid text-deep_purple-500",
    deep_purple_500:"border-deep_purple-500 border border-solid text-deep_purple-500",
  },
  gradient: {
    purple_700_deep_purple_500: "bg-gradient text-white-a700",
    blue_600_blue_600: "bg-gradient1 text-white-a700",
  },
  fill: {
    gray_900_01: "bg-gray-900_01 text-white-a700",
    white_A700: "bg-white-a700",
    gray_200:  "bg-gray-200",
  },
};
const sizes = {
  sm: "h-[52px] px-[34px] text-[12px]",
  xl: "h-[60px] px-[34px] text-[15px]",
  md: "h-[56px] px-4",
  lg: "h-[56px] px-3.5 text-[24px]",
  xs: "h-[34px] px-1.5",
};
const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon
  shape,
  variant = "fill",
  size = "xs"
  color = "gray_200",
  ...restProps
}) => {
  return (
    <button
    className={`${className}flex flex-row items-center justify-center text-center cursor-pointer whitespace-nowrap ${(shape && shapes[shape]) || ""}${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
    {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};
Button.propTypes = {
  
}


})