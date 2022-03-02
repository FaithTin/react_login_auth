import React from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";
import { useSelector } from "react-redux";
import { useActions } from "../hooks";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomAlert = () => {
    const { cleanAlerts } = useActions();
    const { error, success } = useSelector((state) => state.contact);
    const handleClose = () => cleanAlerts();
    return (
        <>
            {error && (
                <Snackbar
                    open={error.open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity={error.severity}>
                        {error.message}
                    </Alert>
                </Snackbar>
            )}
            {success && (
                <Snackbar
                    open={success.open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity={success.severity}>
                        {success.message}
                    </Alert>
                </Snackbar>
            )}
        </>
    );
};

export default CustomAlert;
