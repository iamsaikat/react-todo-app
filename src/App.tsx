import "./App.css";
import {
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Todos from "./pages/Todos/Todos";
import About from "./pages/About/About";
import Header from "./components/Header/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  const themeOptions: ThemeOptions = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#045794",
      },
      secondary: {
        main: "#f50057",
      },
    },
  });

  return (
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Todos />} />
            <Route path="/todo" element={<Todos />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
