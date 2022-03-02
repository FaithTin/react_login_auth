import {GET_CONTACT_LIST, ADD_NEW_CONTACT,UPDATE_CONTACT_DETAILS, DELETE_CONTACTS,
    CLEAN_CONTACT_DETAILS,CLEAN_CONTACT,SET_CONTACT_DETAILS,CLEAN_ALERTS,ALERT_ERROR,
} from "../action-types";
import { reset } from "redux-form";
import { fetchData } from "../../api";

export const getContactList = () => async (dispatch) => {
    try {
        const res = await fetchData.get("http://malih-auth.ap-southeast-2.elasticbeanstalk.com/campaign/getAllUploadedEmails/listId/480");
        const contacts = res.data;
        contacts.reverse();
        dispatch({
            type: GET_CONTACT_LIST,
            payload: {
                data: contacts,
                message: "SUCCESS: Successfully fetched contacts",
            },
        });
    } catch (err) {
        dispatch({
            type: ALERT_ERROR,
            payload: "ERROR: Cannot retrieve contacts",
        });
    }
};

export const addNewContact = (formValues) => async (dispatch) => {
    
    dispatch(reset("contactForm"));
    try {
        await fetchData.post("/emailUpload", [
            {
                ...formValues,
                listId: 480,
            },
        ]);
        const res = await fetchData.get("http://malih-auth.ap-southeast-2.elasticbeanstalk.com/campaign/getAllUploadedEmails/listId/480");
        dispatch({
            type: ADD_NEW_CONTACT,
            payload: {
                data: res.data[res.data.length - 1],
                message: "SUCCESS: Successfully add new contact",
            },
        });
    } catch (err) {
        dispatch({
            type: ALERT_ERROR,
            payload: "ERROR: Cannot add contact",
        });
    }
};

export const updateContactDetails = (formValues) => async (dispatch) => {
    try {
        await fetchData.put("/updateEmail", formValues);
        dispatch({
            type: UPDATE_CONTACT_DETAILS,
            payload: {
                data: formValues,
                message: `SUCCESS: Successfully update contact with ID:${formValues.id}`,
            },
        });
    } catch (err) {
        dispatch({
            type: ALERT_ERROR,
            payload: `ERROR: Cannot update contact with ID: ${formValues.id}`,
        });
    }
};

export const deleteContacts = (contactIds) => async (dispatch) => {
    try {
        await fetchData.delete("/deleteEmails", {
            data: contactIds, 
        });
        dispatch({
            type: DELETE_CONTACTS,
            payload: {
                data: contactIds,
                message: `SUCCESS: Successfully deleted ${contactIds.length} contacts`,
            },
        });
    } catch (err) {
        dispatch({
            type: ALERT_ERROR,
            payload: `ERROR: Cannot delete ${contactIds.length} contacts`,
        });
    }
};

export const setContactDetails = (contact) => (dispatch) =>
    dispatch({ type: SET_CONTACT_DETAILS, payload: contact });

export const cleanContactDetails = () => (dispatch) =>
    dispatch({ type: CLEAN_CONTACT_DETAILS });

export const cleanContact = () => (dispatch) =>
    dispatch({ type: CLEAN_CONTACT });

export const cleanAlerts = () => (dispatch) => dispatch({ type: CLEAN_ALERTS });
