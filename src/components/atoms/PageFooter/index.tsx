import Container from '@mui/material/Container';
import React from 'react';

export type PageFooterProps = {
  children?: React.ReactNode;
};

const PageFooter: React.FC<PageFooterProps> = ({ children = '' }) => {
  return (
    <footer className="border-t">
      <Container className="py-8">{children}</Container>
    </footer>
  );
};

PageFooter.displayName = 'PageFooter';
PageFooter.defaultProps = { children: '' };

export default PageFooter;
