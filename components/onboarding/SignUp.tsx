import React from 'react';
import { DefaultButton, DefaultInput } from "@/components/reusables";
import type { NextPage } from "next";
import { LoginErrorCard } from '@Utils/actions/error';
import { SignUpController } from 'containers/onboardingApi';

const SignUp = ({ setPage, setPassData }: any) => {

  const { stateValues, handleSubmit, handleChange, handleClearError } = SignUpController(setPage, setPassData);


  const { country,
    firstName,
    lastName,
    email,
    businessName,
    referralCode,
    phoneNumber,
    password, loginError, loginErrorMssg, isLoggingIn } = stateValues

  return (
    <div className='w-2/3'>

      <DefaultInput
        type="text"
        name="businessName"
        label="Business Name"
        topLabel="Business Name"
        value={businessName}
        handleChange={handleChange}
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
        value={phoneNumber}
        handleChange={handleChange}
      />

      <DefaultInput
        type="email"
        name="email"
        label="Email Address"
        topLabel="Email Address"
        placeHolder="Enter Email Address"
        containerVariant="w-full py-2"
        value={email}
        handleChange={handleChange}
      />

      <DefaultInput
        type="password"
        name="password"
        label="Password"
        topLabel="Password"
        placeHolder="Enter Password"
        containerVariant="w-full py-2"
        value={password}
        validate={true}
        handleChange={handleChange}
      />

      <div className="flex items-start my-6">
        <div className="flex items-center h-5">
          <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
        </div>
        <label htmlFor="remember" className="ml-2 text-base font-300 text-blackish">
          By creating an account you agree to the <span className="text-darkslateblue underline">terms of use</span> and our <span className="text-darkslateblue underline">privacy policy</span>.</label>
      </div>


      <div className=" flex flex-col-reverse gap-5 sm sm:flex-row justify-between items-center">
        <DefaultButton
          labelText="Create Account"
          containerVariant="w-full"
          variant="w-full"
          isLoading={stateValues?.isLoggingIn}
          handleClick={handleSubmit}
        />
      </div>

      <LoginErrorCard handleClear={handleClearError} error={stateValues?.loginErrorMssg || ""} containerVariant={!stateValues?.loginError ? "hidden" : ""} />

      <div className="flex items-start my-6">
        <label htmlFor="remember" className="ml-2 text-base font-300 text-blackish text-center w-full">
          Already have an account? <span className="text-darkslateblue" onClick={() => setPage("signin")} >Login</span>
        </label>
      </div>

    </div>
  );
};

export default SignUp;