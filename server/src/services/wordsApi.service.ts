import axios from "axios";

export async function fetchWordDictionary(word: string) {
  if (!word) {
    throw new Error("Input is not provided");
  }
  const endpoint = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  console.log(endpoint);
  try {
    const { data } = await axios(endpoint);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
