import React, { FC, useContext } from "react";

import { Moon, Sun } from "lucide-react-native";
import { Pressable } from "components/ui/pressable";
import { ThemeContext } from "@/providers/ThemeContext";
import { Icon } from "components/ui/icon";


const ModeChangeButton : FC = () => {
  const { colorMode, toggleColorMode } = useContext(ThemeContext);
  return (
    <Pressable onPress={toggleColorMode} className={`${colorMode === "light" ? "bg-background-dark" : "bg-background-light"} rounded-full p-4 `}>
      <Icon
        as={colorMode === "light" ? Moon : Sun}
        color={`${colorMode === 'light' ? "#E5E5E5" : "#262626"}`}
        size='lg'
      />
    </Pressable>
  );
};

export default ModeChangeButton;