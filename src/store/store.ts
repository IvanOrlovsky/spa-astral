import { legacy_createStore as createStore } from "redux";
import { rootReducer } from "./reducers/rootReduser";
import { composeWithDevTools } from "@redux-devtools/extension";

export const store = createStore(rootReducer, composeWithDevTools());
