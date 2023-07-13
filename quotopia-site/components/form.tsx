interface FormProps {
  prompt: string;
  setPrompt: any;
  onSubmit: any;
  isLoading: boolean;
  characterLimit: number;
}

const Form: React.FC<FormProps> = (props) => {
  const isPromptValid = props.prompt.length < props.characterLimit;
  const updatePromptValue = (text: string) => {
    if (text.length <= props.characterLimit) {
      props.setPrompt(text);
    }
  };


  let statusColor = "text-slate-400"
  let statusText = null;
  if (!isPromptValid) {
    statusColor = "text-red-500"
    statusText = "Too long!"
  }

  return (
    <>
    <div className="mb-1 text-slate-400">      <p>
        Tell me what your brand is about and i will generate copy and keywords
        for you!
      </p></div>

      <div className=" text-slate-700 rounded-md mb-1 relative left-24  ">
            <select id="language" className="relative left-44 bg-slate-300">
              <option value="en">English</option>
              <option value="no">Norwegian</option>
              <option value="ru">Russian</option>
              <option value="pa">Pashto</option>
            </select>
          </div>
      <input
        className="p-2 w-full rounded-md  focus:outline-teal-500 focus:outline text-slate-700 "
        type="text"
        placeholder="Tea"
        value={props.prompt}
        onChange={(e) => updatePromptValue(e.currentTarget.value)}
      ></input>
      <div className= {statusColor + " flex justify-between my-1 mb-6 text-sm"}>{statusText}
        <div>
        {props.prompt.length}/{props.characterLimit}
      </div></div>
      <button 
      className="bg-gradient-to-r from-green-400 to-blue-500 disabled:opacity-50 w-full p-3 rounded-md text-lg"
      onClick={props.onSubmit} 
      disabled={props.isLoading ||!isPromptValid}>
        Submit
      </button>
    </>
  );
};

export default Form;
