import React, { useEffect, useState } from "react";
import { WordWithId } from "../../types";
import request from "../../utils/request";

type CreateQuizProps = {
  words: WordWithId[];
};
const CreateQuiz = ({ words }: CreateQuizProps) => {
  const [questions, setQuestions] = useState<null | []>([]);
  const baseURL = "http://localhost:8080/api";
  const createQuestionsURL = `${baseURL}/questions`;
  useEffect(() => {
    if (!words.length) return;

    request(createQuestionsURL, { wordIds: words.map((w) => w.id) }, "GET")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);
  return <div>{words.map((w) => w.id)}</div>;
};

export default CreateQuiz;
