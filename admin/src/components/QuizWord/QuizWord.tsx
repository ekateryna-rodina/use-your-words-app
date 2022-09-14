import { WordWithId } from "use-your-words-common";

type QuizWordProps = {
  checked: boolean;
  disabled: boolean;
  onChange: (word: WordWithId) => void;
  word: WordWithId;
  connectedToQuiz: string[];
};

const QuizWord = ({
  checked,
  disabled,
  onChange,
  word,
  connectedToQuiz,
}: QuizWordProps) => {
  return (
    <div className="mt-2 flex">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(word)}
      />
      <span className="mx-2 text-sm">{word.word}</span>
      <div className="flex gap-2">
        {connectedToQuiz.map((qn) => (
          <div
            key={qn}
            className="border border-slate-300 border-dotted text-xs p-[2px] bg-blue-300 text-white"
          >
            {qn}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizWord;
