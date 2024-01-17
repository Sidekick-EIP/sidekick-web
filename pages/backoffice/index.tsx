import { Button } from '@mui/material';
import React from "react";
import axios from "axios";
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import { authOptions } from '../api/auth/[...nextauth]';
import Layout from '@/components/BackOffice/Layout';

export default function Backoffice() {
    const launchAlgorithm = async () => {
        return axios.get("http://13.37.217.239", {
            auth: {
                username: "sidekick-eip",
                password: "@Bonjour1"
            }
        })
    }

    return (
        <Layout>
            <div className='p-4'>
                <Button variant="contained" className='bg-orangePrimary' onClick={launchAlgorithm}>Launch algorithm</Button>
            </div>
        </Layout>
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