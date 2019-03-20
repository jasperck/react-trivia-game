import React, { useState, useCallback } from "react";
import Players from "./Components/Players";
import Play from "./Components/Play";
import Quiz from "./Components/Quiz";
import Game from "./Components/Game";
import Container from "./Components/Container";
import Countdown from './Components/Countdown';
import Head, { Title } from './Components/Head';
import { getRandomQuiz } from './utils';

const INIT_TIME = 30; // second

const App = () => {
  const [gameStarted, updateGameStatus] = useState(false);
  const [players, updatePlayers] = useState([]);
  const [quiz, updateQuiz] = useState(getRandomQuiz());

  const startTrivia = useCallback(() => {
    fetch('/api/send-sms', {
      method: "POST",
      body: JSON.stringify({ numbers: players, quiz, limitedTime: INIT_TIME }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => updateGameStatus(true))
      .catch(err => updateGameStatus(false));
  }, [players, quiz]);

  const handleTimesUp = () => {
    // update game status
    updateGameStatus(false);

    // call api for result and clear store
    fetch('/api/result', {
      headers: {
        "content-type": "application/json"
      },
    }).then(res => res.json()).then(res => {
      // show game result
      if (!res.length) alert('No winners...');
      else alert(`Winners: ${res.join(', ')}`);
    });
  }

  return (
    <Container>
      <Head>
        {gameStarted ? <Countdown time={INIT_TIME} timesUp={handleTimesUp} /> : <Title />}
      </Head>
      <Game>
        <Players players={players} updatePlayers={updatePlayers} />
        <Quiz quiz={quiz} refreshQuiz={() => updateQuiz(getRandomQuiz())} />
      </Game>
      <Play onClick={startTrivia} disabled={!players.length || gameStarted}>Play!</Play>
    </Container>
  );
};

export default App;
