import { useRef } from "react/cjs/react.development";

const LoginWidgetContainer = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const RecoverMfa = useRef();

  return { emailRef, passwordRef,RecoverMfa };
};

export { LoginWidgetContainer };
