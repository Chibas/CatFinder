import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { theCatActions } from "../store/thecat/thecat.slice";
import { authActions } from "../store/auth/auth.slice";

const actions = {
  ...theCatActions,
  ...authActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
