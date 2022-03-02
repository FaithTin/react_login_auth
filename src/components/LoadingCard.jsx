import React from "react";
import { Card, CardContent, LinearProgress, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
const utilstyles = makeStyles(() => ({
    root: {
        height: "calc(100vh - 40px)",
    },
    content: { marginTop: "25%" },
    textContainer: { textAlign: "center" },
}));
const LoadingCard = () => {
    const classes = utilstyles();
    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <LinearProgress color="primary" />
            </CardContent>
            <CardContent className={classes.textContainer}>
                <Typography variant="subtitle1">Loading...</Typography>
            </CardContent>
        </Card>
    );
};

export default LoadingCard;
