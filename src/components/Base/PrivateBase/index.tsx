import React from 'react';

import { Box, Container } from '@mui/material';

import Sidebar from './Sidebar';
import { MainWrapper, PageWrapper } from './styles';

interface PrivateBaseProps {
  children: React.ReactNode;
}

const PrivateBase: React.FC<PrivateBaseProps> = ({ children }) => {
  return (
    <MainWrapper>
      <Sidebar />
      <PageWrapper>
        <Container
          maxWidth={false}
          sx={{
            paddingTop: '20px',
          }}
        >
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>{children}</Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default PrivateBase;
