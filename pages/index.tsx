import { DefaultInput } from "@/components/reusables";
import type { NextPage } from "next";

const SignUp: NextPage = () => {
  return (
    <div className="relative bg-gray w-full h-[100vh] overflow-hidden text-left text-base text-text flex justify-center font-nunito">
      <div className="w-1/3 bg-white h-full py-10 px-5 flex flex-col items-center">
        <div className=" flex flex-col justify-center items-center py-20 w-full">
          <img
            className="w-[92px] h-[92px]"
            alt=""
            src="/logo.svg"
          />
          <p className="top-[0px] left-[0px] font-semibold inline-block w-[94px] h-7 text-[25px] font-nunito">
            Sign Up
          </p>

        </div>
        <img
          className="top-[348px] left-[50px] w-[348px] h-px"
          alt=""
          src="/or.svg"
        />

        <div className=" flex flex-col justify-center items-center py-20 w-full">
          <DefaultInput
            type="email"
            name="pin"
            label="Username"
            // value={pin}
            // handleChange={handleChange}
            placeholder="Enter your username"
          />
          <div className=" w-[348px] h-[81px] text-sm">
            <div className=" w-[73px] h-[19px]">
              <div className=" opacity-[0.7]">
                Omoke Ent.
              </div>
            </div>
            <div className=" w-[111px] h-[22px] text-base">
              <label className="">Business Name</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;