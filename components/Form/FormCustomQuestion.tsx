import Button from "../Button";
import Delete from "@/assets/icons/delete.svg";
import FormDropdown from "./FormDropdown";
import FormFieldLayout from "./FormFieldLayout";
import FormInput from "./FormInput";
import FormLayout from "./FormLayout";
import FormTextArea from "./FormTextArea";
import MenuH from "@/assets/icons/menu-h.svg";
import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import { formTypeMapping } from "./helpers";
import { ICustomFormQuestion, IFormQuestionType } from "./interface";

const defaultQuestion: ICustomFormQuestion = {
  type: null,
  question: "",
  choices: [],
  disqualify: false,
  other: false,
  booleanAnswer: false,
  dateAnswer: "",
  maxChoice: null,
  maxDuration: null,
  maxDurationUnit: "second",
};

type IProps = {
  className?: string;
  question?: Partial<ICustomFormQuestion>;
  onClose?: () => void;
  onSave?: (question: ICustomFormQuestion) => void;
  onDelete?: (question: ICustomFormQuestion) => void;
  contentOnly?: boolean;
  disabledQuestions?: (keyof ICustomFormQuestion)[];
};

export default function FormCustomQuestion({
  contentOnly,
  className,
  question,
  onClose,
  onSave,
  onDelete,
  disabledQuestions,
}: IProps) {
  const [newChoice, setNewChoice] = useState<string>("");
  const addNewChoice = () => {
    if (!newChoice) return;
    setFormQuestion({
      choices: [...formQuestion.choices, newChoice],
    });
    setNewChoice("");
  };

  const questionState = useState<ICustomFormQuestion>({
    ...defaultQuestion,
    ...(question || {}),
  });

  let formQuestion = questionState[0];
  const resetFormQuestion = questionState[1];

  const setFormQuestion = (formData: Partial<ICustomFormQuestion>) => {
    const newFormQuestion = {
      ...formQuestion,
      ...formData,
    };
    formQuestion = newFormQuestion;
    resetFormQuestion(newFormQuestion);
  };

  useEffect(() => {
    if (question) {
      setFormQuestion(question);
    }
  }, [question]);

  const formInputQuestion = (
    <>
      <FormInput
        label="Question"
        placeholder="Type here"
        value={formQuestion.question}
        onChange={(value) => {
          setFormQuestion({
            question: value,
          });
        }}
      />
    </>
  );
  const formTextareaQuestion = (
    <FormTextArea
      label="Question"
      placeholder="Type here"
      value={formQuestion.question}
      onChange={(value) => {
        setFormQuestion({
          question: value,
        });
      }}
    />
  );
  const formDisqualify = (
    <span className="px-[26px]">
      <Checkbox
        checked={formQuestion.disqualify}
        onChange={(e) => {
          setFormQuestion({
            disqualify: e.target.checked,
          });
        }}
      >
        Disqualify candidate if the answer is no
      </Checkbox>
    </span>
  );
  const formDropdownChoices: React.ReactNode = (() => {
    const renderChoice = (choice: string, index: number) => {
      return (
        <div className="grid grid-flow-col w-full items-center grid-cols-[max-content_auto] gap-[7px]">
          <FormFieldLayout
            label={<p className="invisible">.</p>}
            content={<MenuH />}
          />
          <FormInput
            label="Choice"
            placeholder="Type here"
            value={choice}
            onChange={(value) => {
              const newChoices = [...formQuestion.choices];
              newChoices[index] = value;
              setFormQuestion({
                choices: newChoices,
              });
            }}
          />
        </div>
      );
    };

    return (
      <>
        {questionState[0].choices.map(renderChoice)}
        <div className="grid grid-flow-col w-full items-center grid-cols-[max-content_auto_max-content] gap-[7px]">
          <FormFieldLayout
            label={<p className="invisible">.</p>}
            content={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 10.5C3.2 10.5 2.5 11.2 2.5 12C2.5 12.8 3.2 13.5 4 13.5C4.8 13.5 5.5 12.8 5.5 12C5.5 11.2 4.8 10.5 4 10.5ZM4 5.5C3.2 5.5 2.5 6.2 2.5 7C2.5 7.8 3.2 8.5 4 8.5C4.8 8.5 5.5 7.8 5.5 7C5.5 6.2 4.8 5.5 4 5.5ZM4 15.5C3.2 15.5 2.5 16.2 2.5 17C2.5 17.8 3.2 18.5 4 18.5C4.8 18.5 5.5 17.8 5.5 17C5.5 16.2 4.8 15.5 4 15.5ZM7.5 6V8H21.5V6H7.5ZM7.5 18H21.5V16H7.5V18ZM7.5 13H21.5V11H7.5V13Z"
                  fill="black"
                />
              </svg>
            }
          />
          <FormInput
            label="Choice"
            placeholder="Type here"
            value={newChoice}
            onChange={(value) => {
              setNewChoice(value);
            }}
          />
          <FormFieldLayout
            label={<p className="invisible">.</p>}
            content={
              <div className="cursor-pointer" onClick={addNewChoice}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                >
                  <path
                    d="M1.77866 6.50933L1 6.51416L7.5 6.47446L14 6.43476"
                    stroke="black"
                    stroke-width="3"
                  />
                  <path
                    d="M7.44511 1.37632L7.44092 0.597656L7.47526 7.09769L7.47526 13.1175"
                    stroke="black"
                    stroke-width="3"
                  />
                </svg>
              </div>
            }
          />
        </div>
        <Checkbox>Enable “Other” option</Checkbox>
      </>
    );
  })();

  const formMaxChoice = (
    <FormInput
      label="Max choice allowed"
      placeholder="Enter number of choice allowed here"
      value={formQuestion.maxChoice}
      onChange={(value) => {
        setFormQuestion({
          maxChoice: value,
        });
      }}
    />
  );
  const formVideoDuration = (
    <div className="grid grid-flow-col gap-[5px]">
      <FormInput
        placeholder="Max duration of video"
        value={Number(formQuestion.maxDuration)}
        onChange={(value) => {
          setFormQuestion({
            maxDuration: value,
          });
        }}
      />
      <FormDropdown
        placeholder="in (sec/min)"
        options={[
          {
            label: "Minutes",
            value: "Minutes",
          },
          {
            label: "Seconds",
            value: "Seconds",
          },
        ]}
        value={formQuestion.maxDurationUnit}
        onChange={(value) => {
          setFormQuestion({
            maxDurationUnit: value,
          });
        }}
      />
    </div>
  );

  const Form: React.ReactNode[] = [];
  switch (formQuestion.type) {
    case "Paragraph":
    case "ShortAnswer":
    case "Date":
    case "Number":
    case "FileUpload": {
      Form.push(formInputQuestion);
      break;
    }
    case "YesNo": {
      Form.push(...[formInputQuestion, formDisqualify]);
      break;
    }
    case "MultipleChoice":
    case "Dropdown": {
      Form.push(...[formInputQuestion, formDropdownChoices]);
      if (formQuestion.type === "MultipleChoice") {
        Form.push(formMaxChoice);
      }
      break;
    }
    case "Video": {
      Form.push(...[formTextareaQuestion, formVideoDuration]);
    }
    default: {
      break;
    }
  }

  const content = (
    <>
      <div className="py-[36px] grid gap-[29px]">
        <FormDropdown
          disabled={disabledQuestions?.includes("type")}
          label="Type"
          placeholder="Select input type"
          value={formQuestion.type as string}
          options={Object.entries(formTypeMapping).map(([key, value]) => ({
            label: value,
            value: key,
          }))}
          onChange={(value) => {
            setFormQuestion({
              type: value as IFormQuestionType,
            });
          }}
        />

        {Form}
      </div>
      <div className="w-full grid grid-flow-col gap-3 justify-between pb-[43px]">
        {question && question.question ? (
          <Button
            className="flex items-center justify-center text-[#A80000] text-[15px] font-[600]"
            onClick={() => {
              onDelete && onDelete(formQuestion);
            }}
          >
            <Delete />
            Delete question
          </Button>
        ) : (
          <Button
            className="flex items-center justify-center bg-white border-[1px] border"
            onClick={() => {
              onClose && onClose();
            }}
          >
            Close
          </Button>
        )}

        <Button
          className="bg-[#087B2F] text-white font-[600]"
          onClick={() => {
            onSave && onSave(formQuestion);
          }}
        >
          Save
        </Button>
      </div>
    </>
  );
  return contentOnly ? (
    content
  ) : (
    <FormLayout header="Questions" content={content} />
  );
}
