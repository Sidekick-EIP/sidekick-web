import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { redirect } from 'next/navigation'
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Key } from "react-feather";
import { useSession } from 'next-auth/react';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import { authOptions } from '../api/auth/[...nextauth]';

export default function Backoffice() {
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    return (
        <div className="mt-32">
            backoffice
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session?.user?.admin) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}