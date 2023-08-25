import { useState, createContext } from 'react';
import './ThemeColor.css';

export const ThemeContext = createContext();

function ThemeColor({ children }) {
    const [theme, setTheme] = useState(false);

    const toggleDarkMode = () => {
        theme
            ? document.querySelector('html').setAttribute('data-theme', 'light')
            : document.querySelector('html').setAttribute('data-theme', 'dark');
        setTheme(!theme);
    };

    return <ThemeContext.Provider value={{ theme, toggleDarkMode }}>{children}</ThemeContext.Provider>;
}

export default ThemeColor;
