import React, {useState, useEffect} from 'react'
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
import {Button} from "@mui/material";
import Link from "next/link";
import Image from 'next/image';
// @ts-ignore
import {signOut, useSession} from 'next-auth/react';

const pages = [{
    label: 'Reset password',
    href: '/reset_password'
}, {
    label: 'Login',
    href: '/signin'
}, {
    label: 'Signup',
    href: '/signup'
}, {
    label: 'Beta',
    href: '/beta',
}];

const pagesAuth = [{
    label: 'Profile',
    href: '/profile',
}, {
    label: 'Planning',
    href: '/planning',
}, {
    label: 'Tips',
    href: '/tips',
}, {
    label: 'Chat',
    href: '/chat',
}, {
    label: 'Logout',
    href: '#',
    onClick: async () => signOut()
}];

function Header() {
    const {data: session} = useSession();
    //console.log("header", session);
    const mobile = useMediaQuery('(max-width:639px)');

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setScrolling(scrollTop > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <AppBar position="fixed" elevation={0} color={'primary'}
                className={`p-4 ${scrolling ? 'shadow' : ''}`}>
            <Container maxWidth="lg">
                <Toolbar disableGutters className='flex justify-between'>
                    <Box>
                        <Link href="/">
                            <Image src="/logo_transparent.png" alt="Sidekick" width={32} height={32}/>
                        </Link>
                    </Box>

                    {mobile ? (
                        <Box sx={{flexGrow: 0}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
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
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                {session ?
                                    <>
                                        {pagesAuth.map((page) => (
                                            <Link href={page.href} key={page.href} onClick={page.onClick ?? undefined}>
                                                <MenuItem onClick={handleCloseNavMenu} sx={{textColor: 'white'}}>
                                                    <Typography textAlign="center">{page.label}</Typography>
                                                </MenuItem>
                                            </Link>
                                        ))}
                                    </>
                                    :
                                    <>
                                        {pages.map((page) => (
                                            <Link href={page.href} key={page.href}>
                                                <MenuItem onClick={handleCloseNavMenu} sx={{textColor: 'white'}}>
                                                    <Typography textAlign="center">{page.label}</Typography>
                                                </MenuItem>
                                            </Link>
                                        ))}
                                    </>
                                }
                            </Menu>
                        </Box>
                    ) : (
                        session ? (
                            <Box className="space-x-8" sx={{flexGrow: 0}}>
                                {pagesAuth.map((page) => (
                                    <Link href={page.href} key={page.label} onClick={page.onClick ?? undefined}>
                                        <Button variant="text" color="primary" className="hover:underline">
                                            {page.label}
                                        </Button>
                                    </Link>
                                ))}
                            </Box>
                        ) : (
                            <Box className="space-x-8" sx={{flexGrow: 0}}>
                                <Link href="/reset_password">
                                    <Button variant="text">
                                        <p style={{color: 'white'}}>Reset password</p>
                                    </Button>
                                </Link>
                                <Link href="/beta">
                                    <Button variant="text" color="primary">
                                        <p style={{color: 'white'}}>Beta</p>
                                    </Button>
                                </Link>
                                <Link href="/signin">
                                    <Button variant="text" color="primary">
                                        <p style={{color: 'white'}}>Log in</p>
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <button className="bg-white hover:underline text-black font-bold rounded-full py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                                        <p style={{color: 'black'}}>Sign up</p>
                                    </button>
                                </Link>
                            </Box>
                        )
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;