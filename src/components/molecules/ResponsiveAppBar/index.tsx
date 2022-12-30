import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

const pages = [
  { href: '/matches', key: 'matches' },
  { href: '/results', key: 'results' },
  { href: '/tables', key: 'tables' },
  { href: '/teams', key: 'teams' },
];

export type ResponsiveAppBarProps = { active: string; title: string };

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({
  active,
  title,
}) => {
  const t = useTranslations();

  const [anchorPages, setAnchorPages] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorPages(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorPages(null);
  };

  const classActive = (href: string) => (active === href ? 'x' : '');

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Link href="/" passHref>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                cursor: 'pointer',
                display: { xs: 'none', md: 'flex' },
              }}
            >
              {title}
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorPages}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorPages)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(({ href, key }) => (
                <MenuItem key={key} onClick={handleCloseNavMenu}>
                  <Link href={href} passHref>
                    <Typography textAlign="center">
                      <span className={`capitalize ${classActive(href)}`}>
                        {t(key)}
                      </span>
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Link href="/" passHref>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                cursor: 'pointer',
                display: { xs: 'flex', md: 'none' },
              }}
            >
              {title}
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ href, key }) => (
              <Link key={key} href={href} passHref>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <span className={classActive(href)}>{t(key)}</span>
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
