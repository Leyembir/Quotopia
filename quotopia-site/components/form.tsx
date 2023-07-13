interface FormProps {
  prompt: string;
  setPrompt: any;
  onSubmit: any;
  isLoading: boolean;
  characterLimit: number;
}

const Form: React.FC<FormProps> = (props) => {
  const isPromptValid = props.prompt.length <= props.characterLimit;
  const updatePromptValue = (text: string) => {
    if (text.length <= props.characterLimit) {
      props.setPrompt(text);
    }
  };

  return (
    <>
      {" "}
      <h1></h1>
      <p>
        Tell me what your brand is about and i will generate copy and keywords
        for you!
      </p>
      <div>
        <select id="language">
          <option value="en">English</option>
          <option value="no">Norwegian</option>
          <option value="ru">Russian</option>
          <option value="pa">Pashto</option>
        </select>{" "}
      </div>
      <input
        type="text"
        placeholder="Tea"
        value={props.prompt}
        onChange={(e) => updatePromptValue(e.currentTarget.value)}
      ></input>
      <div>
        {props.prompt.length}/{props.characterLimit}
      </div>
      <button onClick={props.onSubmit} disabled={props.isLoading ||!isPromptValid}>
        Submit
      </button>
    </>
  );
};

export default Form;
