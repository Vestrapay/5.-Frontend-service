import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { DDateDropdown } from "../dropDown/interface";

const App = ({
    inputVariant,
    containerVariant,
    toggleVariant,
    readOnly,
    asSingle,
    useRange,
    minDate,
    maxDate,
    date,
    handleChange
}: DDateDropdown) => {
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });

    const handleValueChange = (newValue: any) => {
        handleChange(newValue);
        setValue(newValue);
    }

    useEffect(() => {
        setValue(date);
    }, [date])


    return (
        <Datepicker
            value={value}
            readOnly={readOnly || false}
            separator={">"}
            asSingle={asSingle || false}
            useRange={useRange || false}
            onChange={handleValueChange}
            displayFormat={"DD-MM-YYYY"}
            inputClassName={`placeholder:text-gray-450 placeholder:text-sm 
            placeholder:min-w-max w-full leading-6 text-base font-400 
            border px-8 py-1 rounded-lg border-gray-light focus:border-primary-blue 
            focus:border-[0.5px] border-gray-light focus:border-black-200 h-11 lg:w-[300px] ${inputVariant}`}
            containerClassName={`border-gray-light focus:border-primary-blue focus:border-[0.5px] 
             border-gray-light focus:border-black-200 ${containerVariant}`}
            toggleClassName={`${toggleVariant}`}
            minDate={minDate || new Date("2020-01-05")}
            maxDate={maxDate || new Date()}
        />
    );
};
export default App;