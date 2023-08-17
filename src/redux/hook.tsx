import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAuthUserDispatch = () => useDispatch<AppDispatch>();
export const useAutUserSelector: TypedUseSelectorHook<RootState> = useSelector;