import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type IProps = {
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ children, className, ...rest }: IProps) {
  return (
    <button
      {...rest}
      className={twMerge(`py-[7px] px-[12px] rounded-[5px] bg-white`, className)}
    >
      {children}
    </button>
  )
}