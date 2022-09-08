export declare type Word = {
    word: string;
    fileUrl: string;
    isFreeze: boolean;
    meanings: string[] | {
        id?: string;
        value: string;
    }[];
    partOfSpeech: string[] | {
        id?: string;
        value: string;
    }[];
    phrases: string[] | {
        id?: string;
        value: string;
    }[];
    synonyms: string[] | {
        id?: string;
        value: string;
    }[];
    antonyms: string[] | {
        id?: string;
        value: string;
    }[];
};
export declare type WordWithId = Word & {
    id: string;
};
export declare enum QuestionType {
    FillGap = 0,
    Pronounce = 1,
    TypeWordByPronunciation = 2,
    TypeWordByMeaning = 3,
    ChooseMeaningByWord = 4,
    ChooseWordByMeaning = 5,
    ConnectWordsWithMeanings = 6,
    ChooseSynonymByWord = 7,
    ChooseAntonymByWord = 8,
    ChooseWordBySynonym = 9,
    ChooseWordByAntonym = 10
}
export declare type BaseQuestion = {
    id?: string;
    wordId: string;
    question: string | {
        words: string[];
        meanings: string[];
    };
    answer?: string | string[] | Record<string, string>;
    options?: string[];
};
export declare type FillGapQuestion = BaseQuestion & {
    __type: QuestionType.FillGap;
};
export declare type PronounceQuestion = BaseQuestion & {
    __type: QuestionType.Pronounce;
};
export declare type TypeWordByPronunciationQuestion = BaseQuestion & {
    __type: QuestionType.TypeWordByPronunciation;
};
export declare type TypeWordByMeaningQuestion = BaseQuestion & {
    __type: QuestionType.TypeWordByMeaning;
};
export declare type ChooseMeaningByWordQuestion = BaseQuestion & {
    __type: QuestionType.ChooseMeaningByWord;
};
export declare type ChooseWordByMeaningQuestion = BaseQuestion & {
    __type: QuestionType.ChooseWordByMeaning;
};
export declare type ConnectWordsWithMeaningsQuestion = BaseQuestion & {
    __type: QuestionType.ConnectWordsWithMeanings;
};
export declare type ChooseSynonymByWordQuestion = BaseQuestion & {
    __type: QuestionType.ChooseSynonymByWord;
};
export declare type ChooseAntonymByWordQuestion = BaseQuestion & {
    __type: QuestionType.ChooseAntonymByWord;
};
export declare type ChooseWordBySynonymQuestion = BaseQuestion & {
    __type: QuestionType.ChooseWordBySynonym;
};
export declare type ChooseWordByAntonymQuestion = BaseQuestion & {
    __type: QuestionType.ChooseWordByAntonym;
};
export declare type Challenge = BaseQuestion & {
    __type: QuestionType;
    isSelected?: boolean;
    word?: string;
};
export declare type Challenges = Challenge[];
export declare type Quiz = {
    id: string;
    name: string;
    isFreeze: boolean;
    challenges: Challenges;
};
