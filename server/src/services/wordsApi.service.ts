import axios from "axios";

export async function fetchInfo(word: string) {
  if (!word) {
    throw new Error("Input is not provided");
  }
  const endpointDictionary = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const endpointCollocations =
    "https://linguatools-english-collocations.p.rapidapi.com/bolls/";
  const endpointSynonymsAntonyms = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${process.env.MERRIAM_WEBSTER_THESAURUS}`;

  try {
    const dictionaryPromise = axios(endpointDictionary);
    const collocationsPromise = axios(endpointCollocations, {
      params: {
        lang: "en",
        query: word,
        max_results: "5",
      },
      headers: {
        "x-rapidapi-host": "linguatools-english-collocations.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPID_API_KEY,
      },
    });
    const synonymsAntonymsPromise = axios(endpointSynonymsAntonyms);

    const [dictionaryResponse, collocationsResponse, synonymsAntonymsResponse] =
      await Promise.all([
        dictionaryPromise,
        collocationsPromise,
        synonymsAntonymsPromise,
      ]);

    return {
      ...dictionaryResponse.data[0],
      collocations: collocationsResponse.data,
      synonymsAntonyms: synonymsAntonymsResponse.data[0],
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
