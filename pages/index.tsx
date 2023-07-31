import Button from "@/components/Button";
import Delete from "@/assets/icons/delete.svg";
import FormLayout from "@/components/Form/FormLayout";
import FormSection from "@/components/Form/FormSection";
import Layout from "@/components/Layout";
import React, { useEffect } from "react";
import Spinner from "@/components/Form/Spinner";
import axios, { AxiosError } from "axios";
import { message } from "antd";
import { useRef, useState } from "react";
import { apiClient } from "@/api";
import { ENDPOINTS } from "@/api/endpoints";
import { getData } from "@/hooks/useGetFormData";

import {
  ApiErrorResponse,
  ApplicationForm,
  ICustomFormQuestion,
  IFormQuestion,
  IForms,
} from "@/components/Form/interface";
import {
  formatFormToApplication,
  formatQuestionTemplate,
} from "@/hooks/useFormNormalizer";

let uploadRQSTController: AbortController | null = null;

export default function Home() {
  const [forms, setForms] = useState<IForms | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [retrivedData, setRetrivedData] = useState<ApplicationForm | null>(
    null
  );

  const getApplication = async () => {
    const data = await getData();
    const application = data;
    formatApplicationToForm(application);
    setRetrivedData(application);
  };

  const formatApplicationToForm = (data: ApplicationForm) => {
    console.log("personalInformation", data);
    const application = data.data.attributes;
    const personalInformation = application.personalInformation;
    const profile = application.profile;
    const customisedQuestions = application.customisedQuestions;
    setForms({
      personalInformation: {
        defaultQuestions: {
          firstName: {
            label: "First Name",
            internalUse: personalInformation.firstName.internalUse,
            mandatory: null,
            show: personalInformation.firstName.show,
          },
          lastName: {
            label: "Last Name",
            internalUse: personalInformation.lastName.internalUse,
            mandatory: null,
            show: personalInformation.lastName.show,
          },
          emailId: {
            label: "Email",
            internalUse: personalInformation.emailId.internalUse,
            mandatory: null,
            show: personalInformation.emailId.show,
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
            internalUse: personalInformation.phoneNumber.internalUse,
            mandatory: null,
            show: personalInformation.phoneNumber.show,
          },
          nationality: {
            label: "Nationality",
            internalUse: personalInformation.nationality.internalUse,
            mandatory: null,
            show: personalInformation.nationality.show,
          },
          currentResidence: {
            label: "Current Residence ",
            internalUse: personalInformation.currentResidence.internalUse,
            mandatory: null,
            show: personalInformation.currentResidence.show,
          },
          idNumber: {
            label: "ID Number",
            internalUse: personalInformation.idNumber.internalUse,
            mandatory: null,
            show: personalInformation.idNumber.show,
          },
          dateOfBirth: {
            label: "Date of Birth ",
            internalUse: personalInformation.dateOfBirth.internalUse,
            mandatory: null,
            show: personalInformation.dateOfBirth.show,
          },
          gender: {
            label: "Gender",
            internalUse: personalInformation.gender.internalUse,
            mandatory: null,
            show: personalInformation.gender.show,
          },
        },
        customisedQuestions: formatQuestionTemplate(
          personalInformation.personalQuestions
        ),
      },
      profile: {
        defaultQuestions: {
          education: {
            label: "Education",
            internalUse: null,
            mandatory: profile.education.mandatory,
            show: profile.education.show,
          },
          workExperience: {
            label: "Experience",
            internalUse: null,
            mandatory: profile.experience.mandatory,
            show: profile.experience.show,
          },
          resume: {
            label: "Resume",
            internalUse: null,
            mandatory: profile.resume.mandatory,
            show: profile.resume.show,
          },
        },
        customisedQuestions: formatQuestionTemplate(profile.profileQuestions),
      },
      additionalQuestions: {
        defaultQuestions: {},
        customisedQuestions: formatQuestionTemplate(customisedQuestions),
      },
      videoQuestions: {
        defaultQuestions: {},
        customisedQuestions: [],
      },
    });
    setIsLoading(false);
  };

  const updateForm = async (data: IForms) => {
    if (!retrivedData) return;
    const putData = formatFormToApplication(retrivedData, data, imageUrl);

    const application = await apiClient.put(ENDPOINTS.postForm, putData);
  };

  const handleSubmit = async (image: File) => {
    if (!image) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ml_default");
    if (!uploadRQSTController) {
      uploadRQSTController = new AbortController();
    }
    try {
      const response = await axios({
        url: "https://api.cloudinary.com/v1_1/dcmifr1mx/image/upload",
        method: "POST",
        data: formData,
        signal: uploadRQSTController.signal,
      });
      console.log(response);
      setImageUrl(response.data.secure_url);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getApplication();
  }, []);
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
    if (!forms) return;
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
    if (!forms) return;
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
    if (!forms) return;
    const newForms: IForms = { ...forms };
    if (index !== null) {
      newForms[type].customisedQuestions.splice(index, 1);
    }
    setForms(newForms);
  };

  const submitForm = async () => {
    if (!forms) return;
    setSubmitting(true);
    try {
      await updateForm(forms);
      setSubmitting(false);
      message.success("Form submitted successfully");
    } catch (err) {
      const error = err as AxiosError;
      console.log("The error", error);

      const data = error.response?.data as ApiErrorResponse;
      message.error(data.validation[0].message);
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <main className="px-[69px] grid grid-flow-col w-full pb-[50px]">
        <div className="grid gap-[67px]  max-w-[595px] relative">
          {isLoading || !forms ? (
            <div className=" w-full flex items-center justify-center py-9">
              <Spinner />
            </div>
          ) : (
            <>
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
                            handleSubmit(e.target.files[0]);
                          }
                        }}
                      />
                    </div>
                  }
                />
                {file && (
                  <div className="absolute top-[0px] left-[0px] w-full h-full grid grid-rows-[auto_max-content]">
                    <div className=" w-full h-full overflow-hidden relative">
                      <img
                        src={URL.createObjectURL(file)}
                        className=" bg-white  w-full h-full object-cover rounded-[5px]"
                      />
                      {uploading && (
                        <div className=" bg-white opacity-50 absolute w-full h-full top-0 left-0 flex items-center justify-center ">
                          <Spinner />
                        </div>
                      )}
                    </div>
                    <div className="bg-white w-full p-[27px_30px] ">
                      <button
                        type="button"
                        className="flex items-center justify-center text-[#A80000] text-[15px] font-[600]"
                        onClick={() => {
                          setFile(null);
                          if (fileInputRef.current)
                            fileInputRef.current.value = "";
                          if (uploadRQSTController) {
                            uploadRQSTController.abort();
                            uploadRQSTController = null;
                          }
                        }}
                      >
                        <Delete />
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

              {/* <FormSection
                header={"Video based questions"}
                customFields={forms.videoQuestions.customisedQuestions}
                newQuestionTemplate={{
                  type: "Video",
                }}
                disabledQuestions={["type"]}
                onSetCustomQuestion={(question, index) => {
                  setFormCustomQuestionByType(
                    "videoQuestions",
                    question,
                    index
                  );
                }}
                onDeleteCustomQuestion={(_, index) => {
                  deleteFormCustomQuestionByType("videoQuestions", index);
                }}
              /> */}

              <Button
                className="py-[15px] px-[20px] rounded-[5px] bg-[#087B2F] text-[20px] text-white font-[600] flex items-center justify-center"
                onClick={() => {
                  submitForm();
                }}
                disabled={submitting}
              >
                {submitting && (
                  <div role="status">
                    <Spinner />
                  </div>
                )}
                Submit
              </Button>
            </>
          )}
        </div>
      </main>
    </Layout>
  );
}
