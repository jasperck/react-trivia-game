import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

const Slider = styled.input.attrs({
  type: 'range',
  min: 0.5 * 60,
  max: 5 * 60,
  value: 1 * 60,
  step: 1,
})`
  &&::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 3em;
    height: 3em;
    background: #ffffff;
    border-radius: 100%;
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.5);
  }
`;

const Settings = () => (
  <Wrapper>
    <Slider />
  </Wrapper>
);

export default Settings;
