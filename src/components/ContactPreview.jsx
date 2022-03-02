import React from "react";
import {Dialog,DialogActions,DialogContent,DialogTitle,Grid,Typography,Button,Divider} from "@mui/material";
import PropTypes from "prop-types";

const ContactPreview = ({
    open,
    onClose,
    contacts: { id, email, name, phoneNumber, address, jobTitle, listId },
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="contact-preview-title"
            aria-describedby="contact-preview"
        >
            <DialogTitle id="contact-preview-title">{`List ${listId} - ${name} (ID: ${id})`}</DialogTitle>
            <Divider />
            <DialogContent>
                <Grid spacing={3} container>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">Email:</Typography>
                        <Typography variant="body1" color="textSecondary">
                            {email}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            Phone Number:
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            {phoneNumber ? phoneNumber : "N/A"}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            Home Address:
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            {address ? address : "N/A"}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">Job Title:</Typography>
                        <Typography variant="body1" color="textSecondary">
                            {jobTitle ? jobTitle : "N/A"}
                        </Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button variant="contained" color="secondary" onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ContactPreview.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    contacts: PropTypes.shape({
        id: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string,
        address: PropTypes.string,
        jobTitle: PropTypes.string,
        listId: PropTypes.number.isRequired,
    }),
};

export default ContactPreview;
