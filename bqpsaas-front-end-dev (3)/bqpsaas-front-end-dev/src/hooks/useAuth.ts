import { useMemo } from "react";
import { useSelector } from "react-redux";
import { authToken } from "../services/auth/authSlice";

export const useAuth = () => {
  // const user = useSelector(selectCurrentUser);
  const token = useSelector(authToken);

  return useMemo(() => ({ token }), [token]);
};
