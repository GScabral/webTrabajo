import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../home/sidebar/SideBar";
import BanModal from "../admin/controlUsers/ban/banModal";
import "./Layout.css";

const Layout = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [showPostForm, setShowPostForm] = useState(false);
    const { infoLogin: user } = useSelector(state => state.userState);

    const toggleDarkMode = () => setDarkMode(prev => !prev);
    const togglePostForm = () => setShowPostForm(prev => !prev);

    // 👉 Chequeo de baneo
    const isBanned =
        user?.bloqueado_hasta &&
        new Date(user.bloqueado_hasta) > new Date();

    if (isBanned) {
        return <BanModal user={user} />;
    }

    return (
        <div className={`app-layout ${darkMode ? "dark-mode" : ""}`}>
            <Sidebar
                user={user}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                togglePostForm={togglePostForm}
            />
            <main className="main-content">
                <Outlet
                    context={{
                        darkMode,
                        showPostForm,
                        toggleDarkMode,
                        togglePostForm
                    }}
                />
            </main>
        </div>
    );
};

export default Layout;
