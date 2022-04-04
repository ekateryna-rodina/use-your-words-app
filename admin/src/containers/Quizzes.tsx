import React, { useEffect, useState } from "react";
import { Quiz } from "../types";
import request from "../utils/request";

const Quizzes = () => {
  const [quzzes, setQuizzes] = useState<Quiz[] | null>();
  const getQuizzesURL = "http://localhost:8080/api/quiz";
  useEffect(() => {
    request(getQuizzesURL, undefined, "GET")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }, []);
  return <div>Challenges</div>;
};

export default Quizzes;
