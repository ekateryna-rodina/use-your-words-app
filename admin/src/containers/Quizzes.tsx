import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { setActiveTab } from "../features/tabs/tabs-slice";
import { Quiz } from "../types";
import request from "../utils/request";

const Quizzes = () => {
  const [quzzes, setQuizzes] = useState<Quiz[] | null>();
  const getQuizzesURL = "http://localhost:8080/api/quiz";
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActiveTab("quizzes"));
    request(getQuizzesURL, undefined, "GET")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }, []);
  return <div>Challenges</div>;
};

export default Quizzes;
