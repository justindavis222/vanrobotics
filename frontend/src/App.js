import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { Welcome, ClassBatches, ClassBatch, Learners } from "./containers";
const defaultTheme = createTheme();

const App = () => {
  return (
    <section className="main-container">
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Van Robotics
            </Typography>
          </Toolbar>
        </AppBar>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/classbatch/:classbatchId" element={<ClassBatch />} />
            <Route path="/learners" element={<Learners />} />
            <Route path="/classbatches" element={<ClassBatches />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </section>
  );
};

export default App;
