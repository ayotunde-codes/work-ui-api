import { Avatar, Checkbox, Modal } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import React, { useState } from "react";
import FormQuestionPreview from "./FormQuestionPreview";
import { ICustomFormQuestion, IFormQuestion, IFormQuestionType } from "./interface";
import FormCustomQuestion from "./FormCustomQuestion";
import FormLayout from "./FormLayout";
import FormCustomQuestionPreview from "./FormCustomQuestionPreview";
import { formTypeMapping } from "./helpers";

type IProps = {
  header: string;
  fields?: IFormQuestion[];
  customFields?: ICustomFormQuestion[];
  onSetQuestion?: (question: IFormQuestion, key: IFormQuestion["key"]) => void;
  onSetCustomQuestion?: (question: ICustomFormQuestion, index: number | null) => void;
  onDeleteCustomQuestion?: (question: ICustomFormQuestion, index: number | null) => void;
  newQuestionTemplate?: Partial<ICustomFormQuestion>;
  disabledQuestions?: (keyof ICustomFormQuestion)[];
}

export default function FormSection({
  header,
  fields,
  customFields,
  onSetQuestion,
  onSetCustomQuestion,
  onDeleteCustomQuestion,
  newQuestionTemplate,
  disabledQuestions
}: IProps) {
  const [showNewForm, setShowNewForm] = useState<boolean>(false);

  return (
    <>
      <FormLayout
        header={header}
        content={(
          <>
            <div className="grid ">
              {(fields || []).map((field, index) => {
                return (
                  <FormQuestionPreview
                    key={field.key}
                    formQuestion={field}
                    className={index === 0 ? "" : "border-t-[1px] border-[#C4C4C4]"}
                    onChange={(question) => {
                      onSetQuestion && onSetQuestion(question, field.key);
                    }}
                  />
                )
              })}
              {(customFields || []).map((field, index) => {
                return (
                  <FormCustomQuestionPreview
                    key={index}
                    formQuestion={field}
                    disabledQuestions={disabledQuestions}
                    helperText={(() => {
                      if (field.type === "Video") {
                        return `${field.maxDuration} ${field.maxDurationUnit}`
                      } else {
                        return formTypeMapping[field.type as IFormQuestionType] ?? "question";
                      }
                    })()}
                    className={index === 0 ? "" : "border-t-[1px] border-[#C4C4C4]"}
                    onQuestionUpdate={(question) => {
                      onSetCustomQuestion && onSetCustomQuestion(question, index);
                    }}
                    onQuestionDelete={(question) => {
                      onDeleteCustomQuestion && onDeleteCustomQuestion(question, index);
                    }}
                  />
                )
              })}
            </div>
            <div className="grid grid-flow-col gap-[20px] w-max py-[33px] px-[30px] items-center cursor-pointer"
              onClick={() => {
                setShowNewForm(true)
              }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path d="M2.42465 11.9094L1 11.9182L12.8925 11.8456L24.7851 11.7729" stroke="black" stroke-width="5" />
                <path d="M12.7915 2.51816L12.7838 1.09351L12.8466 12.9861L12.8466 24.0001" stroke="black" stroke-width="5" />
              </svg>
              Add a question
            </div>
          </>
        )}
      />
      {showNewForm && (
        <Modal
          open
          className="form-question-modal"
          closeIcon={null}
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
          onCancel={() => {
            setShowNewForm(false)
          }}
        >
          <FormCustomQuestion
            className="shadow-[3px_14px_0px_rgba(190,190,190,0.30)]"
            question={newQuestionTemplate ? newQuestionTemplate : undefined}
            onClose={() => {
              setShowNewForm(false);
            }}
            onSave={(question) => {
              console.log(question);
              onSetCustomQuestion && onSetCustomQuestion(question, null);
              setShowNewForm(false);
            }}
            disabledQuestions={disabledQuestions}
          />
        </Modal>
      )}
    </>
  )
}