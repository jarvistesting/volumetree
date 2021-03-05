import { combineReducers } from "redux";
import lang from "../Lang/LangReducer";
import loader from "../Loader/LoaderReducer";
import snackbar from "../Snackbar/SnackbarReducer";
import Feature1 from "../Feature1/FeatureReducer";
import User from "../User/UserReducer";

export default combineReducers({
  lang,
  loader,
  snackbar,
  Feature1,
  User
});
