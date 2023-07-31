import Add from "@/assets/icons/add.svg";
import FormCustomQuestion from "./FormCustomQuestion";
import FormCustomQuestionPreview from "./FormCustomQuestionPreview";
import FormLayout from "./FormLayout";
import FormQuestionPreview from "./FormQuestionPreview";
import React, { useState } from "react";
import { Modal } from "antd";
import { formTypeMapping } from "./helpers";

import {
  ICustomFormQuestion,
  IFormQuestion,
  IFormQuestionType,
} from "./interface";

type IProps = {
  header: string;
  fields?: IFormQuestion[];
  customFields?: ICustomFormQuestion[];
  onSetQuestion?: (question: IFormQuestion, key: IFormQuestion["key"]) => void;
  onSetCustomQuestion?: (
    question: ICustomFormQuestion,
    index: number | null
  ) => void;
  onDeleteCustomQuestion?: (
    question: ICustomFormQuestion,
    index: number | null
  ) => void;
  newQuestionTemplate?: Partial<ICustomFormQuestion>;
  disabledQuestions?: (keyof ICustomFormQuestion)[];
};

export default function FormSection({
  header,
  fields,
  customFields,
  onSetQuestion,
  onSetCustomQuestion,
  onDeleteCustomQuestion,
  newQuestionTemplate,
  disabledQuestions,
}: IProps) {
  const [showNewForm, setShowNewForm] = useState<boolean>(false);

  return (
    <>
      <FormLayout
        header={header}
        content={
          <>
            <div className="grid ">
              {(fields || []).map((field, index) => {
                return (
                  <FormQuestionPreview
                    key={field.key}
                    formQuestion={field}
                    className={
                      index === 0 ? "" : "border-t-[1px] border-[#C4C4C4]"
                    }
                    onChange={(question) => {
                      onSetQuestion && onSetQuestion(question, field.key);
                    }}
                  />
                );
              })}
              {(customFields || []).map((field, index) => {
                return (
                  <FormCustomQuestionPreview
                    key={index}
                    formQuestion={field}
                    disabledQuestions={disabledQuestions}
                    helperText={(() => {
                      if (field.type === "Video") {
                        return `${field.maxDuration} ${field.maxDurationUnit}`;
                      } else {
                        return (
                          formTypeMapping[field.type as IFormQuestionType] ??
                          "question"
                        );
                      }
                    })()}
                    className={
                      index === 0 ? "" : "border-t-[1px] border-[#C4C4C4]"
                    }
                    onQuestionUpdate={(question) => {
                      onSetCustomQuestion &&
                        onSetCustomQuestion(question, index);
                    }}
                    onQuestionDelete={(question) => {
                      onDeleteCustomQuestion &&
                        onDeleteCustomQuestion(question, index);
                    }}
                  />
                );
              })}
            </div>
            <div
              className="grid grid-flow-col gap-[20px] w-max py-[33px] px-[30px] items-center cursor-pointer"
              onClick={() => {
                setShowNewForm(true);
              }}
            >
              <Add />
              Add a question
            </div>
          </>
        }
      />
      {showNewForm && (
        <Modal
          open
          className="form-question-modal"
          closeIcon={null}
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
          onCancel={() => {
            setShowNewForm(false);
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
  );
}
