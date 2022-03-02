import React, { useState } from "react";

import { Login,Visibility,VisibilityOff } from "@mui/icons-material";
import { Field, reduxForm } from "redux-form";
import { Grid, Button, IconButton, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomTextField from "../../components/CustomTextField";

const useStyles = makeStyles((theme) => ({
    password: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    divider: { marginTop: theme.spacing(0.5), marginBottom: theme.spacing(0.5) },
}));
const LoginForm = (props) => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const onSubmit = (formValues) => props.onSubmit(formValues);
    return (
        <form onSubmit={onSubmit} autoComplete="off">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Field
                        name="username"
                        type="email"
                        label="Email"
                        required
                        component={CustomTextField}                   
                    />
                </Grid>
                <Grid item xs={12} className={classes.password} >
                    <Field                       
                        name="password" aria-labelledby="password-uid4-label password-uid4-helper password-uid4-valid password-uid4-error"
                        type={showPassword ? "text" : "password"}
                        label="Password" 
                        component={CustomTextField}
                        
                    />
                    <IconButton onClick={handleShowPassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <Divider className={classes.divider} />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        fullWidth
                        size="large"
                        startIcon={<Login />}
                        onClick={props.handleSubmit(onSubmit)}
                    >
                        Login
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};
function validate(values) {
    let errors = {};
    const { username, password } = values;
    const emailRegex = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (!username || !emailRegex.test(username)) {
        errors.username = "A valid email must be provided.";
    }
    if (!password) {
        errors.password = "A valid password must be provided";
    }

    return errors;
}

export default reduxForm({ validate, form: "loginForm" })(LoginForm);
