import React from "react";

type ThemeContextType = {
    colorMode?: "dark" | "light";
    toggleColorMode?: () => void;
};
export const ThemeContext = React.createContext<ThemeContextType>({
    colorMode: "light",
    toggleColorMode: () => { },
});