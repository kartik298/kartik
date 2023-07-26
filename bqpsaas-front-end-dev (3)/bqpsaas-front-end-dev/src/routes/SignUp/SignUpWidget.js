import { useState } from "react";
import { FormikTextField } from "../../components/FormComponents/FormikTextField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../services/auth/authApi";
import toast from "react-hot-toast";
import { MainText } from "../../components/FormComponents/MainText";
import TermsConditionModal from "../TermsConditionModal";

const SignUpWidget = () => {
  const [agree, setAgree] = useState(false);
  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();
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
      initialValues={{ email: "", name: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        name: Yup.string()
          .max(15, "Must be 15 characters or less")
          .matches(
            /^[a-zA-Z0-9_-]*$/,
            "Only hyphens and underscores allowed, no spaces"
          )
          .required("Required"),
        password: Yup.string()
          .min(8, "Must be 8 characters or more")
          .required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await signup(values);
          if (response.data) {
            console.log(response.data, "details");
            toast.success("Email has been sent to you for authentication");
            navigate("/login");
            setSubmitting(false);
          } else if (response.error.status === 401) {
            toast.error("Credential Error");
          } else if (response.error.status === 400) {
            toast.error("User with this email already exists.");
          } else {
            throw new Error("Cannot fetch users");
          }
        } catch (error) {
          console.log(error.status);
        }
      }}
    >
      <Form>
        <MainText className="font-bold" name="Get Started!" />
        <FormikTextField
          label="Email Address"
          name="email"
          type="email"
          placeholder="johndoe@company.com"
        />
        <FormikTextField
          label="Name"
          name="name"
          type="text"
          placeholder="John Doe"
        />
        <FormikTextField
          label="Password"
          name="password"
          type="password"
          placeholder="*********"
        />
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
        <div className="flex items-center justify-between">
          <button
            disabled={!agree}
            type="submit"
            className={`${
              flag === true
                ? "bg-iris-blue-500 hover:bg-gray-500 text-md text-white px-5 rounded h-12 w-full font-medium disabled:opacity-100 cursor-not-allowed"
                : "bg-iris-blue-500 text-md font-medium hover:bg-iris-blue-800 text-white px-5 rounded h-12 w-full hover:text-black"
            } `}
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </div>
        <p className="m-3 p-3 text-center font-sm mx-4 mb-0">OR</p>
        <Link
          className="relative -right-12 inline-block font-bold text-sm text-iris-blue-500 hover:text-gray-500"
          to="/login"
        >
          Already have an account? Log In
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

export { SignUpWidget };
