import React from "react";
import { useAppSelector } from "../../app/hooks";
import { MenuItem } from "../../types";
import HistoryIcon from "../icons/HistoryIcon";
import HomeIcon from "../icons/HomeIcon";
import UserProfileIcon from "../icons/UserProfileIcon";
import { Switcher } from "../Switcher";

const MobileMenu = () => {
  const { active } = useAppSelector((state) => state.menu);
  const { isDark } = useAppSelector((state) => state.theme);
  return (
    <div className={`mobile-menu absolute bottom-0 left-0 right-0`}>
      <HomeIcon
        fill={
          active === MenuItem.Home
            ? "fill-purple"
            : isDark
            ? "fill-light"
            : "fill-gray-800"
        }
        isFocused={active === MenuItem.Home}
      />
      <HistoryIcon
        fill={
          active === MenuItem.History
            ? "fill-purple"
            : isDark
            ? "fill-light"
            : "fill-gray-800"
        }
        isFocused={active === MenuItem.History}
      />
      <UserProfileIcon
        fill={
          active === MenuItem.User
            ? "fill-purple"
            : isDark
            ? "fill-light"
            : "fill-gray-800"
        }
        isFocused={active === MenuItem.User}
      />
      <Switcher />
    </div>
  );
};

export default MobileMenu;
