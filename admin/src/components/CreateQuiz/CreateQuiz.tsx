import React, { useEffect, useState } from "react";
import { QuestionType, Quiz, WordWithId } from "../../types";
import request from "../../utils/request";

type CreateQuizProps = {
  words: WordWithId[];
};
const CreateQuiz = ({ words }: CreateQuizProps) => {
  const [quiz, setQuiz] = useState<null | Quiz>(null);
  const baseURL = "http://localhost:8080/api";
  const [createQuestionsURL, recreateQuestionURL] = [
    `${baseURL}/questions`,
    `${baseURL}/question`,
  ];

  const regenerateNewQuestion = (
    wordId: string,
    questionType: QuestionType
  ) => {
    request(
      recreateQuestionURL,
      {
        wordId,
        quizWordIds: Array.from(
          new Set(
            quiz?.questions
              .filter((q) => q.wordId !== wordId)
              .map((q) => q.wordId)
          )
        ),
        questionType,
      },
      "GET"
    )
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (!words.length) return;

    request(createQuestionsURL, { wordIds: words.map((w) => w.id) }, "GET")
      .then((response: { questions: Quiz }) => setQuiz(response.questions))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {quiz ? (
        <table style={{ width: "100%", height: "100%" }}>
          <thead>
            <tr>
              <th>№</th>
              <th>Question</th>
              <th>Type of Question</th>
              <th>Options</th>
              <th>Answer</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {quiz.questions.map((q, index) => (
              <tr key={q.wordId + index}>
                <td>{index + 1}</td>
                <td>
                  {typeof q.question === "object" ? (
                    <>
                      <ul>
                        Words
                        {q.question.words.map((w) => (
                          <li key={w}>{w}</li>
                        ))}
                      </ul>
                      <ul>
                        Meanings
                        {q.question.meanings.map((m) => (
                          <li key={m}>{m}</li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    q.question
                  )}
                </td>
                <td>{q.__type}</td>
                <td>{q.options ? <div>{q.options.join("|")}</div> : <></>}</td>
                <td>
                  {typeof q.answer === "object" ? (
                    <ul>
                      Correct connections
                      {Object.keys(q.answer).map((c) => (
                        <li key={c}>
                          {c} -
                          {
                            (q.answer as Record<string, string>)[
                              c as keyof typeof q.answer
                            ]
                          }
                        </li>
                      ))}
                    </ul>
                  ) : (
                    q.answer
                  )}
                </td>
                <td>
                  <button
                    onClick={() => regenerateNewQuestion(q.wordId, q.__type)}
                  >
                    Regenerate question
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </>
  );
};

export default CreateQuiz;
