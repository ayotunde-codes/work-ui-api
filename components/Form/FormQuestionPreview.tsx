import React from "react";
import { Checkbox, Switch } from "antd";
import { twMerge } from "tailwind-merge";
import { IFormQuestion } from "./interface";

type IProps = {
  formQuestion: IFormQuestion;
  className?: string;
  onChange?: (formQuestion: IFormQuestion) => void;
};
export default function FormQuestionPreview({
  formQuestion,
  className,
  onChange,
}: IProps) {
  const onQuestionChange = (data: Partial<IFormQuestion>) => {
    onChange &&
      onChange({
        ...formQuestion,
        ...data,
      });
  };

  return (
    <div
      className={twMerge(
        "py-[25px] grid grid-flow-col grid-cols-[auto_max-content] gap-9",
        className
      )}
    >
      <p className="text-[20px] font-[600] ">{formQuestion.label}</p>
      <div className="grid grid-flow-col gap-9">
        {formQuestion.internalUse !== null && (
          <div className="flex items-center">
            <Checkbox
              checked={formQuestion.internalUse}
              onChange={(e) => {
                onQuestionChange({
                  internalUse: e.target.checked,
                });
              }}
            >
              <span className="text-[15px] font-[400]">Internal</span>
            </Checkbox>
          </div>
        )}
        {formQuestion.mandatory !== null && (
          <div className="flex items-center">
            <Checkbox
              checked={formQuestion.mandatory}
              onChange={(e) => {
                onQuestionChange({
                  mandatory: e.target.checked,
                });
              }}
            >
              <span className="text-[15px] font-[400]">Mandatory</span>
            </Checkbox>
          </div>
        )}
        {formQuestion.show !== null && (
          <div className="flex items-center">
            <Switch
              checked={formQuestion.show}
              onChange={(e) => {
                onQuestionChange({
                  show: e,
                });
              }}
            />
            <span className="block ml-[16px]">
              {formQuestion.show ? "Show" : "Hide"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
