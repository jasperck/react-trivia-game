import React, { useState, useCallback } from "react";
import Players from "./Components/Players";
import Play from "./Components/Play";
import Quiz from "./Components/Quiz";
import Game from "./Components/Game";
import Container from "./Components/Container";
import { getRandomQuiz } from './utils';

const App = () => {
  const [gameStarted, updateGameStatus] = useState(false);
  const [players, updatePlayers] = useState([]);
  const [quiz, updateQuiz] = useState(getRandomQuiz());

  const startTrivia = useCallback(() => {
    updateGameStatus(true);

    fetch("/api/send-sms", {
      method: "POST",
      body: JSON.stringify({ numbers: players, quiz, limitedTime: 30 }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => console.log(res, 4))
      .catch(err => {
        console.error(err);
        updateGameStatus(false);
      });
  }, [players, quiz]);

  return (
    <Container>
      <Game>
        <Players players={players} updatePlayers={updatePlayers} />
        <Quiz quiz={quiz} refreshQuiz={() => updateQuiz(getRandomQuiz())} />
      </Game>
      <Play onClick={startTrivia} disabled={!players.length || gameStarted}>Play!</Play>
    </Container>
  );
};

export default App;
