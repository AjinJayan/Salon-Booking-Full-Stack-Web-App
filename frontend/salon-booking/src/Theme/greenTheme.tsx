import { createTheme, Theme, ThemeOptions } from "@mui/material";

const themeOptions: ThemeOptions = {
    palette: {
        mode: "light",
        primary: {
            main: "#019031"
        },
        secondary: {
            main: "#EAF0F1"
        },
    }
};

export const theme: Theme = createTheme(themeOptions);
