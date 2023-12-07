import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import Layout from '../../../components/BackOffice/Layout'
import axios from "axios";
import {useSnackBar} from "@/components/SnackBar";
import {Session} from "next-auth";
import {useSession} from "next-auth/react";
import DialogSupport from "@/components/BackOffice/Support/DialogSupport";

export default function Support() {
    const {data}: { data: Session | null } = useSession();
    const [dataSupports, setDataSupports] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [idSupport, setIdSupport] = useState(0);
    const [isToReload, setIsToReload] = useState<boolean>(true);
    const useAlert: any = useSnackBar();
    const router = useRouter();

    useEffect(() => {
        if (!isToReload)
            return;
        (async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tickets?cursor=0`, {
                    headers: {
                        Authorization: `Bearer ${data?.user.access_token}`
                    }
                });
                console.log(response.data);
                setDataSupports(response.data);
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
        })();
    }, [isToReload]);

    function handleCloseDialog(isToReload: boolean) {
        setOpenDialog(false);
        setIsToReload(isToReload)
        setIdSupport(0)
    }

    return <Layout>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Creation Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Last update Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Customer
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                {dataSupports.map((support: any) => (
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {support.title}
                        </td>
                        <td className="px-6 py-4">
                            {support.status}
                        </td>
                        <td className="px-6 py-4">
                            {new Date(support.createdAt).getFullYear() + '/' + (new Date(support.createdAt).getMonth() + 1) + '/' + new Date(support.createdAt).getDate() + ' ' + new Date(support.createdAt).getHours() + ':' + new Date(support.createdAt).getMinutes() + ':' + new Date(support.createdAt).getSeconds()}
                        </td>
                        <td className="px-6 py-4">
                            {new Date(support.updatedAt).getFullYear() + '/' + (new Date(support.updatedAt).getMonth() + 1) + '/' + new Date(support.updatedAt).getDate() + ' ' + new Date(support.updatedAt).getHours() + ':' + new Date(support.updatedAt).getMinutes() + ':' + new Date(support.updatedAt).getSeconds()}
                        </td>
                        <td className="px-6 py-4">
                            {support.user.email}
                        </td>
                        <td className="px-6 py-4">
                            <a onClick={() => {
                                setIdSupport(support.id);
                                setOpenDialog(true);
                            }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Voir</a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <DialogSupport open={openDialog} onClose={handleCloseDialog} idSupport={idSupport}/>
        </div>
    </Layout>
}
