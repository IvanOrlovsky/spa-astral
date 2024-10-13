import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { rootReducer } from "./reducers/rootReduser";
import { composeWithDevTools } from "@redux-devtools/extension";

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

// Определяем тип хранилища redux, там определены
export type AppStore = typeof store;
// Через утилитный тип определяем тип хранимых данных возвращаемых из метода getState()
export type RootState = ReturnType<AppStore["getState"]>;
// Определяем тип метода dipatch()
export type AppDispatch = AppStore["dispatch"];
