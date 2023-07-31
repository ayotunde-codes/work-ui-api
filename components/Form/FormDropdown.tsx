import Button from "../Button";
import FormFieldLayout from "./FormFieldLayout";
import React, { useEffect } from "react";
import { Dropdown, Form, Input } from "antd";

type IProps = {
  label?: string;
  placeholder?: string;
  options: {
    label: string;
    value: string;
  }[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

export default function FormDropdown({
  label,
  placeholder,
  options,
  onChange,
  value,
  disabled,
}: IProps) {
  const [selected, setSelected] = React.useState<string | null | undefined>(
    value || null
  );
  useEffect(() => {
    setSelected(value);
  }, [value]);

  const optionsMapping: { [T: string]: string } = {};
  const allOptions = options.map((option) => {
    optionsMapping[option.value as string] = option.label;

    return {
      label: option.label,
      key: option.value,
      onClick: () => {
        onChange && onChange(option.value);
        setSelected(option.value);
      },
      className: "form-question-dropdown-item",
    };
  });

  return (
    <FormFieldLayout
      label={label}
      content={
        <Dropdown
          disabled={disabled}
          trigger={["click"]}
          className="bg-primary w-full p-[17px_26px] rounded-[5px] bg-white border-black border-[1px]"
          overlayClassName="form-question-dropdown"
          menu={{
            items: allOptions,
            selectedKeys: [selected || ""],
          }}
        >
          <Button className="flex items-center p-0 h-full font-[500]">
            {selected && Object.keys(optionsMapping).includes(selected) ? (
              optionsMapping[selected]
            ) : (
              <span className="text-[#979797] ">{placeholder}</span>
            )}
          </Button>
        </Dropdown>
      }
    />
  );
}
