import { useRef } from "react";

const ConfirmPasswordWidgetContainer = () => {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return { passwordRef, confirmPasswordRef };
};

export default ConfirmPasswordWidgetContainer;
