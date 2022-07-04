import React from "react";
import { Link } from "react-router-dom";
import { Tabs } from "../../types";

type LayoutProps = {
  setActiveTab: React.Dispatch<React.SetStateAction<Tabs>>;
};
const Layout: React.FC<LayoutProps> = ({ children, setActiveTab }) => {
  return (
    <>
      <h3>Admin panel</h3>
      <ul>
        <li>
          <Link to="/vocabulary">Vocabulary</Link>
        </li>
        <li>
          <Link to="/quizzes">Quizzes</Link>
        </li>
      </ul>
      <main>{children}</main>
    </>
  );
};
export default Layout;
