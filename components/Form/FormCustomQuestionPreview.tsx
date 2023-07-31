import EditIcon from "@/assets/icons/edit-icon.svg";
import FormCustomQuestion from "./FormCustomQuestion";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { ICustomFormQuestion } from "./interface";

type IProps = {
  formQuestion: ICustomFormQuestion;
  className?: string;
  helperText?: string;
  onQuestionUpdate?: (question: ICustomFormQuestion) => void;
  onQuestionDelete?: (question: ICustomFormQuestion) => void;
  disabledQuestions?: (keyof ICustomFormQuestion)[];
};
export default function FormCustomQuestionPreview({
  formQuestion,
  className,
  helperText,
  onQuestionUpdate,
  onQuestionDelete,
  disabledQuestions,
}: IProps) {
  const [showEditForm, setShowEditForm] = useState(false);
  return (
    <div className={twMerge("py-[25px]", className)}>
      <p className={"text-[#979797] mb-[5px]"}>{helperText}</p>

      <div className="grid grid-flow-col grid-cols-[auto_max-content] gap-[52px]">
        <p className="text-[20px] font-[600] ">{formQuestion.question}</p>
        <div
          className="cursor-pointer"
          onClick={() => {
            setShowEditForm(!showEditForm);
          }}
        >
          {/* <svg
            width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect width="18" height="17" fill="url(#pattern0)" />
            <defs>
              <pattern
                id="pattern0"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  href="#image0_79_1062"
                  transform="matrix(0.00333333 0 0 0.00352941 0 -0.0294118)"
                />
              </pattern>
              <image
                id="image0_79_1062"
                width="300"
                height="300"
                xlinkHref="data:image/png;base64,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"
              />
            </defs>
          </svg> */}
          <EditIcon />
        </div>
      </div>

      {showEditForm && (
        <FormCustomQuestion
          contentOnly
          className="shadow-[3px_14px_0px_rgba(190,190,190,0.30)]"
          question={formQuestion}
          disabledQuestions={disabledQuestions}
          onClose={() => {
            setShowEditForm(false);
          }}
          onDelete={(question) => {
            onQuestionDelete && onQuestionDelete(question);
          }}
          onSave={(question) => {
            console.log(question);
            onQuestionUpdate && onQuestionUpdate(question);
            setShowEditForm(false);
          }}
        />
      )}
    </div>
  );
}
