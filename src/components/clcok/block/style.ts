import styled from 'styled-components';

type props = {
  separator: 2 | 4;
};

export const Container = styled.div<props>`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(${({ separator }) => separator}, 10px);
  grid-template-rows: repeat(6, 10px);
  align-items: center;
  direction: rtl;
  @media only screen and (max-width: 1900px) {
    & {
      grid-template-columns: repeat(${({ separator }) => separator}, 8px);
      grid-template-rows: repeat(6, 8px);
    }
  }
  @media only screen and (max-width: 1600px) {
    & {
      grid-template-columns: repeat(${({ separator }) => separator}, 6px);
      grid-template-rows: repeat(6, 6px);
    }
  }
  @media only screen and (max-width: 1300px) {
    & {
      grid-template-columns: repeat(${({ separator }) => separator}, 6px);
      grid-template-rows: repeat(6, 6px);
    }
  }
`;

export const fuck = '';
