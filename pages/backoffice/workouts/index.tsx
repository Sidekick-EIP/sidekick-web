import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import Layout from '../../../components/BackOffice/Layout'
import axios from "axios";
import { useSnackBar } from "@/components/SnackBar";
import { Session, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Workout from '@/components/BackOffice/Workouts/Workout';
import { GetServerSidePropsContext } from 'next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default function Workouts() {
    const { data }: { data: Session | null } = useSession();
    const [workouts, setWorkouts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [idWorkout, setIdWorkout] = useState(0);
    const [isToReload, setIsToReload] = useState<boolean>(true);
    const useAlert: any = useSnackBar();
    const router = useRouter();

    useEffect(() => {
        if (data) {
            if (!isToReload)
                return;
            (async () => {
                try {
                    setIsLoading(true)
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/workouts/all`, {
                        headers: {
                            Authorization: `Bearer ${data?.user.access_token}`
                        }
                    });
                    console.log(response.data);
                    setWorkouts(response.data);
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

    function handleCloseDialog(isToReload: boolean) {
        setOpenDialog(false);
        setIsToReload(isToReload)
        setIdWorkout(0)
    }

    return <Layout>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Burned Calories
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Last update Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Exercise id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {workouts.map((workout: any) => (
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {workout.exercise.name}
                            </td>
                            <td className="px-6 py-4">
                                {workout.burnedCalories}
                            </td>
                            <td className="px-6 py-4">
                                {new Date(workout.date).getFullYear() + '/' + (new Date(workout.date).getMonth() + 1) + '/' + new Date(workout.date).getDate() + ' ' + new Date(workout.date).getHours() + ':' + new Date(workout.date).getMinutes() + ':' + new Date(workout.date).getSeconds()}
                            </td>
                            <td className="px-6 py-4">
                                {new Date(workout.date).getFullYear() + '/' + (new Date(workout.date).getMonth() + 1) + '/' + new Date(workout.date).getDate() + ' ' + new Date(workout.date).getHours() + ':' + new Date(workout.date).getMinutes() + ':' + new Date(workout.date).getSeconds()}
                            </td>
                            <td className="px-6 py-4">
                                {workout.exerciseId}
                            </td>
                            <td className="px-6 py-4">
                                <a onClick={() => {
                                    setIdWorkout(workout.id)
                                    setOpenDialog(true);
                                }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Voir</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Workout open={openDialog} onClose={handleCloseDialog} idWorkout={idWorkout} />
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
