import { makeStyles } from "@mui/styles";
export const useReusableTableStyles = makeStyles((theme) => ({
    root: {},
    content: {
        padding: 0,
    },
    inner: {
        minWidth: 700,
    },
    actions: {
        padding: theme.spacing(1),
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
    },
}));
