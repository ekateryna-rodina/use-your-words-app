import { useEffect, useState } from "react";
import { QuestionType, Quiz, WordWithId } from "use-your-words-common";
import request from "../../utils/request";
import { PlaySound } from "../PlaySound";

type CreateQuizProps = {
  words: WordWithId[];
};
const CreateQuiz = ({ words }: CreateQuizProps) => {
  const [quiz, setQuiz] = useState<null | Quiz>(null);
  const [quizName, setQuizName] = useState<string>("");
  const baseURL = "http://localhost:8080/api";
  const [createQuestionsURL, recreateQuestionURL, createQuizURL] = [
    `${baseURL}/questions`,
    `${baseURL}/question`,
    `${baseURL}/quiz`,
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
            quiz?.challenges
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
  const saveQuizQuestions = () => {
    request(createQuizURL, { ...quiz }, "POST")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (!words.length) return;

    request(createQuestionsURL, { wordIds: words.map((w) => w.id) }, "GET")
      .then((response: { quiz: Quiz }) => setQuiz(response.quiz))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!quiz) return;
    setQuizName(quiz.name as string);
  }, [quiz]);
  return (
    <>
      {quiz ? (
        <>
          <div>
            <label>
              Quiz Name:
              <input
                type="text"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
              />
            </label>
            <button onClick={saveQuizQuestions}>Save quiz</button>
          </div>
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
              {quiz.challenges.map((q, index) => (
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
                    ) : q.__type === QuestionType.Pronounce ||
                      q.__type === QuestionType.TypeWordByPronunciation ? (
                      <>
                        <PlaySound fileUrl={q.question} />
                      </>
                    ) : (
                      q.question
                    )}
                  </td>
                  <td>{q.__type}</td>
                  <td>
                    {q.options ? <div>{q.options.join("|")}</div> : <></>}
                  </td>
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
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default CreateQuiz;
