const getWords = async () => {
  try {
    return [];
  } catch (error) {
    console.log(error);
    return null;
  }
};

const postWord = async ({
  wordInfo,
  partOfSpeech,
  phrases,
  antonyms,
  synonyms,
}) => {
  try {
    console.log(wordInfo);
  } catch (error) {
    console.log(error);
  }
};

export { getWords, postWord };
