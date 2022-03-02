import React, { useEffect, useState } from "react";
import { Button, Fab, Tooltip } from "@mui/material";
import LoadingCard from "../../components/LoadingCard.jsx";
import ContactForm from "./ContactForm";
import ContactPreview from "../../components/ContactPreview";
import { useActions } from "../../hooks";
import { Add, Logout } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { reset, initialize } from "redux-form";
import { useNavigate, Navigate } from "react-router-dom";
import _ from "lodash";
import ReusableTable from "../../components/ReusableTable";
import { Container,FloatingActionButtonContainer,FloatingButtonSpacer} from "./styled-components";

const Contacts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openForm, setOpenForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const {
        getContactList,
        addNewContact,
        updateContactDetails,
        deleteContacts,
        cleanContact,
        setContactDetails,
        cleanContactDetails,
        logout,
    } = useActions();
    const { isSignedIn } = useSelector((state) => state.auth);
    const { collections: contacts, details: contactDetails } = useSelector(
        (state) => state.contact
    );
    const handleLogout = () => logout(navigate);
    const form = {
        open: () => setOpenForm(true),
        close: () => {
            dispatch(reset("contactForm")); 
            setOpenForm(false);
        },
    };
    const actions = {
        submit: (formValues) => {
            form.close();
            if (isEditing) {
                updateContactDetails(formValues);
            } else {
                addNewContact(formValues);
            }
        },
        create: () => {
            setIsEditing(false);
            dispatch(initialize("contactForm", {})); 
            form.open();
        },
        edit: (contact) => {
            setIsEditing(true);
            dispatch(initialize("contactForm", contact)); 
            form.open();
        },
        view: {
            open: (contact) => {
                setContactDetails(contact);
            },
            close: () => cleanContactDetails(),
        },
        delete: (contactIds) => {
            deleteContacts(contactIds);
        },
    };

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            getContactList();
        }
        return () => {
            mounted = false;
            cleanContact();
        };
    }, [getContactList, cleanContact]);
    if (!isSignedIn) {
        return <Navigate to="/" />;
    }
    return (
        <Container>
            {contacts ? (
                <ReusableTable
                    data={contacts.map((contact) => ({
                        ..._.omit(contact, ["listId"]),
                        edit: (
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={() => actions.edit(contact)}
                            >
                                Edit
                            </Button>
                        ),
                        view: (
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => actions.view.open(contact)}
                            >
                                View
                            </Button>
                        ),
                    }))}
                    onDelete={actions.delete}
                />
            ) : (
                <LoadingCard />
            )}
            <FloatingActionButtonContainer>
                <FloatingButtonSpacer>
                    <Tooltip title="Add new contact">
                        <Fab color="primary" onClick={actions.create}>
                            <Add />
                        </Fab>
                    </Tooltip>
                </FloatingButtonSpacer>
                <FloatingButtonSpacer>
                    <Tooltip title="Logout">
                        <Fab color="secondary" onClick={handleLogout}>
                            <Logout />
                        </Fab>
                    </Tooltip>
                </FloatingButtonSpacer>
            </FloatingActionButtonContainer>
            <ContactForm
                open={openForm}
                onClose={form.close}
                onSubmit={actions.submit}
                title={isEditing ? "Edit Contact" : "Add Contact"}
            />
            {contactDetails !== null && (
                <ContactPreview
                    open={contactDetails !== null}
                    onClose={actions.view.close}
                    contacts={contactDetails}
                />
            )}
        </Container>
    );
};

export default Contacts;
