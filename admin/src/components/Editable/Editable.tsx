import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../app/hooks";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";
import { wordSchema } from "../../schema/wordSchema";
import { FormValue, WordWithId } from "../../types";
import request from "../../utils/request";
import { Collapsible } from "../Collapsible";
import { DynamicMultipleTextarea } from "../DynamicMultipleTextarea";

const Editable = () => {
  const { isEdit, currentWord } = useAppSelector((state) => state.wordDetails);
  const { id, word, partOfSpeech, meanings, phrases, synonyms, antonyms } =
    currentWord as WordWithId;
  const [expanded, setExpanded] = useState<string[]>([]);
  const resolver = useYupValidationResolver(wordSchema);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const {
    handleSubmit,
    register,
    control,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver,
    defaultValues: {
      pronunciationRadio: "autofill",
      meanings: meanings.map((m: FormValue | string) => {
        return { ...(m as FormValue), name: "meanings" };
      }),
      phrases: phrases.map((p: FormValue | string) => {
        return { ...(p as FormValue), name: "phrases" };
      }),
      synonyms: synonyms.map((s: FormValue | string) => {
        return { ...(s as FormValue), name: "synonyms" };
      }),
      antonyms: antonyms.map((a: FormValue | string) => {
        return { ...(a as FormValue), name: "antonyms" };
      }),
    },
  });

  const [postPutUrl, wordInfoUrl] = [
    "http://localhost:8080/api/words",
    "http://localhost:8080/api/wordsApi",
  ];

  const submitFileToStorage = async () => {
    if (file?.name) {
      const [cloudName, uploadPreset] = [
        process.env.REACT_APP_CLOUD_NAME ?? "",
        process.env.REACT_APP_UPLOAD_PRESET ?? "",
      ];

      if (!cloudName || !uploadPreset) return;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("resource_type", "video");
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
          formData
        );
        return response.data.secure_url;
      } catch (error) {
        return null;
      }
    }
  };

  const onSaveWordHandler = async (values: any) => {
    let fileUrl = getValues("fileUrl");
    setLoading(true);
    console.log(
      getValues("pronunciationRadio"),
      ["upload", "record"].includes(getValues("pronunciationRadio"))
    );
    if (["upload", "record"].includes(getValues("pronunciationRadio"))) {
      fileUrl = await submitFileToStorage();
    }

    if (currentWord) {
      request(
        postPutUrl,
        { ...values, id: currentWord.id, fileUrl: fileUrl },
        "PUT"
      )
        .then((info) => console.log(info))
        .catch((err) => console.log(err));
    } else {
      request(postPutUrl, { ...values, fileUrl }, "POST")
        .then((info) => console.log("in", fileUrl, info))
        .catch((err) => console.log(err));
    }

    setLoading(false);
  };
  const data = [
    { title: "Definitions", name: "meanings", items: currentWord?.meanings },
    { title: "Examples", name: "phrases", items: currentWord?.phrases },
    { title: "Synonyms", name: "synonyms", items: currentWord?.synonyms },
    { title: "Antonyms", name: "antonyms", items: currentWord?.antonyms },
  ];
  return (
    <div className="h-full">
      <form
        className="mt-4"
        onSubmit={handleSubmit(
          (data) => onSaveWordHandler(data),
          (e) => {
            console.log(e);
          }
        )}
      >
        <div className="bordered-paragraph mt-4">
          {partOfSpeech.map((p) => (p as FormValue).value).join(", ")}
        </div>
        <div className="overflow-y-auto max-h-[600px] pr-4">
          {data.map((d) => (
            <Collapsible
              key={d.title}
              title={d.title}
              {...{ expanded, setExpanded }}
            >
              {currentWord && isEdit ? (
                <>
                  <DynamicMultipleTextarea
                    name={d.name}
                    formValuesInit={d.items}
                    control={control}
                    register={register}
                  />
                </>
              ) : (
                <>
                  {d.items?.map((i) => (
                    <div
                      key={(i as FormValue).id}
                      className="bordered-paragraph"
                    >
                      {(i as FormValue).value}
                    </div>
                  ))}
                </>
              )}
            </Collapsible>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Editable;
