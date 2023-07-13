"use client";
import { data } from "autoprefixer";
import React from "react";
import Form from "./form";
import Results from "./results";

const Quotopia: React.FC = () => {
    const CHARACTER_LIMIT = 32;
  const ENDPOINT: string =
    "https://nkhgiknpt4.execute-api.ap-southeast-2.amazonaws.com/prod/generate_keywords_and_snippets";
  const [prompt, setPrompt] = React.useState("");
  const [snippet, setSnippet] = React.useState("");
  const [keywords, setKeywords] = React.useState([]);
  const [hasResult, setHasResult] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = () => {
    console.log("submitting" + prompt);
    setIsLoading(true);
    fetch(`${ENDPOINT}?prompt=${prompt}`)
      .then((res) => res.json())
      .then(onResult);
    // fetch(`${ENDPOINT}?prompt=$), { mode: 'no-cors' }).then((res) => res.json()).then(console.log);
  };

  const onResult = (data: any) => {
    setSnippet(data.snippet);
    setKeywords(data.keywords);
    setHasResult(true);
    setIsLoading(false);
  };

  const onReset = (data: any) => {
    setPrompt("");
    setHasResult(false);
    setIsLoading(false);
  };

  let displayedElement = null;

  if (hasResult) {
    displayedElement = (
      <Results snippet={snippet} keywords={keywords} onBack={onReset} prompt={prompt} />
    );
  } else {
    displayedElement = (
      <Form prompt={prompt} setPrompt={setPrompt} onSubmit={onSubmit} isLoading={isLoading} characterLimit={CHARACTER_LIMIT} />
    );
  }

  return (
    <>
      <h1>Quotopia!</h1>
      {displayedElement}
    </>
  );
};

export default Quotopia;
