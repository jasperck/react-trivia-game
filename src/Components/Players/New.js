import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const Input = styled.input.attrs({
  placeholder: 'Enter phone number like +16023964619'
})`
  width: 300px;
  height: 30px;
  padding: 10px 50px 10px 10px;
  font-size: 24px;
  font-weight: 500;
  border-radius: 4px;
  border: none;
  outline: none;
  box-shadow: 0 25px 40px -20px rgba(63, 78, 91, 5%);

  &::placeholder {
    font-size: 16px;
    font-style: italic;
  }
`;

const Action = styled.div`
  display: flex;
  margin-top: 5px;
`;

const Add = styled.button.attrs({ type: 'submit' })`
  width: 175px;
  height: 40px;
  border-radius: 4px;
  background-color: rgba(14, 114, 222, 0.8);
  border: none;
  outline: none;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
  margin: 0 5px 0 0;
`;

export const Remove = styled(Add).attrs({ type: 'button' })`
  background-color: rgba(255, 31, 31, 0.8);
  margin: 0 0 0 5px;
`;

const New = ({ val, handleOnChange, handleOnSubmit, handleOnClear }) => (
  <Form onSubmit={handleOnSubmit}>
    <Input value={val} onChange={e => handleOnChange(e.target.value)} />
    <Action>
      <Add>Add</Add>
      <Remove onClick={handleOnClear}>Remove</Remove>
    </Action>
  </Form>
);

export default New;
