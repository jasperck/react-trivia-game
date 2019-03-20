import React from 'react';
import styled from 'styled-components';
import { Remove } from './Players/New';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 500px;
`;

const Question = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  height: 100px;
  padding: 5px;
  border-radius: 4px;
  background-color: rgba(70, 204, 255, 0.8);
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
`;

const Options = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 10px;
  border-radius: 4px;
  color: #ffffff;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: calc(50% - 10px);
  height: 60px;
  margin: 5px;
  background-color: rgba(123, 123, 123, 0.8);
  font-size: 12px;
  font-weight: 500;
`;

const Random = styled(Remove)`
  align-self: center;
  margin-top: 20px;
  background-color: rgba(255, 0, 70, 0.8);
`;

const Quiz = ({ quiz, refreshQuiz }) => (
  <Wrapper>
    <Question>{quiz.question}</Question>
    <Options>
      {quiz.options.map(option => <Option key={option}>{option}</Option>)}
    </Options>
    <Random onClick={refreshQuiz}>Get Quiz</Random>
  </Wrapper>
);

export default Quiz;
