import { FormikTextField } from "../../components/FormComponents/FormikTextField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRecoveryPassswordMutation } from "../../services/auth/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setkey } from "../../services/auth/keySlice";
import { useLocalAuth } from "../../hooks/useLocalAuth";
import { MainText } from "../../components/FormComponents/MainText";

const RecoverAccountWidget = () => {
  const dispatch = useDispatch();
  const [RecoveryPasssword, { isLoading }] = useRecoveryPassswordMutation();
  const navigate = useNavigate();
  const { setKeyWithExpiry } = useLocalAuth();

  return (
    <>
      <MainText className="font-bold" name="Enter your email here" />
      <Formik
        initialValues={{ email: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await RecoveryPasssword(values);
            const { data = undefined, error = undefined } = response;
            if (data) {
              dispatch(setkey(data));
              setKeyWithExpiry(data.key);
              navigate("/login");
              toast.success("Email has been sent to you for changing password");
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
          <FormikTextField
            label="Email Address"
            name="email"
            type="email"
            placeholder="hey@company.com"
          />
          <div className="flex align-center items-center">
            <button
              className="bg-iris-blue-500 text-md font-medium hover:bg-iris-blue-800 text-white px-5 rounded h-12 w-full hover:text-black"
              type="submit">
              {isLoading ? "Loading...." : "Reset-Password"}
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};
export { RecoverAccountWidget };
