"use client";
import { data } from "autoprefixer";
import React , { ChangeEventHandler, useState } from "react";
import Form from "./form";
import Results from "./results";
import Image from "next/image";
import logo from "../public/alogo.svg";

const Quotopia: React.FC = () => {
  const CHARACTER_LIMIT = 32;
  const ENDPOINT: string =
    "https://nkhgiknpt4.execute-api.ap-southeast-2.amazonaws.com/prod/generate_keywords_and_snippets";
  const [prompt, setPrompt] = React.useState("");
  const [snippet, setSnippet] = React.useState("");
  const [keywords, setKeywords] = React.useState([]);
  const [hasResult, setHasResult] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("");

  const onSubmit = () => {
    console.log("submitting " + prompt);
    if (selectedOption == "") {
      setIsLoading(true);
      fetch(`${ENDPOINT}?prompt=${prompt}`)
        .then((res) => res.json())
        .then(onResult);
    }else{
      setIsLoading(true);
      fetch(`${ENDPOINT}_lang?prompt=${prompt}&language=${selectedOption}` )
        .then((res) => res.json())
        .then(onResult);
    }

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
      <Results
        snippet={snippet}
        keywords={keywords}
        onBack={onReset}
        prompt={prompt}
      />
    );
  } else {
    displayedElement = (
      <Form
        prompt={prompt}
        setPrompt={setPrompt}
        onSubmit={onSubmit}
        isLoading={isLoading}
        characterLimit={CHARACTER_LIMIT}
      />
    );
  }


  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
  const gradientTextStyle =
    "text-white text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500";

  return (
    <div className="h-screen flex">
      <div className="max-w-md m-auto p-2">
        <div className="bg-slate-800 p-6 rounded-md text-white">
      <div className=" text-slate-700 rounded-md mb-1 relative left-24  ">
            <select id="language" className="relative left-44 bg-slate-300"  onChange={handleOptionChange} >
              <option value="english">English</option>
              <option value="norwegian">Norwegian</option>
              <option value="russian">Russian</option>
              <option value="pashto">Pashto</option>
            </select>
          </div>
          <div className="text-center my-6">
            <Image src ={logo} width={50} alt= "logo" height={50} className="m-auto" />
            <h1 className={gradientTextStyle + " text-3xl font-bold"}>
              Quotopia!
            </h1>
            <div className={gradientTextStyle + "text-sm mx-auto"}>
              Your AI branding assistant
            </div>
          </div>

          {displayedElement}
        </div>
      </div>
    </div>
  );
};

export default Quotopia;
