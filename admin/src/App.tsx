import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import Quizzes from "./containers/Quizzes";
import Vocabulary from "./containers/Vocabulary";
import { Tabs } from "./types";

function App() {
  const DEFAULT_ACTIVE_TAB = "vocabulary";

  const { active_tab } = useParams();
  const [activeTab, setActiveTab] = useState<Tabs>(
    (active_tab as Tabs) ?? DEFAULT_ACTIVE_TAB
  );
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/${activeTab}`);
    // eslint-disable-next-line
  }, [activeTab]);
  return (
    <main>
      <Layout setActiveTab={setActiveTab}>
        <Routes>
          <Route path="/:active_tab?" element={<App />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/quizzes" element={<Quizzes />} />
        </Routes>
      </Layout>
    </main>
  );
}

export default App;
