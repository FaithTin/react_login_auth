import { reset } from "redux-form";
import { LOGIN, LOGOUT, ALERT_ERROR_AUTH } from "../action-types";
import { fetchData } from "../../api";
import { accessManagement as iam } from "../../utils";
export const login =
    ({ formValues, navigate }) =>
    async (dispatch) => {
        try {
            const res = await fetchData.post("http://malih-auth.ap-southeast-2.elasticbeanstalk.com/api/v1/auth/signin", formValues);
            const { tokenType, accessToken, id } = res.data;
            iam.tokenType.set(tokenType); 
            iam.token.set(accessToken); 
            iam.userId.set(id); 

            const userRes = await fetchData.get('http://malih-auth.ap-southeast-2.elasticbeanstalk.com/api/v1/getUserState/id/23');
            const userDetails = userRes.data.data;
            const { tenantReference } = userDetails;

            iam.tenantReference.set(tenantReference); 
            dispatch(reset("loginForm")); 
            dispatch({
                type: LOGIN,
                payload: { data: userDetails, message: "Successfully Login" },
            });
            navigate("/contacts"); 
        } catch (err) {
            dispatch({
                type: ALERT_ERROR_AUTH,
                payload: "ERROR: Cannot Login",
            });
        }
    };

export const getCurrentUser = (navigate) => async (dispatch, getState) => {
    
    const isAutoLogin = getState().auth.isSignedIn;

    if (isAutoLogin) {
        try {
            const res = await fetchData.get(
                'http://malih-auth.ap-southeast-2.elasticbeanstalk.com/api/v1/getUserState/id/23'
            );
            const userDetails = res.data.data;
            dispatch({
                type: LOGIN,
                payload: { data: userDetails, message: "Successfully Login" },
            });

            navigate("/contacts"); 
            return;
        } catch (err) {
            dispatch({
                type: ALERT_ERROR_AUTH,
                payload: "ERROR: Cannot Login",
            });
        }
    }
    navigate("/");
};

export const logout = (navigate) => (dispatch) => {
    iam.removeAll();
    dispatch({ type: LOGOUT });
    navigate("/");
};
