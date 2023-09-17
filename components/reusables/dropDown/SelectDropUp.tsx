/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { SelectDropDownProps } from './interface'

const SelectDownUp = ({
  label,
  placeHolder="",
  onHandleChange,
  value,
  error,
  options,
  variant,
  containerVariant,
  optionHeight = 'h-20'
}: SelectDropDownProps) => {

  type item = {
    [key: string]: any; 
  }
  //Business category
  const [defaultValue, setDefautValue] = useState("");
  const [showOption, setShowOption] = useState(false);

  //Variable
  const iconSty = 'w-3 h-3 text-label-color absolute right-3 top-1/2 -mt-2';

  useEffect(() => {
    setDefautValue(value || placeHolder);
  });

  const handleSelect = (e: any, item: any) => {
    //Send selected to form
    setDefautValue(item.label);
    setShowOption(false);
    //Send to form
    onHandleChange(e, JSON.stringify(item))
    
  };

  return (
    <div className={`${containerVariant} relative`}>
        <label className="mb-1.5 text-gray-200 text-sm font-medium">
            {label}
        </label>
        {
          showOption && (
              <div
                  style={{zIndex: 99}}
                  className={`
                      rounded-t-none rounded-b-lg ${optionHeight} bg-white w-full
                      border-gray-light absolute border border-t-0 text-left
                      animate__animated animate__fadeIn left-0 top-20 -mt-2 overflow-y-auto overflow-x-hidden
                  `}  
                >
                { (options?.length > 0) && options.map((item: item, index: React.Key | null | undefined) => (
                    <div
                        key={`${item.value}-${index}`}
                        className="hover:bg-gray-light border border-gray-300 border-x-0 border-t-0 mx-2 borer-b-1"
                        onClick={(e: any) => handleSelect(e, item)}
                    >
                      <div className="w-full h-10 flex flex-row justify-start items-center px-2">
                          <span className="text-sm">{item.label}</span>
                      </div>
                    </div>
                ))}
              </div>
            )
        }
        <div className={`${variant} ${error ? 'border-red-500': ''} capitalize relative ${showOption && 'rounded-b-none'}`} 
          onClick={() => setShowOption(!showOption)}
        >
          <span className={`${value ? 'text-black' : 'text-gray-250'} text-sm`}>
            {defaultValue}
          </span>
          {
              showOption ?
              (
                  <BsChevronUp className={iconSty} /> )
              : 
              (
                  <BsChevronDown className={iconSty} />
              )
          }
        </div>
      <p className="text-red-500 text-xs h-1 py-1">{error}</p>
    </div>
  );
};

export default SelectDownUp;