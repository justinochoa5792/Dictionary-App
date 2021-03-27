import { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [words, setWords] = useState([]);
  const [search, setSearch] = useState([]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Axios.get(
      `https://dictionaryapi.com/api/v3/references/collegiate/json/${search}?key=${process.env.REACT_APP_KEY}`
    );
    console.log(response.data);
    setWords(response.data);
  };

  const renderDef = () => {
    return words.map((def) => {
      return (
        <ul>
          <li>
            <b>Word: </b>
            {def.hwi.hw}
          </li>
          <li>{def.fl}</li>
          <li>
            <b>Definition: </b>
            {def.shortdef[0]}
          </li>
          <br />
          <li>{def.shortdef[1]}</li>
          <br />
          <li>{def.shortdef[2]}</li>
          <br />
        </ul>
      );
    });
  };

  return (
    <div className="App">
      <h1>Search For a Word</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a word"
          onChange={handleChange}
        />
      </form>
      {renderDef()}
    </div>
  );
}

export default App;
