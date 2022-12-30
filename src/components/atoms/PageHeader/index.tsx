import Container from '@mui/material/Container';
import React from 'react';

type PageHeaderProps = {
  children?: React.ReactNode;
};

export const PageHeader: React.FC<PageHeaderProps> = ({ children = '' }) => {
  return (
    <header className="border-b">
      <Container className="py-12">{children}</Container>
    </header>
  );
};

PageHeader.displayName = 'PageHeader';
PageHeader.defaultProps = { children: '' };

export default PageHeader;
