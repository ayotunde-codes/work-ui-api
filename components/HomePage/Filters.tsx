import { Collapse, Input } from "antd"
import React from "react"


export default function Filters() {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const filters = [
    {
      label: "Personal Information",
      dropdown: true,
    },
    {
      label: "Education",
      dropdown: true,
    },
    {
      label: "Work Experience",
      dropdown: true,
    },
    {
      label: "Activity Filter",
      dropdown: true,
    },
    {
      label: "Advanced Filter",
      dropdown: false,
    },
  ]

  return (
    <div>
      <Input
        placeholder="Serach by name, edu, exp or #tag"
        className='!py-[13px] !px-[16px] rounded-[8px] border-[#F3F3F3] mb-[24px]'
        prefix={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className='mr-[6px]'>
          <path d="M13.0303 11.9697C12.7374 11.6768 12.2626 11.6768 11.9697 11.9697C11.6768 12.2626 11.6768 12.7374 11.9697 13.0303L13.0303 11.9697ZM16.9697 18.0303C17.2626 18.3232 17.7374 18.3232 18.0303 18.0303C18.3232 17.7374 18.3232 17.2626 18.0303 16.9697L16.9697 18.0303ZM8.33333 13.4167C5.52589 13.4167 3.25 11.1408 3.25 8.33333H1.75C1.75 11.9692 4.69746 14.9167 8.33333 14.9167V13.4167ZM3.25 8.33333C3.25 5.52589 5.52589 3.25 8.33333 3.25V1.75C4.69746 1.75 1.75 4.69746 1.75 8.33333H3.25ZM8.33333 3.25C11.1408 3.25 13.4167 5.52589 13.4167 8.33333H14.9167C14.9167 4.69746 11.9692 1.75 8.33333 1.75V3.25ZM13.4167 8.33333C13.4167 11.1408 11.1408 13.4167 8.33333 13.4167V14.9167C11.9692 14.9167 14.9167 11.9692 14.9167 8.33333H13.4167ZM11.9697 13.0303L16.9697 18.0303L18.0303 16.9697L13.0303 11.9697L11.9697 13.0303Z" fill="#B0BABF" />
        </svg>}
        suffix={
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className='ml-[6px]'>
            <path d="M10.0415 12.875H10.3415C10.3415 12.7093 10.2072 12.575 10.0415 12.575V12.875ZM10.0415 12.9583L10.0414 13.2583C10.121 13.2583 10.1973 13.2267 10.2536 13.1705C10.3099 13.1142 10.3415 13.0379 10.3415 12.9583H10.0415ZM9.9585 12.9583H9.6585C9.6585 13.1239 9.79276 13.2582 9.95842 13.2583L9.9585 12.9583ZM9.9585 12.875V12.575C9.79281 12.575 9.6585 12.7093 9.6585 12.875H9.9585ZM10.3 7.04163C10.3 6.87594 10.1657 6.74163 10 6.74163C9.83431 6.74163 9.7 6.87594 9.7 7.04163H10.3ZM9.7 10.375C9.7 10.5406 9.83431 10.675 10 10.675C10.1657 10.675 10.3 10.5406 10.3 10.375H9.7ZM10 17.2C6.02355 17.2 2.8 13.9764 2.8 10H2.2C2.2 14.3078 5.69218 17.8 10 17.8V17.2ZM2.8 10C2.8 6.02355 6.02355 2.8 10 2.8V2.2C5.69218 2.2 2.2 5.69218 2.2 10H2.8ZM10 2.8C13.9764 2.8 17.2 6.02355 17.2 10H17.8C17.8 5.69218 14.3078 2.2 10 2.2V2.8ZM17.2 10C17.2 13.9764 13.9764 17.2 10 17.2V17.8C14.3078 17.8 17.8 14.3078 17.8 10H17.2ZM9.7415 12.875V12.9583H10.3415V12.875H9.7415ZM10.0416 12.6583L9.95857 12.6583L9.95842 13.2583L10.0414 13.2583L10.0416 12.6583ZM10.2585 12.9583V12.875H9.6585V12.9583H10.2585ZM9.9585 13.175H10.0415V12.575H9.9585V13.175ZM9.7 7.04163V10.375H10.3V7.04163H9.7Z" fill="#9AA6AC" />
          </svg>
        }
      />

      <div className="bg-white rounded-[8px]">
        <div className="grid grid-flow-col gap-3 justify-between items-center py-[18px] px-[16px] border-[#F2F2F2] border-b-[1px]">
          <span className="font-bold">Filters</span>
          <span className="text-[12px]">0 Selected</span>
        </div>

        <Collapse
          items={filters.map((filter, index) => {
            return ({
              key: index,
              label: filter.label,
              children: <p className="text-[#d5d5d5]">
                Filter options comes here
              </p>,
              extra: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M12 7.5L9 10.5L6 7.5" stroke="#1D4ED8" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              ),
              className: "!border-[#F2F2F2] rounded-0",
              onClick: () => {
                // alert("onclick")
              },
            })
          })}
          defaultActiveKey={['1']}
          onChange={onChange}
          expandIcon={() => (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6.00004 11.3333H10M6.00004 9.33333H10M12.6664 6H9.73311C9.35974 6 9.17325 5.99999 9.03064 5.92733C8.9052 5.86341 8.80328 5.76145 8.73937 5.63601C8.66671 5.4934 8.66671 5.3067 8.66671 4.93333V2M12.6667 11.8667V6.43599C12.6667 6.12699 12.6668 5.97248 12.6335 5.82621C12.6039 5.6965 12.5553 5.57192 12.4888 5.45666C12.4139 5.32668 12.3089 5.21331 12.0989 4.98657L9.96684 2.68392C9.73351 2.43192 9.61673 2.30592 9.4779 2.21562C9.35485 2.13558 9.21914 2.07643 9.07681 2.04052C8.91623 2 8.74485 2 8.40142 2H5.46684C4.7201 2 4.34645 2 4.06124 2.14532C3.81036 2.27316 3.60653 2.47714 3.4787 2.72803C3.33337 3.01324 3.33337 3.3866 3.33337 4.13334V11.8667C3.33337 12.6134 3.33337 12.9868 3.4787 13.272C3.60653 13.5229 3.81036 13.7268 4.06124 13.8547C4.34645 14 4.7201 14 5.46684 14H10.5335C11.2802 14 11.6533 14 11.9386 13.8547C12.1894 13.7268 12.3937 13.5229 12.5215 13.272C12.6668 12.9868 12.6667 12.6134 12.6667 11.8667Z" stroke="#0B0B0B" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          )}
          className="!bg-white !border-[0px]"
        />
      </div>

    </div>
  )
}