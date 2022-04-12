export declare type Word = {
    word: string;
    fileUrl: string;
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
