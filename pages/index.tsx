"use client";
import React from 'react';
import Head from "next/head"
import { useSession } from "next-auth/react";
import { Container, Typography, Grid, Card, CardContent, ButtonGroup, Button, Stack } from '@mui/material';
import Image from 'next/image'
import Link from 'next/link';

import Main from "../components/Main";

export default function Home() {

  const personData = [
    { name: 'Gregoire D', info: 'Personnaly I just like lifting a lot!  Im the big guy of the team :D' },
    { name: 'Ilian B', info: 'dont know if im the CEO by choice or by default, but im trying to direct the boat in the right direction the best I can for sure !' },
    { name: 'Alizee S', info: 'Im the artist of the group !' },
  ];

  const session = useSession();
  return (
    <div >
      <Head>
        <title>Sidekick</title>
      </Head>

      <div>
      {session.data && <p className="p-16">You are logged in as {session.data?.user.email}</p>}
      </div>

      <Main />

    </div>
  );
}
