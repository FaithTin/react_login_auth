import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form"; 
import authReducer from "./authReducer";
import contactReducer from "./contactReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    contact: contactReducer, 
    form: reduxForm, 
});

export default rootReducer;
