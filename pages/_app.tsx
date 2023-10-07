import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {CacheProvider, EmotionCache} from '@emotion/react';
import defaultTheme from '@/components/theme';
import createEmotionCache from '@/components/createEmotionCache';
import Head from 'next/head';
import Layout from '@/components/Layout';
import {CssBaseline} from '@mui/material';
import {SessionProvider} from 'next-auth/react';
import Providers from '@/components/Providers';
import {ThemeProvider} from "@mui/system";
import SnackBar from "@/components/SnackBar";

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
    return (
        <SessionProvider session={pageProps.session}>
            <CacheProvider value={emotionCache}>
                <Providers>
                    <Head>
                        <meta name="viewport" content="initial-scale=1, width=device-width"/>
                    </Head>
                    <ThemeProvider theme={defaultTheme}>
                        <SnackBar>
                            <CssBaseline/>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </SnackBar>
                    </ThemeProvider>
                </Providers>
            </CacheProvider>
        </SessionProvider>
    );
}
