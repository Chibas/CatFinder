import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { theCatActions } from "../store/thecat/thecat.slice";

const actions = {
  ...theCatActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
