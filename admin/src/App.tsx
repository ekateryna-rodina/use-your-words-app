import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import Dashboard from "./containers/Dashboard";
import Quizzes from "./containers/Quizzes";
import Vocabulary from "./containers/Vocabulary";

function App() {
  return (
    <main>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/quizzes" element={<Quizzes />} />
        </Routes>
      </Layout>
    </main>
  );
}

export default App;
