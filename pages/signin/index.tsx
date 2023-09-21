import React from 'react';
import OnBoardingLayout from "@/components/layouts/OnBoardingLayout";
import SignIn from "@/components/onboarding/SignIn";
import ChangePassword from "@/components/onboarding/ChangePassword";
import ResetPassword from "@/components/onboarding/ResetPassword";

const Index = () => {
    return (
        <OnBoardingLayout>
            <ResetPassword />
        </OnBoardingLayout>
    );
};

export default Index;