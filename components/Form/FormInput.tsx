import FormFieldLayout from "./FormFieldLayout";
import React from "react";
import { Input } from "antd";

type IProps = {
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  value?: string | number | null;
};
export default function FormInput({
  label,
  placeholder,
  value,
  onChange,
}: IProps) {
  return (
    <FormFieldLayout
      label={label}
      content={
        <Input
          className="w-full p-[17px_26px] rounded-[5px] bg-white border-black border-[1px]"
          value={value || undefined}
          placeholder={placeholder}
          onChange={(e) => {
            console.log(e.target.value);
            onChange && onChange(e.target.value);
          }}
        />
      }
    />
  );
}
