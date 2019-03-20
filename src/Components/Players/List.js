import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  height: 180px;
  overflow-y: auto;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  background-color: #ffffff;
  font-size: 20px;
  font-weight: 500;
`;

const List = ({ list }) => (
  <Wrapper>
    {list.map(l => <Item key={l}>{l}</Item>)}
  </Wrapper>
);

export default List;
