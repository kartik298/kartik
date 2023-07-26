import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  toggleFileUploadModal,
  toggleOptimizationModal,
} from "../simulationWorkspaceSlice";
import toast from "react-hot-toast";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../routes/BaseUrl";
import axios from "axios";
import FileUploadProgressBar from "./FileUploadProgressBar";
import Cookies from "js-cookie";
import '../../../components/NavBar.css';

export function FileUploadModal() {
  const dispatch = useDispatch();
  const closeHandler = () => dispatch(toggleFileUploadModal());
  const optimizationModalHandler = () => dispatch(toggleOptimizationModal());
  const navigate = useNavigate();
  const outsideRef = useRef(null);
  useOnClickOutside(outsideRef, closeHandler);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mshUploadProgress, setMshUploadProgress] = useState(0);
  const [mshUploadError, setMshUploadError] = useState(false);
  const [glbUploadProgress, setGlbUploadProgress] = useState(0);
  const [glbUploadError, setGlbUploadError] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorStatus, setErrorStatus] = useState(false);

  const onUploadProgress = (event) => {
    const percentCompleted = Math.round((event.loaded * 100) / event.total);

    setUploadProgress(percentCompleted);
  };

  const mshUploadProgressHandler = (event) => {
    const percentCompleted = Math.round((event.loaded * 100) / event.total);
    setMshUploadProgress(percentCompleted);
  };

  const glbUploadProgressHandler = (event) => {
    const percentCompleted = Math.round((event.loaded * 100) / event.total);
    setGlbUploadProgress(percentCompleted);
  };

  const fileUploadHandler = async (values) => {
    Cookies.set("optimization-enabled", false);
    const simulationType = Cookies.get("simulation-type");
    setGlbUploadError(false);
    setMshUploadError(false);
    setGlbUploadProgress(0);
    setMshUploadProgress(0);

    setIsSubmitted(true);
    let formDataFileOne = new FormData();
    let formDataFileTwo = new FormData();

    formDataFileOne.append("file", values.mshFile);
    formDataFileTwo.append("file", values.glbFile);

    try {
      // sends a request with mshFile in body
      const mshFileResponse = await axios.post(
        baseUrl + "file",
        formDataFileOne,
        {
          onUploadProgress: mshUploadProgressHandler,
          withCredentials: true,
        }
      );

      // if sending of mshFile to server is success
      // then it tries to send glb file to the server
      try {
        const glbFileResponse = await axios.post(
          baseUrl + "file2",
          formDataFileTwo,
          {
            onUploadProgress: glbUploadProgressHandler,
            withCredentials: true,
          }
        );
      } catch (error) {
        setGlbUploadError(true);
        setIsSubmitted(false);
        toast.error("Please select a valid .glb file");
        return;
      }

      // if both the requests are successful then we can proceed ahead
      toast.success("Files were uploaded successfully!");
      if (simulationType === "solid") {
        optimizationModalHandler();
      }
      navigate("/simulation-workspace/setup");
      closeHandler();
    } catch (error) {
      toast.error("Please select a valid .msh file");
      setMshUploadError(true);
      setIsSubmitted(false);
    } finally {
    }
  };
  return (
    <div className="absolute w-full h-full flex justify-center items-center">
      <div className="absolute w-full h-full bg-gray-900 opacity-70"></div>
      <div
        className="absolute w-6/12 bg-white rounded-md p-10 flex flex-col gap-2"
        ref={outsideRef}
      >
        <div className="flex place-content-center items-center">
          <span className="text-bold font-semibold text-2xl">Upload Files</span>
          <span
            className="text-black text-2xl font-bold ml-auto cursor-pointer rounded hover:border-4 hover:bg-gray-200"
            onClick={closeHandler}
          >
            <AiOutlineClose />
          </span>
        </div>
        <div>
          <Formik
            initialValues={{
              mshFile: [],
              glbFile: [],
            }}
            onSubmit={(values) => {
              fileUploadHandler(values);
            }}
          >
            {({ values, handleSubmit, setFieldValue }) => (
                <Form>
                  <div className="bg-gray-100 hover:bg-gray-200 rounded border border-gray-400 shadow-sm">
                    <div className="text-center">
                      <div className="items-center my-2 py-3">
                        <label htmlFor="file" className="font-bold">
                          Upload a .msh file
                        </label>
                        <br />
                        <input
                          className="custom-file-upload"
                          id="msh-file-input"
                          name="mshFile"
                          type="file"
                          onChange={(event) => {
                            setFieldValue("mshFile", event.target.files[0]);
                          }}
                          multiple
                        />
                      </div>
                      <div>
                        <label htmlFor="file" className="font-bold">
                          Upload a .glb file
                        </label>
                        <br />
                        <input
                          className="custom-file-upload"
                          id="glb-file-input"
                          name="glbFile"
                          type="file"
                          onChange={(event) =>
                            setFieldValue("glbFile", event.target.files[0])
                          }
                          multiple
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="font-medium">
                        {isSubmitted
                          ? values.mshFile
                            ? values.mshFile.name
                            : null
                          : null}
                      </span>
                      <FileUploadProgressBar
                        isSubmitted={isSubmitted}
                        errorStatus={mshUploadError}
                        uploadProgress={mshUploadProgress}
                      />
                      <span className="font-medium">
                        {isSubmitted
                          ? values.glbFile
                            ? values.glbFile.name
                            : null
                          : null}
                      </span>
                      <FileUploadProgressBar
                        isSubmitted={isSubmitted}
                        errorStatus={glbUploadError}
                        uploadProgress={glbUploadProgress}
                      />
                    </div>
                  </div>

                  <div className="flex justify-around space-x-4">
                    <button
                      className="bg-iris-blue-500 hover:bg-iris-blue-800 text-white rounded font-bold hover:text-black h-12 w-52 text-center relative mt-3"
                      type="submit"
                    >
                      {isSubmitted ? "Submitting..." : "Submit"}
                    </button>

                    <button className="bg-iris-blue-500 hover:bg-iris-blue-800 text-white rounded font-bold hover:text-black h-12 w-52 text-center relative mt-3" onClick={closeHandler}>
                      Cancel
                    </button>
                  </div>
                </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
