
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
}

export type IFormQuestion = {
  key?: number | string;
  label: React.ReactNode | string;
  internalUse: boolean | null;
  mandatory: boolean | null;
  show: boolean | null;
}
