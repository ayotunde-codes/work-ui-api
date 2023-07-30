import { Input } from "antd"
import React from "react"
import FormFieldLayout from "./FormFieldLayout"

type IProps = {
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  value?: string;
}
export default function FormTextArea({ label, placeholder, value, onChange }: IProps) {
  return (
    <FormFieldLayout
      label={label}
      content={(
        <Input.TextArea
          className="w-full p-[17px_26px] rounded-[5px] bg-white border-black border-[1px]"
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            console.log(e.target.value)
            onChange && onChange(e.target.value)
          }}
        />
      )}
    />
  )
}