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
import {Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Popover} from "@mui/material";
import Link from "next/link";
import Image from 'next/image';
// @ts-ignore
import {signOut, useSession} from 'next-auth/react';
import {Logout, People, SupportAgent} from "@mui/icons-material";
import {useRouter} from "next/router";

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
    label: 'BackOffice',
    href: '/backoffice/support',
}, {
    label: 'Planning',
    href: '/planning',
}, {
    label: 'Tips',
    href: '/tips',
}, {
    label: 'Chat',
    href: '/chat',
}];

function Header() {
    const {data: session} = useSession();
    //console.log("header", session);
    const mobile = useMediaQuery('(max-width:639px)');

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const router = useRouter();

    function handleOpenUserMenu(event: React.MouseEvent<HTMLElement>) {
        setAnchorElUser(event.currentTarget);
    }

    function handleCloseUserMenu() {
        setAnchorElUser(null);
    }

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
                                        {pagesAuth.map((page) => {
                                            if (page.label === 'BackOffice') {
                                                if (session.user.admin)
                                                    return <Link href={page.href} key={page.href}>
                                                        <MenuItem onClick={handleCloseNavMenu}
                                                                  sx={{textColor: 'white'}}>
                                                            <Typography textAlign="center">{page.label}</Typography>
                                                        </MenuItem>
                                                    </Link>
                                                else
                                                    return null
                                            }
                                            return <Link href={page.href} key={page.href}>
                                                <MenuItem onClick={handleCloseNavMenu} sx={{textColor: 'white'}}>
                                                    <Typography textAlign="center">{page.label}</Typography>
                                                </MenuItem>
                                            </Link>
                                        })}
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
                            <Box className={"space-x-8"} sx={{flexGrow: 0, display: 'flex', alignItems: 'center'}}>
                                {pagesAuth.map((page) => {
                                    if (page.label === 'BackOffice') {
                                        if (session.user.admin)
                                            return <Link href={page.href} key={page.href}>
                                                <Button variant="text" color="primary" className="hover:underline">
                                                    <p style={{color: 'white'}}>{page.label}</p>
                                                </Button>
                                            </Link>
                                        else
                                            return null
                                    }
                                    return <Link href={page.href} key={page.label}>
                                        <Button variant="text" color="primary" className="hover:underline">
                                            <p style={{color: 'white'}}>{page.label}</p>
                                        </Button>
                                    </Link>

                                })}
                                <Box>
                                    <ListItem sx={{p: 0.5, borderRadius: 10, px: 2}} button
                                              onClick={handleOpenUserMenu}>
                                        <ListItemAvatar>
                                            <Avatar/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={session.user.email}
                                            secondary={session.user.admin ? "Administracteur" : "Utilisateurs"}/>
                                    </ListItem>
                                </Box>
                                <Popover open={Boolean(anchorElUser)} anchorEl={anchorElUser}
                                         onClose={handleCloseUserMenu}
                                         anchorOrigin={{
                                             vertical: 'bottom',
                                             horizontal: 'center',
                                         }}
                                         transformOrigin={{
                                             vertical: 'top',
                                             horizontal: 'center',
                                         }}>
                                    <List>
                                        <ListItem button onClick={() => router.push('/profile')}>
                                            <ListItemIcon>
                                                <People/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={"Mon profile"}/>
                                        </ListItem>
                                        <ListItem button onClick={() => router.push('/support')}>
                                            <ListItemIcon>
                                                <SupportAgent/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={"Support"}/>
                                        </ListItem>
                                        <Divider/>
                                        <ListItem button onClick={async () => {
                                            await signOut();
                                            await router.push('/')
                                        }}>
                                            <ListItemIcon>
                                                <Logout/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={"Logout"}/>
                                        </ListItem>
                                    </List>
                                </Popover>
                            </Box>
                        ) : (
                            <Box className="space-x-8" sx={{flexGrow: 0}}>
                                <Link href="/reset_password">
                                    <Button variant="text">
                                        <p style={{color: 'white'}}>Reset password</p>
                                    </Button>
                                </Link>
                                {/* <Link href="/beta">
                                    <Button variant="text" color="primary">
                                        <p style={{color: 'white'}}>Beta</p>
                                    </Button>
                                </Link> */}
                                <Link href="/signin">
                                    <Button variant="text" color="primary">
                                        <p style={{color: 'white'}}>Log in</p>
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <button
                                        className="bg-white hover:underline text-black font-bold rounded-full py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
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