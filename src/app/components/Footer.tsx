import React from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";

const Footer = () => {
  return (
    <footer className="p-4 flex justify-between items-center">
      <p className="text-sm">&copy; {new Date().getFullYear()} Sam Carrington</p>
      <ThemeSwitcher />
    </footer>
  );
};

export default Footer;