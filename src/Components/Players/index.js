import React, { useState } from "react";
import styled from "styled-components";
import NewPlayer from "./New";
import List from "./List";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 500px;
`;

const Players = ({ players, updatePlayers }) => {
  const [number, updateNumber] = useState('');

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!number) return;

    updatePlayers(players.concat(number));
    updateNumber('');
  };

  const handleOnClear = () => updatePlayers([]);

  return (
    <Wrapper>
      <NewPlayer
        val={number}
        handleOnChange={updateNumber}
        handleOnSubmit={handleOnSubmit}
        handleOnClear={handleOnClear}
      />
      <List list={players} />
    </Wrapper>
  );
};

export default Players;
