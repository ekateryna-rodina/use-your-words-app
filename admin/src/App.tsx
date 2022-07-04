import { useEffect } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import { useAppDispatch } from "./app/hooks";
import { Layout } from "./components/Layout";
import Quizzes from "./containers/Quizzes";
import Vocabulary from "./containers/Vocabulary";
import { Tabs } from "./types";

function App() {
  const DEFAULT_ACTIVE_TAB = "vocabulary";

  const { active_tab } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const active = (active_tab as Tabs) ?? DEFAULT_ACTIVE_TAB;
    navigate(`/${active}`);
    // eslint-disable-next-line
  }, []);
  return (
    <main className="px-4 py-4">
      <Layout>
        <Routes>
          {/* <Route path="/:active_tab?" element={<App />} /> */}
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/quizzes" element={<Quizzes />} />
        </Routes>
      </Layout>
    </main>
  );
}

export default App;
