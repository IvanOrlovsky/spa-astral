import { legacy_createStore as createStore } from "redux";
import { rootReducer } from "./reducers/rootReduser";

export const store = createStore(rootReducer);
