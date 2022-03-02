import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createBrowserHistory } from "history";
import Login from "./prospects/Login";
import Contacts from "./prospects/Contacts";
import CustomAlert from "./components/CustomAlert.jsx";
import { theme } from "./theme";
const history = createBrowserHistory();
function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter history={history}>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/contacts" element={<Contacts />} />
                    <Route exact path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
            <CustomAlert />
        </ThemeProvider>
    );
}

export default App;
