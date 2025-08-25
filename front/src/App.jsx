// src/App.jsx
import { Route, Routes } from "react-router-dom";
import Landing from "./home/Landing/Landing";
import Home from "./home/Home";
import Login from "./home/Login/Login";
import Register from "./home/Register/register";
import Perfil from "./home/Perfil/Perfil";
import DetailPost from "./home/post/viewPost";
import Chat from "./home/chat/Chat";
import ChatsRecientes from "./home/chat/chatRecientes/ChatReciente";
import MiPerfil from "./home/MiPerfil/MiPerfil";
import Layout from "./Layout/Layout";
import ForgotPassword from "./home/Register/ForgotPassword";
import ResetPasswordForm from "./home/Register/recuperarPassword";
import PrivateRoute from "./PrivateRoute";
import AdminComment from "./admin/comentarios/getAllcomment";
import ControlUserAll from "./admin/controlUsers/allUserControl";
import PostAdmin from "./admin/PostAdmin/PostAdmin"
import StatsAdmin from "./admin/stats/stats";
import Reports from "./admin/controlUsers/report/reportes"
import "./App.css"

function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPasswordForm />} />

      {/* Rutas privadas con Layout */}
      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/perfil/:id" element={<Perfil />} />
        <Route path="/postDetail/:id" element={<DetailPost />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/chatReciente" element={<ChatsRecientes />} />
        <Route path="/MiPerfil/:id" element={<MiPerfil />} />
        <Route path="/adminComment" element={<AdminComment />} />
        <Route path="/controlUser" element={<ControlUserAll />} />
        <Route path="/postadmin" element={<PostAdmin/>} />
        <Route path="/stats" element={<StatsAdmin/>} />
        <Route path="/reportes" element={<Reports/>} />
      </Route>
    </Routes>
  );
}

export default App;
