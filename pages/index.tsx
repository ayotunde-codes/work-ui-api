import Button from "@/components/Button";
import Filters from "@/components/Form/Filters";
import FormLayout from "@/components/Form/FormLayout";
import FormSection from "@/components/Form/FormSection";
import Layout from "@/components/Layout";
import React from "react";
import axios from "axios";
import { Checkbox, Input, message } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  ICustomFormQuestion,
  IFormQuestion,
} from "@/components/Form/interface";

type IForms = {
  personalInformation: {
    defaultQuestions: {
      firstName: IFormQuestion;
      lastName: IFormQuestion;
      emailId: IFormQuestion;
      phoneNumber: IFormQuestion;
      nationality: IFormQuestion;
      currentResidence: IFormQuestion;
      idNumber: IFormQuestion;
      dateOfBirth: IFormQuestion;
      gender: IFormQuestion;
    };
    customisedQuestions: ICustomFormQuestion[];
  };
  profile: {
    defaultQuestions: {
      education: IFormQuestion;
      workExperience: IFormQuestion;
      resume: IFormQuestion;
    };
    customisedQuestions: ICustomFormQuestion[];
  };
  additionalQuestions: {
    defaultQuestions: {};
    customisedQuestions: ICustomFormQuestion[];
  };
  videoQuestions: {
    defaultQuestions: {};
    customisedQuestions: ICustomFormQuestion[];
  };
};

export default function Home() {
  const [forms, setForms] = useState<IForms>({
    personalInformation: {
      defaultQuestions: {
        firstName: {
          label: "First Name",
          internalUse: null,
          mandatory: null,
          show: null,
        },
        lastName: {
          label: "Last Name",
          internalUse: null,
          mandatory: null,
          show: null,
        },
        emailId: {
          label: "Email",
          internalUse: null,
          mandatory: null,
          show: null,
        },
        phoneNumber: {
          label: (
            <p>
              Phone{" "}
              <span className="text-[15px] font-[400]">
                (without dial code)
              </span>
            </p>
          ),
          internalUse: false,
          mandatory: null,
          show: false,
        },
        nationality: {
          label: "Nationality",
          internalUse: false,
          mandatory: null,
          show: false,
        },
        currentResidence: {
          label: "Current Residence ",
          internalUse: false,
          mandatory: null,
          show: false,
        },
        idNumber: {
          label: "ID Number",
          internalUse: false,
          mandatory: null,
          show: false,
        },
        dateOfBirth: {
          label: "Date of Birth ",
          internalUse: false,
          mandatory: null,
          show: false,
        },
        gender: {
          label: "Gender",
          internalUse: false,
          mandatory: null,
          show: false,
        },
      },
      customisedQuestions: [],
    },
    profile: {
      defaultQuestions: {
        education: {
          label: "Education",
          internalUse: null,
          mandatory: false,
          show: true,
        },
        workExperience: {
          label: "Experience",
          internalUse: null,
          mandatory: false,
          show: false,
        },
        resume: {
          label: "Resume",
          internalUse: null,
          mandatory: false,
          show: false,
        },
      },
      customisedQuestions: [],
    },
    additionalQuestions: {
      defaultQuestions: {},
      customisedQuestions: [],
    },
    videoQuestions: {
      defaultQuestions: {},
      customisedQuestions: [],
    },
  });
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Create a mapped type to extract keys from each part of the forms
  type IFormsDefaultQuestionsType =
    IForms[keyof IForms]["defaultQuestions"] extends infer U
      ? U extends Record<keyof U, any>
        ? keyof U
        : never
      : never;

  const setFormQuestionByType = (
    type: keyof IForms,
    key: IFormsDefaultQuestionsType,
    question: IFormQuestion
  ) => {
    const newForms: IForms = { ...forms };
    console.log("The data for change", {
      type,
      key,
      newForms,
    });
    if (newForms[type].defaultQuestions.hasOwnProperty(key)) {
      newForms[type].defaultQuestions = {
        ...newForms[type].defaultQuestions,
        [key]: question,
      };

      setForms(newForms);
    }
  };

  const setFormCustomQuestionByType = (
    type: keyof IForms,
    question: ICustomFormQuestion,
    index: number | null
  ) => {
    const newForms: IForms = { ...forms };
    if (index === null) {
      newForms[type].customisedQuestions = [
        ...newForms[type].customisedQuestions,
        question,
      ];
    } else {
      newForms[type].customisedQuestions[index] = question;
    }
    setForms(newForms);
  };

  const deleteFormCustomQuestionByType = (
    type: keyof IForms,
    index: number | null
  ) => {
    const newForms: IForms = { ...forms };
    if (index !== null) {
      newForms[type].customisedQuestions.splice(index, 1);
    }
    setForms(newForms);
  };

  const submitForm = () => {
    setSubmitting(true);

    /* 
      const formData = new FormData();
      // append form data

      axios.post('http://127.0.0.1:3100/api/version/programs/programId/candidate-applications', formData).then((res) => {
        console.log("The response", res);
      }).catch((err) => {
        console.log("The error", err);
      })
    */

    setTimeout(() => {
      message.success("Form submitted successfully");
      setSubmitting(false);
    }, 2000);
  };

  return (
    <Layout>
      <main className="px-[69px] grid grid-flow-col w-full pb-[50px]">
        <div className="grid gap-[67px]  max-w-[595px] relative">
          <div className="relative rounded-[20px] overflow-hidden w-full shadow-[3px_3px_14px_0px_rgba(190,190,190,0.30)]">
            <FormLayout
              header={"Upload cover image"}
              content={
                <div className="pt-[63px] pb-[57px] px[40px]">
                  <div
                    className="border-[1px] border-dashed border-black py-[63px] px-[10px] flex flex-col justify-center items-center rounded-[5px] cursor-pointer"
                    onClick={() => {
                      fileInputRef.current?.click();
                    }}
                  >
                    <img src="/icons/upload-icon.png" />
                    <p className="text-[14px] font-[600] mb-[6px] mt-[10px]">
                      Upload cover image
                    </p>
                    <span className="text-[14px] text-[#979797] font-[500]">
                      16:9 ratio is recommended. Max image size 1mb
                    </span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    accept="image/jpeg, image/png, image/jpg"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setFile(e.target.files[0]);
                      }
                    }}
                  />
                </div>
              }
            />
            {file && (
              <div className="absolute top-[0px] left-[0px] w-full h-full grid grid-rows-[auto_max-content]">
                <div className=" w-full h-full overflow-hidden">
                  <img
                    src={URL.createObjectURL(file)}
                    className=" bg-white  w-full h-full object-cover rounded-[5px]"
                  />
                </div>
                <div className="bg-white w-full p-[27px_30px] ">
                  <button
                    type="button"
                    className="flex items-center justify-center text-[#A80000] text-[15px] font-[600]"
                    onClick={() => {
                      setFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="34"
                      height="34"
                      viewBox="0 0 34 34"
                      fill="none"
                    >
                      <path
                        d="M9.55672 9.42862L8.54309 8.42749L17.0037 16.7854L25.4644 25.1434"
                        stroke="#A80000"
                        stroke-width="5"
                      />
                      <path
                        d="M23.5279 10.1184L24.5299 9.10559L16.165 17.5594L8.37691 25.3474"
                        stroke="#A80000"
                        stroke-width="5"
                      />
                    </svg>
                    Delete & re-upload
                  </button>
                </div>
              </div>
            )}
          </div>

          <FormSection
            header={"Personal Information"}
            fields={Object.entries(
              forms.personalInformation.defaultQuestions
            ).map(([key, value]) => {
              return {
                ...value,
                key,
              };
            })}
            customFields={forms.personalInformation.customisedQuestions}
            onSetQuestion={(question, key) => {
              setFormQuestionByType(
                "personalInformation",
                key as IFormsDefaultQuestionsType,
                question
              );
            }}
            onSetCustomQuestion={(question, index) => {
              setFormCustomQuestionByType(
                "personalInformation",
                question,
                index
              );
            }}
            onDeleteCustomQuestion={(_, index) => {
              deleteFormCustomQuestionByType("personalInformation", index);
            }}
          />

          <FormSection
            header={"Profile"}
            fields={Object.entries(forms.profile.defaultQuestions).map(
              ([key, value]) => {
                return {
                  ...value,
                  key,
                };
              }
            )}
            customFields={forms.profile.customisedQuestions}
            onSetQuestion={(question, key) => {
              setFormQuestionByType(
                "profile",
                key as IFormsDefaultQuestionsType,
                question
              );
            }}
            onSetCustomQuestion={(question, index) => {
              setFormCustomQuestionByType("profile", question, index);
            }}
            onDeleteCustomQuestion={(_, index) => {
              deleteFormCustomQuestionByType("profile", index);
            }}
          />

          <FormSection
            header={"Additional questions"}
            customFields={forms.additionalQuestions.customisedQuestions}
            onSetCustomQuestion={(question, index) => {
              setFormCustomQuestionByType(
                "additionalQuestions",
                question,
                index
              );
            }}
            onDeleteCustomQuestion={(_, index) => {
              deleteFormCustomQuestionByType("additionalQuestions", index);
            }}
          />

          <FormSection
            header={"Video based questions"}
            customFields={forms.videoQuestions.customisedQuestions}
            newQuestionTemplate={{
              type: "Video",
            }}
            disabledQuestions={["type"]}
            onSetCustomQuestion={(question, index) => {
              setFormCustomQuestionByType("videoQuestions", question, index);
            }}
            onDeleteCustomQuestion={(_, index) => {
              deleteFormCustomQuestionByType("videoQuestions", index);
            }}
          />

          <Button
            className="py-[15px] px-[20px] rounded-[5px] bg-[#087B2F] text-[20px] text-white font-[600] flex items-center justify-center"
            onClick={() => {
              submitForm();
            }}
          >
            {submitting && (
              <div role="status">
                <svg
                  className="w-8 h-8 mr-[20px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#D0F7FA"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1D4ED8"
                  />
                </svg>
              </div>
            )}
            Submit
          </Button>
        </div>
      </main>
    </Layout>
  );
}
