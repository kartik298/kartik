import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { authToken } from "../../services/auth/authSlice";
import { BackgroundPage } from "../BackgroundPage";
import { LoginWidget } from "../Login/LoginWidget";
import { ConfirmPasswordWidget } from "../../routes/ConfirmPasswordWidget/ConfirmPasswordWidget";
import { RecoverAccountWidget } from "../RecoverAccountPage/RecoverAccountWidget";
import { RecoverMfaWidget } from "../RecoverMfaPage/RecoverMfaWidget";
import { SignUpWidget } from "../SignUp/SignUpWidget";
import { Logo } from "../../components/CommonComponents/Logo";
import bqp_logo from "../../assets/images/bqphy.png";

export const LoginSignupWidget = ({ type }) => {
  const token = useSelector(authToken);
  if (type === "login") {
    if (token.jwt !== null) {
      return <Navigate to="/dashboard/myproject" />;
    }
    return (
      <>
        <Logo
          logo_src={bqp_logo}
          customStyle={"w-52 absolute -top-0 mx-8 -left-8"}
        />
        <BackgroundPage
          imgStyle={
            "bg-car-simulation mx-3 px-6 py-10 h-full m-5 bg-no-repeat bg-left"
          }>
          <div className="block p-8 rounded-lg shadow-lg bg-white max-w-sm w-full px-5 text-gray-700 rounded transition ease-in-out">
            <div className="block px-3 py-1.5 rounded transition ease-in-out m-0">
              <LoginWidget />
            </div>
          </div>
          {/* <Footer /> */}
        </BackgroundPage>
      </>
    );
  } else if (type === "signup") {
    return (
      <>
        <Logo
          logo_src={bqp_logo}
          customStyle={"w-52 absolute -top-0 mx-8 -left-8"}
        />
        <BackgroundPage
          imgStyle={
            "bg-car-simulation mx-3 px-6 py-10 h-full m-5 bg-no-repeat bg-left "
          }>
          <div className="block p-8 rounded-lg shadow-lg bg-white max-w-sm w-full px-5 text-gray-700 rounded transition ease-in-out">
            <div className="block px-3 py-1.5 rounded transition ease-in-out m-0">
              <SignUpWidget />
            </div>
          </div>
          {/* <Footer /> */}
        </BackgroundPage>
      </>
    );
  } else if (type === "reset-password") {
    return (
      <>
        <Logo
          logo_src={bqp_logo}
          customStyle={"w-52 absolute -top-0 mx-8 -left-8"}
        />
        <BackgroundPage
          imgStyle={
            "bg-car-simulation mx-3 px-6 py-10 h-full m-5 bg-no-repeat bg-left "
          }>
          <div className="block p-8 rounded-lg shadow-lg bg-white max-w-sm w-full text-gray-700 rounded transition ease-in-out">
            <div className="block px-3 py-1.5 rounded transition ease-in-out m-0">
              <RecoverAccountWidget />
            </div>
          </div>
          {/* <Footer /> */}
        </BackgroundPage>
      </>
    );
  } else if (type === "confirm-password") {
    return (
      <>
        <Logo
          logo_src={bqp_logo}
          customStyle={"w-52 absolute -top-0 mx-8 -left-8"}
        />
        <BackgroundPage
          imgStyle={
            "bg-car-simulation mx-3 px-6 py-10 h-full m-5 bg-no-repeat bg-left "
          }>
          <div className="block p-8 rounded-lg shadow-lg bg-white max-w-sm w-full text-gray-700 rounded transition ease-in-out">
            <div className="block px-3 py-1.5 rounded transition ease-in-out m-0">
              <ConfirmPasswordWidget />
            </div>
          </div>
          {/* <Footer /> */}
        </BackgroundPage>
      </>
    );
  } else if (type === "mfa-recovery") {
    return (
      <>
        <Logo
          logo_src={bqp_logo}
          customStyle={"w-52 absolute -top-0 mx-8 -left-8"}
        />
        <BackgroundPage
          imgStyle={
            "bg-car-simulation mx-3 px-6 py-10 h-full m-5 bg-no-repeat bg-left "
          }>
          <div className="block p-8 rounded-lg shadow-lg bg-white max-w-sm w-full text-gray-700 rounded transition ease-in-out">
            <div className="block px-3 py-1.5 rounded transition ease-in-out m-0">
              <RecoverMfaWidget />
            </div>
          </div>
          <Footer />
        </BackgroundPage>
      </>
    );
  } else return null;
};
