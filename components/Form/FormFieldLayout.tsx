import React from "react";

export default function FormFieldLayout({
  content,
  label,
}: {
  content: React.ReactNode;
  label?: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[20px] font-[600] mb-[6px]">{label}</label>
      <div>{content}</div>
    </div>
  );
}
