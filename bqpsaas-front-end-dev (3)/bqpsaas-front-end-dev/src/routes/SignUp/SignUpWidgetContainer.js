import { useRef } from "react";

const SignUpWidgetContainer = () => {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();

  return { emailRef, passwordRef, nameRef };
};

export default SignUpWidgetContainer;
