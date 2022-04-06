import Login from "../pages/Login";
import Quizzes from "../pages/Quizzes";

export enum RouteNames {
  Login = "/login",
  Quizzes = "/",
}

export interface IRoute {
  path: string;
  exact: boolean;
  component: React.ReactNode;
}
export const publicRoutes: IRoute[] = [
  {
    path: RouteNames.Login,
    exact: true,
    component: <Login />,
  },
];

export const privateRoutes: IRoute[] = [
  {
    path: RouteNames.Quizzes,
    exact: true,
    component: <Quizzes />,
  },
];
