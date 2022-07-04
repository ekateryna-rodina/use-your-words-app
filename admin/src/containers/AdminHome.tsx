import { useState } from "react";

const AdminHome = () => {
  const tabs = {
    vocabulary: {
      title: "Vocabulary",
      content: <div>vocabulary</div>,
    },
    quizzes: {
      title: "Quizzes",
      content: <div>quizzes</div>,
    },
  };

  type Tabs = "vocabulary" | "quizzes";
  const [activeTab, setActiveTab] = useState<Tabs>("vocabulary");
  return (
    <>
      <h3>Admin panel</h3>
      <ul>
        <li>Vocabulary</li>
        <li>Quizzes</li>
      </ul>
      <main>{tabs[activeTab].content}</main>
    </>
  );
};

export default AdminHome;
