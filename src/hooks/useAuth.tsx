import { useEffect } from "react";
import { RootState } from "../store";
import { User } from "../store/auth/auth.slice";
import { useActions } from "./actions";
import { useAppSelector } from "./redux";

export const useAuth = () => {
  const isAuthenticated: boolean = useAppSelector(
    (state: RootState) => state.auth.authenticated
  );
  const activeUser: User | null = useAppSelector(
    (state: RootState) => state.auth.user
  );
  const { registerDemoUser } = useActions();

  useEffect(() => {
    if (!isAuthenticated) {
      registerDemoUser();
    }
  }, [isAuthenticated, registerDemoUser]);

  return { isAuthenticated, activeUser };
};
