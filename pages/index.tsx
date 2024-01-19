/*******/
import { useEffect, useState } from 'react'
import SignIn from '@/components/onboarding/SignIn'
import ChangePassword from '@/components/onboarding/ChangePassword'
import SignUp from '@/components/onboarding/SignUp'
import ResetPassword from '@/components/onboarding/ResetPassword'
import CreatePassword from '@/components/onboarding/CreatePassword'
import VerifySignUp from '@/components/onboarding/VerifySignUp'
import VerifySignIn from '@/components/onboarding/VerifySignIn'
import OnBoardingLayout from '@/components/layouts/OnBoardingLayout'
import { useRouter } from "next/router";
import { Storage } from '@utils/inAppstorage'
import ValidateLogin from '@/components/onboarding/ValidateLogin'


export default function Home() {

    const [page, setPage] = useState("signup");
    const [resetingPass, setResetingPass] = useState(false);
    const [signInStatus, setSignInStatus] = useState(false);
    const [passData, setPassData] = useState({
        email: "",
        phoneNumber: "",
        password: ""
    });

    console.log("pass data: ", passData);

    const router = useRouter()

    useEffect(() => {
        const sectionToPage: { [key: string]: string } = {
            forgotpass: "forgotpass",
            reset: "reset",
            verifySignUp: "verifySignUp",
            verifySignIn: "verifySignIn",
            validatelogin: "validatelogin",
            createpass: "createpass",
            signin: "signin",
            signup: "signup",
        }

        const { section } = router.query

        const page = typeof section === "string" ? sectionToPage[section] : "signup"

        if (page === "signin" || page === "signup") {
            Storage.clearItem()
        }

        setPage(page)
    }, [router]);

    const setPageFunc = (page: string) => {
        router.push(`/login?section=${page}`).then(() => setPage(page))
    }

    const renderPages = () => {
        switch (page) {
            case 'signin':
                return <SignIn setPage={setPageFunc} resetingPass={resetingPass} setPassData={setPassData}
                    signInStatus={signInStatus} setResetingPass={setResetingPass} />;
            case 'forgotpass':
                return <ChangePassword setPage={setPageFunc} />;
            case 'reset':
                return <ResetPassword setPage={setPageFunc} setResetingPass={setResetingPass} />;
            case 'signup':
                return <SignUp setPage={setPageFunc} setPassData={setPassData} />;
            case 'createpass':
                return <CreatePassword setPage={setPageFunc} setResetingPass={setResetingPass} />;
            case 'verifySignUp':
                return <VerifySignUp setPage={setPageFunc} passData={passData} setSignInStatus={setSignInStatus} />;
            case 'verifySignIn':
                return <VerifySignIn setPage={setPageFunc} />;
            case 'validatelogin':
                return <ValidateLogin setPage={setPageFunc} resetingPass={resetingPass} setPassData={setPassData}
                    signInStatus={signInStatus} setResetingPass={setResetingPass} passData={passData} />;

            default:
                return <SignUp setPage={setPageFunc} resetingPass={resetingPass}
                    signInStatus={signInStatus} setResetingPass={setResetingPass} />;
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
