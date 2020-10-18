import React from "react";
import Flashcard from "./FlashCard";

function FlashCardList({ flashcards }) {
  return (
    <div className="card-grid">
      {flashcards.map((flashcard) => {
        return <Flashcard flashcard={flashcard} key={flashcard.id}></Flashcard>;
      })}
    </div>
  );
}

export default FlashCardList;
