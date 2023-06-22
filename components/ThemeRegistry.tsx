'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { NextAppDirEmotionCacheProvider } from './EmotionCache';
import theme from './Theme';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}