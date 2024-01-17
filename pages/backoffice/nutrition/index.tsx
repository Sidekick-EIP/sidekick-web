import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import Layout from '../../../components/BackOffice/Layout'
import axios from "axios";
import { useSnackBar } from "@/components/SnackBar";
import { Session, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Nutrition from '@/components/BackOffice/Nutrition/Nutrition';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { GetServerSidePropsContext } from 'next';

export default function Nutritions() {
    const { data }: { data: Session | null } = useSession();
    const [nutrition, setNutritions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [idNutrition, setIdNutrition] = useState(0);
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
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/nutrition/all/admin`, {
                        headers: {
                            Authorization: `Bearer ${data?.user.access_token}`
                        }
                    });
                    console.log(response.data);
                    setNutritions(response.data);
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
        setIdNutrition(0)
    }

    return <Layout>
        <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg m-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                    <tr>
                        <th scope="col" className="px-6 py-3 ">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Protein
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fat
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Carbs
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Weight
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Calories
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Period
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            User Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Id
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {nutrition.map((nutrition: any) => (
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {nutrition.name}
                            </td>
                            <td className="px-6 py-4">
                                {nutrition.protein}
                            </td>
                            <td className="px-6 py-4">
                                {nutrition.fat}
                            </td>
                            <td className="px-6 py-4">
                                {nutrition.carbs}
                            </td>
                            <td className="px-6 py-4">
                                {nutrition.weight}
                            </td>
                            <td className="px-6 py-4">
                                {nutrition.calories}
                            </td>
                            <td className="px-6 py-4">
                                {nutrition.period}
                            </td>
                            <td className="px-6 py-4">
                                {new Date(nutrition.date).getFullYear() + '/' + (new Date(nutrition.date).getMonth() + 1) + '/' + new Date(nutrition.date).getDate() + ' ' + new Date(nutrition.date).getHours() + ':' + new Date(nutrition.date).getMinutes() + ':' + new Date(nutrition.date).getSeconds()}
                            </td>
                            <td className="px-6 py-4">
                                {nutrition.userId}
                            </td>
                            <td className="px-6 py-4">
                                {nutrition.id}
                            </td>
                            <td className="px-6 py-4">
                                <a onClick={() => {
                                    setIdNutrition(nutrition.id)
                                    setOpenDialog(true);
                                }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Voir</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Nutrition open={openDialog} onClose={handleCloseDialog} idNutrition={idNutrition} />
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