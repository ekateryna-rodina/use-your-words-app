import {
  ChooseAntonymByWord,
  ChooseMeaningByWord,
  ChooseSynonymByWord,
  ChooseWordByAntonym,
  ChooseWordByMeaning,
  ChooseWordBySynonym,
  FillGap,
  FindWordMeaningPair,
  Pronounce,
  TypeByPronunciation,
  TypeWordByMeaning,
} from "../QuzChallengeResults/";

const QuizQuestionsTable = () => {
  return (
    <>
      <FillGap />
      <Pronounce />
      <TypeByPronunciation />
      <TypeWordByMeaning />
      <FindWordMeaningPair />
      <ChooseWordByMeaning />
      <ChooseMeaningByWord />
      <ChooseWordBySynonym />
      <ChooseWordByAntonym />
      <ChooseAntonymByWord />
      <ChooseSynonymByWord />
    </>
  );
};

export default QuizQuestionsTable;
