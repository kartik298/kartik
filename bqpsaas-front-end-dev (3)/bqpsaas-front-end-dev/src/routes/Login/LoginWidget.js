import { useState } from "react";
import { FormikTextField } from "../../components/FormComponents/FormikTextField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../../services/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../services/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useLocalAuth } from "../../hooks/useLocalAuth";
import toast from "react-hot-toast";
import { MainText } from "../../components/FormComponents/MainText";
import TermsConditionModal from "../TermsConditionModal";
const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error.message);
    return null;
  }
};

const LoginWidget = () => {
  const [agree, setAgree] = useState(false);
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const { setAuthTokenWithExpiry } = useLocalAuth();
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const showMo = () => {
    setShowModal(true);
    setAgree(!agree);
  };
  let flag = false;
  if (agree === true) {
    flag = false;
  } else {
    flag = true;
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().required("Required"),
        otp: Yup.number().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await login(values);
          console.log(values);
          console.log(response);
          const decodedToken = decodeJWT(response.data.jwt);
          console.log(decodedToken.id);
          const startTime=new Date()
          localStorage.setItem("starttime",startTime);
          localStorage.setItem("id",decodedToken.id);
          const { data = undefined, error = undefined } = response;
          if (data) {
            dispatch(setCredentials(data));
            setAuthTokenWithExpiry(data.jwt);
            navigate("/dashboard/myproject");
            toast.success("You've successfully logged in");
          } else if (error) {
            const { detail } = error.data;
            if (detail) {
              toast.error(detail);
            } else {
              toast.error("Something went wrong");
            }
          }
          setSubmitting(false);
        } catch (error) {}
      }}>
      <Form>
        <MainText className="font-bold" name="Welcome Back!" />
        <FormikTextField
          label="Email"
          name="email"
          type="email"
          placeholder="johndoe@company.com"
        />
        <FormikTextField
          label="Password"
          name="password"
          type="password"
          placeholder="*********"
        />
        <Link
          className="relative -top-6 inline-block font-bold text-sm text-iris-blue-500 hover:text-gray-500"
          to="/reset-password">
          Forgot Password?
        </Link>
        <FormikTextField
          label="Authentication Pass code"
          name="otp"
          type="otp"
        />
        {/* <Link
          className="relative -top-6 inline-block font-bold text-sm text-iris-blue-500 hover:text-gray-500"
          to="/mfa-recovery">
          Recover 2FA Code?
        </Link> */}
        <div className="flex justify-center m-2 relative -top-2 text-sm">
          <input
            type="checkbox"
            id="agree"
            className="m-1 btn-modal"
            onClick={showMo}
          />
          <label htmlFor="agree">
            {" "}
            I agree to <b>Terms & Conditions</b>
          </label>
        </div>
        <div className="flex">
          <button
            disabled={!agree}
            type="submit"
            className={`${
              flag === true
                ? "bg-iris-blue-500 hover:bg-gray-500 text-md text-white px-5 rounded h-12 w-full font-medium disabled:opacity-100 cursor-not-allowed"
                : "bg-iris-blue-500 text-md font-medium hover:bg-iris-blue-800 text-white px-5 rounded h-12 w-full hover:text-black"
            } `}>
            {isLoading ? "Loading..." : "Log In"}
          </button>
        </div>
        <p className="m-3 p-3 text-center font-sm mx-4 mb-0">OR</p>
        <Link
          className="relative -right-12 inline-block font-bold text-sm text-iris-blue-500 hover:text-gray-500"
          to="/signup">
          Don't have an account? Sign Up
        </Link>
        {showModal ? (
          <TermsConditionModal
            customStyle=""
            closeMo={closeModal}
            showMo={showModal}
          />
        ) : null}
      </Form>
    </Formik>
  );
};
export { LoginWidget };
