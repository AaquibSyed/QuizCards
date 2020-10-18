import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import FlashCardList from "./FlashCardList";
import axios from "axios";

function App() {
  const [flashcards, setflashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
    });
  }, []);

  //function to decode HTML encoded characters to strings
  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value,
        },
      })
      .then((res) =>
        setflashcards(
          res.data.results.map((questionItem, index) => {
            const answer = decodeString(questionItem.correct_answer);
            const options = [
              ...questionItem.incorrect_answers.map((a) => decodeString(a)),
              answer,
            ];
            return {
              id: index,
              question: decodeString(questionItem.question),
              answer,
              options: options.sort(() => Math.random() - 0.5),
            };
          })
        )
      );
  }
  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of questions</label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue="10"
            ref={amountEl}
          ></input>
        </div>
        <button className="btn">Generate</button>
      </form>
      <div className="container">
        <FlashCardList flashcards={flashcards}></FlashCardList>
      </div>
    </>
  );
}

export default App;
