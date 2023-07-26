import { FormikTextField } from "../../components/FormComponents/FormikTextField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useConfirmPasswordMutation } from "../../services/auth/authApi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { keyToken } from "../../services/auth/keySlice";
import { useLocalAuth } from "../../hooks/useLocalAuth";
import { setkey } from "../../services/auth/keySlice";
import { MainText } from "../../components/FormComponents/MainText";

const ConfirmPasswordWidget = () => {
  const [ConfirmPassword, { isLoading }] = useConfirmPasswordMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getKeyWithExpiry } = useLocalAuth();

  const key = getKeyWithExpiry("KeyBQP");
  if (key) {
    dispatch(setkey(key));
  }

  return (
    <>
      <MainText className="font-bold" name="Reset your password here" />
      <Formik
        initialValues={{ password: "", token: "" }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(8, "Must be 8 characters or more")
            .required("Required"),
          token: Yup.string().required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await ConfirmPassword(values);
            toast.success("Your password has been updated");
            navigate("/login");
            setSubmitting(false);
          } catch (error) {}
        }}>
        <Form>
          <FormikTextField
            label="Password"
            name="password"
            type="password"
            placeholder="*********"
          />
          <FormikTextField
            label="Token"
            name="token"
            type="token"
            placeholder="***-***"
          />
          <div className="flex">
            <button
              className="bg-iris-blue-500 text-md font-medium hover:bg-iris-blue-800 text-white px-5 rounded h-12 w-full hover:text-black"
              type="submit">
              {isLoading ? "Loading...." : "Submit"}
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};
export { ConfirmPasswordWidget };
