import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import Quizzes from "./containers/Quizzes";
import Vocabulary from "./containers/Vocabulary";
import "./index.css";

function App() {
  // const DEFAULT_ACTIVE_TAB = "vocabulary";
  // const { active_tab } = useParams();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const active = (active_tab as Tabs) ?? DEFAULT_ACTIVE_TAB;
  //   navigate(`/${active}`);
  //   // eslint-disable-next-line
  // }, []);
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Layout>
        <Routes>
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/quizzes" element={<Quizzes />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} /> */}
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
