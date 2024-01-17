import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import Layout from '../../../components/BackOffice/Layout'
import axios from "axios";
import { useSnackBar } from "@/components/SnackBar";
import { Session, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import User from '@/components/BackOffice/Users/Users';
import { GetServerSidePropsContext } from 'next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Button, Checkbox, FormControlLabel, Input, TextField } from '@mui/material';
import { CheckBox, Label } from '@mui/icons-material';

export default function Users() {
    const { data }: { data: Session | null } = useSession();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [isToReload, setIsToReload] = useState<boolean>(true);
    const useAlert: any = useSnackBar();
    const [page, setPage] = useState(1);
    const [email, setEmail] = useState("");
    const [hasSidekick, setHasSidekick] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        if (data) {
            if (!isToReload)
                return;
            (async () => {
                try {
                    setIsLoading(true)
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user_admin?cursor=${page}`, {
                        headers: {
                            Authorization: `Bearer ${data?.user.access_token}`
                        }
                    });
                    console.log(response.data);
                    setUsers(response.data);
                    setIsLoading(false)
                    setIsToReload(false)
                } catch (err: any) {
                    setIsLoading(false)
                    setIsToReload(false)
                    if (err.response) {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        useAlert(err.response.data.message, "error");
                    } else {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        useAlert(err.message, "error");
                    }
                }
            }
            )()
        };
    }, [data, isToReload]);

    const fetchUsers = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user_admin?cursor=${page}&sidekick=${hasSidekick}&email=${email}`, {
            headers: {
                Authorization: `Bearer ${data?.user.access_token}`
            }
        });
        setUsers(response.data);
    }

    function handleCloseDialog(isToReload: boolean) {
        setOpenDialog(false);
        setIsToReload(isToReload)
    }

    return <Layout>
        <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg m-6">
            <div className='flex items-center justify-center w-full p-4 gap-4'>
                <TextField placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <FormControlLabel control={<Checkbox checked={hasSidekick} onChange={(e: any) => setHasSidekick(e.target.checked)}  />} label="With sidekick" />
                <Button variant="contained" className='bg-orangePrimary' onClick={fetchUsers}>Search</Button>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                    <tr>
                        <th scope="col" className="px-6 py-3 ">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Sidekick
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Gender
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Location
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Goal
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Level
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Size
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {user?.user?.email}
                            </td>
                            <td className="px-6 py-4">
                                {user?.user?.id}
                            </td>
                            <td className="px-6 py-4">
                                {user?.firstname} {user.lastname}
                            </td>
                            <td className="px-6 py-4">
                                {user?.sidekick_id}
                            </td>
                            <td className="px-6 py-4">
                                {user.gender}
                            </td>
                            <td className="px-6 py-4">
                                {user.location}
                            </td>
                            <td className="px-6 py-4">
                                {user.goal}
                            </td>
                            <td className="px-6 py-4">
                                {user.level}
                            </td>
                            <td className="px-6 py-4">
                                {user.size}
                            </td>
                            <td className="px-6 py-4">
                                <a onClick={() => {
                                    setUser(user)
                                    setOpenDialog(true);
                                }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Update</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <User open={openDialog} onClose={handleCloseDialog} user={user} />
        </div>
    </Layout>
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