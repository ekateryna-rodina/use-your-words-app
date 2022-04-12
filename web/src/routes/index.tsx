import Login from "../pages/Login";
import Practice from "../pages/Practice";
import Quizzes from "../pages/Quizzes";

export enum RouteNames {
  Login = "/login",
  Quizzes = "/",
  Practice = "/practice/:quizId",
}

export interface IRoute {
  path: string;
  exact?: boolean;
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
  {
    path: RouteNames.Practice,
    component: <Practice />,
  },
];
