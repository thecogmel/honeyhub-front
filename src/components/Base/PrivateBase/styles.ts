import styled from 'styled-components';

export const MainWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  overflow: hidden;
  width: 100%;
`;

export const PageWrapper = styled.div`
  background-color: ${(props) => props.theme.palette.background.default};
  display: flex;
  flex: 1 1 auto;
  overflow: hidden;
`;
