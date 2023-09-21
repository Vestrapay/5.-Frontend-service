import { DefaultInput, DefaultButton } from "@/components/reusables";
import type { NextPage } from "next";

const SignUp: NextPage = () => {
  return (
    <div className="relative bg-grayer w-full h-[100vh] overflow-hidden text-left text-base text-text flex justify-center font-nunito">
      <div className="sm:w-2/3 lg:w-1/3 xl:w-1/4 w-full bg-white h-full py-10 px-5 flex flex-col items-center overflow-y-auto">
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

        <div className=" flex flex-col justify-center items-center w-full px-10 ">
          <img
            className="mb-10 w-full h-px"
            alt=""
            src="/or.svg"
          />

          <DefaultInput
            type="text"
            name="businessName"
            label="Business Name"
            topLabel="Business Name"
            // value={pin}
            // handleChange={handleChange}
            placeHolder="Enter Business Name"
            containerVariant="w-full py-2"
          />

          <DefaultInput
            type="tel"
            name="phoneNumber"
            label="Phone Number"
            topLabel="Phone Number"
            placeHolder="Enter Phone Number"
            containerVariant="w-full py-2"
          // value={pin}
          // handleChange={handleChange}
          />

          <DefaultInput
            type="email"
            name="phoneNumber"
            label="Email Address"
            topLabel="Email Address"
            placeHolder="Enter Email Address"
            containerVariant="w-full py-2"
          // value={pin}
          // handleChange={handleChange}
          />

          <DefaultInput
            type="password"
            name="password"
            label="Password"
            topLabel="Password"
            placeHolder="Enter Password"
            containerVariant="w-full py-2"
          // value={pin}
          // handleChange={handleChange}
          />

          <div className="flex items-start my-6">
            <div className="flex items-center h-5">
              <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
            </div>
            <label htmlFor="remember" className="ml-2 text-base font-300 text-blackish">
              By creating an account you agree to the <span className="text-darkslateblue underline">terms of use</span> and our <span className="text-darkslateblue underline">privacy policy</span>.</label>
          </div>
          <DefaultButton
            labelText="Create Branch"
            // isLoading={isSubmitting}
            // handleClick={handelSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;