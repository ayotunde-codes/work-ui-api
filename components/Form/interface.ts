export type IFormQuestionType = "Paragraph" | "ShortAnswer" | "YesNo" | "Dropdown" | "MultipleChoice" | "Date" | "Number" | "FileUpload" | "Video";


export type ICustomFormQuestion = {
  type: IFormQuestionType | null;
  question: string;
  choices: string[];
  disqualify: boolean;
  other: boolean;
  booleanAnswer: boolean;
  dateAnswer: string;
  maxChoice: string | null;
  maxDuration: string | null;
  maxDurationUnit: string;
  id?: string
}

export type IFormQuestion = {
  key?: number | string;
  label: React.ReactNode | string;
  internalUse: boolean | null;
  mandatory: boolean | null;
  show: boolean | null;
}

export type IForms = {
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
export type PersonalInformationTemplate = {
  internalUse: boolean;
  show: boolean;
};

export type QuestionTemplate = {
  id: string;
  type: string;
  question: string;
  choices: string[];
  maxChoice: number;
  disqualify: boolean;
  other: boolean;
};

export type ProfileTemplate = {
  mandatory: boolean;
  show: boolean;
};

export type ApplicationForm = {
  data: {
    id: string;
    type: string;
    attributes: {
      coverImage: string;
      personalInformation: {
        firstName: PersonalInformationTemplate;
        lastName: PersonalInformationTemplate;
        emailId: PersonalInformationTemplate;
        phoneNumber: PersonalInformationTemplate;
        nationality: PersonalInformationTemplate;
        currentResidence: PersonalInformationTemplate;
        idNumber: PersonalInformationTemplate;
        dateOfBirth: PersonalInformationTemplate;
        gender: PersonalInformationTemplate;
        personalQuestions: QuestionTemplate[];
      };
      profile: {
        education: ProfileTemplate;
        experience: ProfileTemplate;
        resume: ProfileTemplate;
        profileQuestions: QuestionTemplate[];
      };
      customisedQuestions: QuestionTemplate[];
    };
  };
};
export type ApiErrorResponse = {
  type: string;
  title: string;
  status: number;
  detail: string;
  validation: {
    location: string[];
    severity: "Error";
    code: string;
    message: string;
  }[];
};
