import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  IRoute,
  privateRoutes,
  publicRoutes,
  RouteNames,
} from "../routes/index";

const AppRouter = () => {
  const auth = true;
  return (
    <Routes>
      {auth ? (
        <>
          {privateRoutes.map((r: IRoute) => (
            <Route key={r.path} path={r.path} element={r.component} />
          ))}
          <Route path="*" element={<Navigate to={RouteNames.Quizzes} />} />
        </>
      ) : (
        <>
          {publicRoutes.map((r: IRoute) => (
            <Route key={r.path} path={r.path} element={r.component} />
          ))}
          <Route path="*" element={<Navigate to={RouteNames.Login} />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
