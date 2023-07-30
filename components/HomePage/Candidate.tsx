import { Avatar, Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import React from "react";


export default function Candidate({ selected, onSelect }: { selected?: boolean; onSelect?: (e: CheckboxChangeEvent) => void }) {
  return (
    <div className="grid grid-flow-col gap-[24px] grid-cols-[max-content_max-content_auto] py-[16px] items-center border-b-[1px]" >
      <Checkbox
        checked={selected}
        className="w-[30px]"
        onChange={onSelect}
      />

      <Avatar
        size={56}
        className="!bg-[#EDF4FF] !text-[#D0E1FF] font-[600] !text-[20px]"
      >
        AK
      </Avatar>

      <div className="grid gap-[8px]">
        <h3 className="text-[14px] font-[600] text-black">Aaliyah Sanderson</h3>
        <h5 className="text-[10px] font-[500] text-black">Riyadh, Saudi Arabia</h5>
        <p className="text-[10px] font-[300] text-black">Bachelor - Cambridge University (2023 - 2023)</p>
        <div className="flex flex-wrap -ml-[8px] -mt-[4px] mb-[8px]">
          {new Array(15).fill("top_candidate").map((tag, index) => {
            return <span key={index}
              className="text-[8px] text-[#1D4ED8] ml-[8px] mt-[4px]">#{tag}</span>
          })}
        </div>
        <div className="flex flex-wrap -ml-[8px] -mt-[8px]">
          {new Array(12).fill("New York").map((category, index) => {
            return <span key={index}
              className="text-[8px] text-[#037092] ml-[8px] mt-[8px] py-[2px] px-[10px] bg-[#F3FAFC] rounded-3xl font-[500]">{category}</span>
          })}
        </div>
      </div>
    </div>
  )
}