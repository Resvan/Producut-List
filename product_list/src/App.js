import { useSelector } from "react-redux";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Box, createTheme, ThemeProvider } from '@mui/material';
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Home from "./Pages/Home/Home";

function App() {
  const currentUser = useSelector((state) => Boolean(state.token));
  const mode = useSelector((state) => state.mode);

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const Layout = () => {
    return (
      <>
        <ThemeProvider theme={darkTheme}>
          <Box bgcolor={'background.default'} color={'text.primary'}>
            <Navbar />
            <Outlet />
          </Box>
        </ThemeProvider>
      </>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };



  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
       
      </Route>
      <Route
        path="/login"
        element={currentUser ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={currentUser ? <Navigate to="/" /> : <Signup />}
      />
    </Routes>
  );
}

export default App;
