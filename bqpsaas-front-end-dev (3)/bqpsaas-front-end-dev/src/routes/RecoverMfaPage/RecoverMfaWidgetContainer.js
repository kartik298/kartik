import { useRef } from "react";

const RecoverMfaWidgetContainer = () => {
  const emailRef = useRef();

  return { emailRef };
};

export default RecoverMfaWidgetContainer;
