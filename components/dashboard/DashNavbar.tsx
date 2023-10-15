import React, {useState} from 'react';
import {DatePicker, DateTimePicker} from "@mui/x-date-pickers";
import {Dayjs} from "dayjs";

const DashNavbar = () => {

    const [dateValue, setDateValue] = useState<Dayjs | null>();

    return (
        <div className="flex justify-between">
            <p className="text-ultraMarine text-2xl flex justify-start">Dashboard</p>
            <div className="flex justify-end items-center gap-3 text-card">
                {/* <DateTimePicker
                    views={['year', 'month', 'day', 'hours', 'minutes']}
                    value={dateValue}
                    onChange={(date) => {
                        setDateValue(date);
                    }}
                    ampm={true}
                    format={"DD/MM/YYYY hh:mm"}
                    sx={{
                        "& .MuiInputBase-root": {
                            borderRadius: "6px",
                            backgroundColor: "#FFF",
                            width: "250px",
                            height: "40px",
                            fontFamily: "Nunito",
                            border: "none",
                            outline: "none",
                            boxShadow: "none",
                        },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                border: "none", // Remove border for the outlined input
                            },
                        },
                    }}
                    className="flex items-center justify-center"
                /> */}
                <p className="text-sm w-[130px] h-[40px] flex justify-center items-center bg-selected p-4 rounded-md text-white">TEST</p>
            </div>
        </div>
    );
};

export default DashNavbar;