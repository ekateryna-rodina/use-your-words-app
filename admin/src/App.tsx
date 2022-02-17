import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Challenges from "./containers/Challenges";
import Dashboard from "./containers/Dashboard";
import Vocabulary from "./containers/Vocabulary";

function App() {
  return (
    <main>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/challenges" element={<Challenges />} />
        </Routes>
      </Layout>
    </main>
  );
}

export default App;
