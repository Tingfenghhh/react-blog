import styled from 'styled-components';

export const Container = styled.div<{ borderColor: string }>`
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 45px;
  border: 1px solid var(--color-text-4);
`;
export const Line = styled.div<{ color: string; rotate: number }>`
  position: absolute;
  z-index: 5;
  width: 2px;
  height: 6px;
  background: var(--color-text-1);
  right: 50%;
  top: -2%;
  transform-origin: bottom;
  transform: rotate(${({ rotate }) => rotate}deg);
  margin-left: -2px;
  transition: all 1s;
  @media only screen and (max-width: 1900px) {
    & {
      height: 4px;
    }
  }
  @media only screen and (max-width: 1300px) {
    & {
      width: 1px;
      height: 4px;
    }
  }
`;
