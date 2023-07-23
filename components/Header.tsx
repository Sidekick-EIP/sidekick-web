import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button } from "@mui/material";
import Link from "next/link";
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

const pages = [{
  label: 'Login',
  href: '/signin'
}, {
  label: 'Signup',
  href: '/signup'
}];

const pagesAuth = [{
  label: 'Profile',
  href: '/profile',
}, {
  label: 'Logout',
  href: '#',
  onClick: async () => signOut()
}, {
  label: 'Chat',
  href: '/chat',
}];

function Header() {
  const { data: session } = useSession();
  console.log("header", session);
  const mobile = useMediaQuery('(max-width:639px)');

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="relative" color="transparent" elevation={0} className='p-4'>
      <Container maxWidth="lg">
        <Toolbar disableGutters className='flex justify-between'>
          <Box>
            <Link href="/">
              <Image src="/logo_transparent.png" alt="Sidekick" width={32} height={32} />
            </Link>
          </Box>

          {mobile ? (
            <Box sx={{ flexGrow: 0 }}>
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
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {session ?
                  <>
                    {pagesAuth.map((page) => (
                      <Link href={page.href} key={page.href} onClick={page.onClick ?? undefined}>
                        <MenuItem onClick={handleCloseNavMenu}>
                          <Typography textAlign="center">{page.label}</Typography>
                        </MenuItem>
                      </Link>
                    ))}
                  </>
                  :
                  <>
                    {pages.map((page) => (
                      <Link href={page.href} key={page.href}>
                        <MenuItem onClick={handleCloseNavMenu}>
                          <Typography textAlign="center">{page.label}</Typography>
                        </MenuItem>
                      </Link>
                    ))}
                  </>
                }
              </Menu>
            </Box >
          ) : (
            session ? (
              <Box className="space-x-8" sx={{ flexGrow: 0 }} >
                {pagesAuth.map((page) => (
                  <Link href={page.href} key={page.label} onClick={page.onClick ?? undefined}>
                    <Button variant="outlined">
                      {page.label}
                    </Button>
                  </Link>
                ))}
              </Box>
            ) : (
              <Box className="space-x-8" sx={{ flexGrow: 0 }} >
                <Link href="/signin">
                  <Button variant="text" color="primary">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="contained" color="primary" sx={{ backgroundColor: "blue" }}>
                    Sign up
                  </Button>
                </Link>
              </Box>
            )
          )}
        </Toolbar >
      </Container >
    </AppBar >
  );
}

export default Header;