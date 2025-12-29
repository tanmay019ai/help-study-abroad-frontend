import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#f5f7fb",
    },
  },
  typography: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
});

export default theme;
