import { fetchTags, postTags } from "../services/tags.service";

export async function getAllTags() {
  try {
    const tags = await fetchTags();
    return tags;
  } catch (error) {
    throw new Error(error);
  }
}
export async function saveTags(tags: string[]) {
  try {
    const newWord = await postTags(tags);
    return newWord;
  } catch (error) {
    throw new Error(error);
  }
}
