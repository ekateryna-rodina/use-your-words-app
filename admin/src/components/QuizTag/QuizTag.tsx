type QuizTagProps = {
  name: string;
};
const QuizTag = ({ name }: QuizTagProps) => {
  return (
    <div className="p-1 text-xs border border-blue-300 text-slate-300">
      {name}
    </div>
  );
};

export default QuizTag;
