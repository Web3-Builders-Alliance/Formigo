import { useState } from "react";
import Question from "./Question";

type SurveyModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const CreateSurveyModal = ({ isOpen, handleClose }: SurveyModalProps) => {
  const [inputValue, setInputValue] = useState("");
  const [surveyContent, setSurveyContent] = useState<string[]>([]);
  const [contentIndex, setContentIndex] = useState<number | null>(null);
  if (!isOpen) return null;

  const addContent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newSurveyContent = [...surveyContent];

    if (contentIndex !== null) {
      newSurveyContent[contentIndex] = inputValue;
    } else {
      newSurveyContent.push(inputValue);
      setContentIndex(newSurveyContent.length - 1);
    }
    setSurveyContent(newSurveyContent);
    setInputValue("");
  };

  return (
    <div className="center fixed flex h-screen w-screen flex-col items-center justify-center">
      <div className="absolute h-full w-full bg-white opacity-90 brightness-90"></div>
      <div className="z-10 flex h-1/6 w-4/6 flex-col items-center justify-center rounded-xl bg-white pb-8 pt-8 text-black shadow-2xl">
        <form
          onSubmit={addContent}
          className="flex h-full w-full flex-col items-center justify-between rounded-xl"
        >
          <h1 className="w-10/12 rounded-xl p-2 pb-4 pt-4 text-center text-3xl font-bold text-black">
            Survey Creator
          </h1>
          {contentIndex + " "}
          {surveyContent + " "}
          {surveyContent.map((ele, index) => {
            return <p key={index}>{ele}</p>;
          })}
          <div className="flex w-10/12 justify-start"></div>
          <input
            type="text"
            placeholder={
              contentIndex === null
                ? "Add Question"
                : surveyContent[contentIndex]
                ? surveyContent[contentIndex]
                : "Add Question"
            }
            className="w-full rounded-xl border-2 text-center text-black"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          ></input>

          <div className="items-centerjustify-center flex w-10/12">
            <div className="h-full w-full">
              <button
                className="ml-1 mr-1 h-10 w-20 rounded-xl bg-formigo-blue p-1 pl-2 pr-2 text-white"
                type="submit"
              >
                Review
              </button>
              <button
                className="ml-1 h-10 w-20 rounded-xl bg-formigo-blue p-1 pl-2 pr-2 text-white"
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </button>

              <button
                className="ml-1 mr-1 h-10 w-20 rounded-xl bg-formigo-blue p-1 pl-2 pr-2 text-white"
                type="button"
                onClick={() => {
                  if (contentIndex !== null && contentIndex > 0) {
                    setContentIndex(contentIndex - 1);
                    setInputValue(surveyContent[contentIndex - 1]);
                  }
                }}
              >
                {" "}
                {"<"}
              </button>
              <button
                className="ml-1 mr-1 h-10 w-20 rounded-xl bg-formigo-blue p-1 pl-2 pr-2 text-white"
                type="button"
                onClick={() => {
                  if (
                    (contentIndex !== null &&
                      contentIndex < surveyContent.length - 1) ||
                    (contentIndex !== null &&
                      inputValue.trim() === surveyContent[contentIndex])
                  ) {
                    setContentIndex(contentIndex + 1);
                    setInputValue(surveyContent[contentIndex + 1]);
                  } else if (inputValue.trim() === "") {
                  } else {
                    let newSurveyContent = [...surveyContent];
                    newSurveyContent.push(inputValue);
                    if (contentIndex === null) {
                      setContentIndex(1);
                    } else {
                      setContentIndex(contentIndex + 1);
                    }
                    setSurveyContent(newSurveyContent);
                    setInputValue(""); // Clear the input field
                  }
                  // (contentIndex !== null && inputValue !== surveyContent[contentIndex]) {
                  //     let newSurveyContent = [...surveyContent];
                  //     newSurveyContent.push(inputValue);
                  //     setContentIndex(contentIndex + 1);
                  //     setSurveyContent(newSurveyContent);
                  //     setInputValue(""); // Clear the input field
                }}
              >
                {">"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSurveyModal;
