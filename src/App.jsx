import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import Profile from "./pages/profile/Profile";
import NotFoundPage from "./pages/404/NotFoundPage";
import HomePage from "./pages/home/HomePage";
import { AuthProvider } from "./context/AuthContext";
import Inicio from "./pages/Inicio/Inicio";
import NavBar from "./components/NavBar/NavBar"

function App() {

  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={ <HomePage /> } />
          <Route path="/publicaciones" element={ <Inicio /> } />
          <Route path="*" element={ <NotFoundPage /> } />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/register" element={ <RegisterPage /> } />
          <Route path="/profile" element={ <Profile /> } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
