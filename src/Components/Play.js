import styled from 'styled-components';
import { Remove } from './Players/New';

const Play = styled(Remove)`
  margin-top: 20px;
  background-color: rgba(0, 255, 81, 0.8);

  &:disabled {
    background-color: rgba(0, 0, 0, 0.8);
    cursor: not-allowed;
  }
`;

export default Play;
