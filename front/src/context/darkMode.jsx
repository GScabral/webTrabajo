import { createContext, useState, useContext } from "react";

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <div className={darkMode ? "dark-mode" : ""}>
                {children}
            </div>
        </DarkModeContext.Provider>
    );
};

// Hook para usar el contexto en cualquier componente
export const useDarkMode = () => useContext(DarkModeContext);
