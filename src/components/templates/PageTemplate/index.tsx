import Button from '@mui/material/Button';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useTeams } from '../../../contexts/teams';
import FooterGroup from '../../atoms/PageFooter';
import PageHeader from '../../atoms/PageHeader';
import NavBar from '../../organisms/Navbar';
import Sponsors from '../../organisms/Sponsors';

export type PageTemplateProps = {
  title?: string;
  headerActions?: React.ReactNode;
  children?: React.ReactNode;
};

const PageTemplate: React.FC<PageTemplateProps> = ({
  title = '',
  headerActions = <></>,
  children,
}) => {
  const teams = useTeams();
  const router = useRouter();

  const year = new Date().getFullYear();

  const backToTop = () => {
    if (!document) return;

    document.body.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const pageTitle = `V.League ${title ? `- ${title.toUpperCase()}` : ''}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <NavBar active={router.pathname} teams={teams} />
      {title && (
        <PageHeader>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-semibold uppercase">{title}</h1>
            <div>{headerActions}</div>
          </div>
        </PageHeader>
      )}
      <main>{children}</main>
      <Sponsors />
      <FooterGroup>
        <div className="flex items-center justify-between">
          <div>
            <span className="block md:inline">&copy; {year} V.League.</span>
            <span className="block md:inline ml-1">All Rights Reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/VPFMedia"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500"
            >
              <span className="hidden md:inline">Facebook</span>
              <span className="inline md:hidden">FB</span>
            </a>
            <a
              href="https://www.youtube.com/user/Vpfmedia"
              target="_blank"
              rel="noreferrer"
              className="text-red-500"
            >
              <span className="inline md:hidden">YT</span>
              <span className="hidden md:inline">YouTube</span>
            </a>
            <Button variant="contained" type="button" onClick={backToTop}>
              <ArrowUpward />
            </Button>
          </div>
        </div>
      </FooterGroup>
    </>
  );
};

PageTemplate.displayName = 'PageTemplate';
PageTemplate.defaultProps = {
  title: '',
  headerActions: <></>,
  children: <></>,
};

export default PageTemplate;
