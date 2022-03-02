import { colors } from "@mui/material";
import { makeStyles } from "@mui/styles";
export const usePaginateStyles = makeStyles((theme) => ({
    root: {
        ...theme.typography.button,
        listStyle: "none",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
    },
    active: {},
    activeLink: {},
    break: {},
    breakLink: {},
    disabled: {},
    next: {
        marginLeft: theme.spacing(1),
    },
    nextLink: {
        padding: "6px 16px",
        outline: "none",
        cursor: "pointer",
        borderRadius: 4,
        "&:hover": {
            backgroundColor:
                theme.palette.type === "dark" ? "#595959" : colors.blueGrey[50],
        },
    },
    page: {},
    pageLink: {
        color: theme.palette.text.secondary,
        padding: theme.spacing(1),
        outline: "none",
        cursor: "pointer",
        width: 40,
        height: 40,
        borderRadius: "50%",
        display: "block",
        textAlign: "center",
        "&:hover": {
            backgroundColor:
                theme.palette.type === "dark" ? "#595959" : colors.blueGrey[50],
            color: theme.palette.text.primary,
        },
        "&$activeLink": {
            backgroundColor:
                theme.palette.type === "dark" ? "#595959" : colors.blueGrey[50],
            color: theme.palette.text.primary,
        },
    },
    previous: {
        marginRight: theme.spacing(1),
    },
    previousLink: {
        padding: "6px 16px",
        outline: "none",
        cursor: "pointer",
        borderRadius: 4,
        "&:hover": {
            backgroundColor:
                theme.palette.type === "dark" ? "#595959" : colors.blueGrey[50],
        },
    },
}));
