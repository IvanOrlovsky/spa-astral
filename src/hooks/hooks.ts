import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "../store/store";

/*Определяем собственные хуки, которые будут знать о всех используемых
в хранилище типах, чтобы при использовании оригинальных хуков каждый раз
не уточнять типы*/
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
