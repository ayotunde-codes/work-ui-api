import React from "react";

export default function FormLayout({ header, content }: {
  header: string;
  content?: React.ReactNode;
}) {

  return (
    <>
      <div className="w-full rounded-[20px] overflow-hidden shadow-[3px_3px_14px_0px_rgba(190,190,190,0.30)]" >
        <div className="flex items-center bg-[#D0F7FA] w-full py-[29px] px-[32px] ">
          <h2 className="text-[25px] font-[600]">{header}</h2>
        </div>

        <div className="bg-white px-[30px]">
          {content}
        </div>
      </div>
    </>
  )
}