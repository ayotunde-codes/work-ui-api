import { Checkbox } from 'antd'
import { useState } from 'react'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { twMerge } from 'tailwind-merge'
import Candidate from './Candidate'


const ResultInfo = ({
  label, count, className, active
}: { label: string; count: number; className?: string; active?: boolean }) => {
  return (
    <span className={twMerge("flex px-[16px] border-r-[1px] cursor-pointer justify-center items-center ", className)}>
      <span className={active ? "text-primary" : ""}>
        {label}
      </span>
      <span className='w-[25px] h-[25px] bg-[#F7F8FD] flex m-0 ml-[8px] justify-center items-center text-[10px] rounded-3xl'>{count}</span>
    </span>
  )
}

export default function SearchResult() {
  const [candidateSelection, resetCandidateSelectiom] = useState<number[]>([]);
  const [checkAll, setCheckAll] = useState(false);

  const candidates = new Array(10).fill("candidate");
  const setCandidateSelection = (index: number) => {
    let newCandidateSelection = [...candidateSelection]
    if (!candidateSelection.includes(index)) {
      newCandidateSelection = [...candidateSelection, index];
    } else {
      newCandidateSelection = candidateSelection.filter((item) => item !== index);
    }

    resetCandidateSelectiom(newCandidateSelection)
    setCheckAll(candidates.length === newCandidateSelection.length);
  }

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    resetCandidateSelectiom(e.target.checked ? candidates.map((_, index) => index) : []);
    setCheckAll(e.target.checked);
  };

  return (
    <div className=" w-full  bg-white rounded-[16px]  py-[8px] px-[16px]">
      <div className="w-full  grid grid-flow-col gap-2 justify-between items-center grid-cols-[auto_max-content] border-b-[1px]">
        <div className='grid grid-flow-col gap-[32px] py-[16px] items-center'>
          <Checkbox onChange={onCheckAllChange} checked={checkAll} />
          <span className='text-primary font-[600]'>247 Candidates</span>
        </div>

        <div className='flex'>
          <ResultInfo
            active
            label='Qualified'
            count={10}
          />
          <ResultInfo
            label='Task'
            count={10}
          />
          <ResultInfo
            label='Disqualified'
            count={10}
            className='!border-r-0 pr-0'
          />
        </div>
      </div>

      <div>
        {candidates.map((_, index) => {
          return (
            <Candidate
              key={index}
              selected={candidateSelection.includes(index)}
              onSelect={() => setCandidateSelection(index)}
            />
          )
        })}
      </div>
    </div>
  )
}
