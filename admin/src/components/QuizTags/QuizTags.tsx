import { useFetchTagsQuery } from "../../features/app-api-slice";
import { CreatableSelector } from "../CreatableSelector";

const QuizTags = ({ control }: { control: any }) => {
  const tagsResponse = useFetchTagsQuery();
  return (
    <div className="ml-[1px]">
      <CreatableSelector
        control={control}
        name={"tags"}
        options={tagsResponse.data ?? []}
      />
    </div>
  );
};

export default QuizTags;
