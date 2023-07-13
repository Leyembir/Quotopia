interface ResultsProps {
  snippet: string;
  keywords: string[];
  onBack: any;
  prompt: string;
}

const Results: React.FC<ResultsProps> = (props) => {
  const keywordElements = [];
  for (let i = 0; i < props.keywords.length; i++) {
    const element = <div key={i}>#{props.keywords[i]} </div>;
    keywordElements.push(element);
  }

  const resultSection = (label: string, body: any) => {
    return (
    <div className="bg-slate-700 p-4 my-2 rounded-md">
        <div className="text-slate-400 text-sm font-bold mb-3">
          {label}
        </div>
        <div>{body}</div>
      </div>
      );
  };

  return (
    <>
    <div>
    {resultSection("Prompt", <div className=" text-l font-bold">{props.prompt}</div>)}
    {resultSection("Branding snippet", props.snippet)}
    {resultSection("Keywords", keywordElements)}
      <button
        className="bg-gradient-to-r from-green-400 to-blue-500 disabled:opacity-50 w-full p-3 rounded-md text-lg"
        onClick={props.onBack}
      >
        Back
      </button>{" "}
      </div>
    </>
  );
};

export default Results;
