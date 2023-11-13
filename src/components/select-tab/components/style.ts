import styled from 'styled-components';

export const BackContainer = styled.div`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background-color: var(--accent);
`;

export const Windows = styled.div`
  width: 480px;
  height: 360px;
  border-radius: 10px;
  background: white;
  overflow: hidden;
  box-shadow:
    0 1px 1px hsl(0deg 0% 0% / 0.075),
    0 2px 2px hsl(0deg 0% 0% / 0.075),
    0 4px 4px hsl(0deg 0% 0% / 0.075),
    0 8px 8px hsl(0deg 0% 0% / 0.075),
    0 16px 16px hsl(0deg 0% 0% / 0.075);
  display: flex;
  flex-direction: column;
`;
