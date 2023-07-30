import { IFormQuestionType } from "./interface";

export const formTypeMapping: { [key in IFormQuestionType]: string } = {
  Paragraph: "Paragraph",
  ShortAnswer: "Short Answer",
  YesNo: "Yes or No",
  Dropdown: "Dropdown",
  MultipleChoice: "Multiple Choice",
  Date: "Date",
  Number: "Number",
  FileUpload: "File Upload",
  Video: "Video question",
}