import { ApplicationForm, ICustomFormQuestion, IForms, QuestionTemplate } from "@/components/Form/interface";

export const formatQuestionTemplate = (data: QuestionTemplate[]) => {
    const questions = data.map((question) => {
      return {
        type: question.type,
        question: question.question,
        choices: question.choices,
        disqualify: question.disqualify,
        other: question.other,
        maxChoice: question.maxChoice.toString(),
        maxDuration: null,
        maxDurationUnit: "",
        booleanAnswer: false,
        dateAnswer: "",
        id: question.id,
      } as ICustomFormQuestion;
    });
    return questions;
  };

  export const reformatQuestionTemplate = (data: ICustomFormQuestion[]) => {
    return data.map((questions) => {
      return {
        disqualify: questions.disqualify,
        choices: questions.choices,
        id: questions?.id,
        maxChoice: Number(questions.maxChoice),
        other: questions.other,
        question: questions.question,
        type: questions.type,
      } as QuestionTemplate;
    });
  };

 export const formatFormToApplication = (
    application: ApplicationForm,
    modifiedForms: IForms,
    imageUrl: string | null
  ) => {
    const {
      personalInformation,
      profile: profileInformation,
      additionalQuestions,
    } = modifiedForms;

    const finalForm = {
      data: {
        ...application.data,
        attributes: {
          coverImage: imageUrl || application.data.attributes.coverImage,
          personalInformation: {
            firstName: {
              internalUse:
                personalInformation.defaultQuestions.firstName.internalUse,
              show: personalInformation.defaultQuestions.firstName.show,
            },
            lastName: {
              internalUse:
                personalInformation.defaultQuestions.lastName.internalUse,
              show: personalInformation.defaultQuestions.lastName.show,
            },
            emailId: {
              internalUse:
                personalInformation.defaultQuestions.emailId.internalUse,
              show: personalInformation.defaultQuestions.emailId.show,
            },
            phoneNumber: {
              internalUse:
                personalInformation.defaultQuestions.phoneNumber.internalUse,
              show: personalInformation.defaultQuestions.phoneNumber.show,
            },
            nationality: {
              internalUse:
                personalInformation.defaultQuestions.nationality.internalUse,
              show: personalInformation.defaultQuestions.nationality.show,
            },
            currentResidence: {
              internalUse:
                personalInformation.defaultQuestions.currentResidence
                  .internalUse,
              show: personalInformation.defaultQuestions.currentResidence.show,
            },
            idNumber: {
              internalUse:
                personalInformation.defaultQuestions.idNumber.internalUse,
              show: personalInformation.defaultQuestions.idNumber.show,
            },
            dateOfBirth: {
              internalUse:
                personalInformation.defaultQuestions.dateOfBirth.internalUse,
              show: personalInformation.defaultQuestions.dateOfBirth.show,
            },
            gender: {
              internalUse:
                personalInformation.defaultQuestions.gender.internalUse,
              show: personalInformation.defaultQuestions.gender.show,
            },
            personalQuestions: reformatQuestionTemplate(
              personalInformation.customisedQuestions
            ),
          },
          profile: {
            education: {
              mandatory:
                profileInformation.defaultQuestions.education.mandatory,
              show: profileInformation.defaultQuestions.education.show,
            },
            experience: {
              mandatory:
                profileInformation.defaultQuestions.workExperience.mandatory,
              show: profileInformation.defaultQuestions.workExperience.show,
            },
            resume: {
              mandatory: profileInformation.defaultQuestions.resume.mandatory,
              show: profileInformation.defaultQuestions.resume.show,
            },
            profileQuestions: reformatQuestionTemplate(
              profileInformation.customisedQuestions
            ),
          },
          customisedQuestions: reformatQuestionTemplate(
            additionalQuestions.customisedQuestions
          ),
        },
      },
    };

    return finalForm;
  };