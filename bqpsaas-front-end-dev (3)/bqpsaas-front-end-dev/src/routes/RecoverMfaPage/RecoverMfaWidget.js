import { FormikTextField } from "../../components/FormComponents/FormikTextField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRecoveryMfaMutation } from "../../services/auth/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const RecoverMfaWidget = () => {
  const [RecoveryMfa, { isLoading }] = useRecoveryMfaMutation();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await RecoveryMfa(values);
          toast.success("Email has been sent to you for changing password");
          navigate("/login");
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
        <div className="flex items-center justify-between">
          <button
            className="bg-iris-blue-500 text-md font-medium hover:bg-iris-blue-800 text-white px-5 rounded h-12 w-full hover:text-black"
            type="submit">
            {isLoading ? "Loading...." : "Reset Password"}
          </button>
        </div>
      </Form>
    </Formik>
  );
};
export { RecoverMfaWidget };
