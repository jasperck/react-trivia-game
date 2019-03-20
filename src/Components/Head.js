import React, { Fragment } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 30px;
`;

export const TitleWrapper = styled.span`
  font-size: 3em;
`;

const SubTitleWrapper = styled.span`
  align-self: flex-end;
  padding-bottom: 8px;
  margin-left: 10px;
  font-size: 1em;
  font-style: italic;
`;

export const Title = () => (
  <Fragment>
    <TitleWrapper>RANDOM TRIVIA GAME</TitleWrapper>
    <SubTitleWrapper>30 Seconds, answer in time!</SubTitleWrapper>
  </Fragment>
);

const Head = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
);

export default Head;
