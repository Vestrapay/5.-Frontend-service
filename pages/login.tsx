import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

/*******/
import { useState } from 'react'
import SignIn from '@/components/onboarding/SignIn'
import ChangePassword from '@/components/onboarding/ChangePassword'
import SignUp from '@/components/onboarding/SignUp'
import ResetPassword from '@/components/onboarding/ResetPassword'
import CreatePassword from '@/components/onboarding/CreatePassword'
import VerifySignUp from '@/components/onboarding/VerifySignUp'
import VerifySignIn from '@/components/onboarding/VerifySignIn'
import OnBoardingLayout from '@/components/layouts/OnBoardingLayout'


export default function Home() {

    const [page, setPage] = useState("signup");
    const [resetingPass, setResetingPass] = useState(false);
    const [passData, setPassData] = useState({
        email: "",
        phoneNumber: ""
    });

    const renderPages = () => {
        switch (page) {
            case 'signin':
                return <SignIn setPage={setPage} resetingPass={resetingPass} setResetingPass={setResetingPass} />;
            case 'forgotpass':
                return <ChangePassword setPage={setPage} />;
            case 'reset':
                return <ResetPassword setPage={setPage} setResetingPass={setResetingPass} />;
            case 'signup':
                return <SignUp setPage={setPage} setPassData={setPassData} />;
            case 'createpass':
                return <CreatePassword setPage={setPage} setResetingPass={setResetingPass} />;
            case 'verifySignUp':
                return <VerifySignUp setPage={setPage} passData={passData} />;
            case 'verifySignIn':
                return <VerifySignIn setPage={setPage} />;

            default:
                return <SignUp setPage={setPage} />;
        }
    }

    return (
        <div>
            <OnBoardingLayout page={page} >
                {renderPages()}
            </OnBoardingLayout>
        </div>
    )
}
