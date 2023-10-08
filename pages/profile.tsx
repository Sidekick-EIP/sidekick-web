import {getServerSession, Session} from "next-auth";
import {useSession} from "next-auth/react";
import {GetServerSidePropsContext} from 'next';
import {authOptions} from '@/pages/api/auth/[...nextauth]';
import {useEffect, useState} from "react";
import {useSnackBar} from "@/components/SnackBar";
import axios from "axios";
import dayjs from "dayjs";
import DialogEditUser from "@/components/Profile/DialogEditUser";

const getTokenFromCookie = () => {
    // Récupère tous les cookies
    const cookies = document.cookie.split('; ');

    // Cherche le cookie qui contient le token
    const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));

    // Extrait le token s'il existe
    if (tokenCookie) {
        return tokenCookie.split('=')[1];
    }

    return null; // Retourne null si le cookie n'est pas trouvé
};

export default function Home(): JSX.Element {
    const {data}: { data: Session | null } = useSession();
    const [open, setOpen] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const [isToReload, setIsToReload] = useState<boolean>(true);
    const useAlert: any = useSnackBar();

    useEffect(() => {
        if (!isToReload)
            return;
        (async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user_infos`, {
                    headers: {
                        Authorization: `Bearer ${data?.user.access_token}`
                    }
                });
                setUser(response.data);
            } catch (err: any) {
                if (err.response) {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useAlert(err.response.data.message, "error");
                } else {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useAlert(err.message, "error");
                }
            }
        })();
    }, [isToReload, useAlert]);

    if (!user)
        return <div className="container mx-auto">
            chargement....
        </div>

    return <div className="container mx-auto w-full flex justify-center flex-col items-center">
        <img className="w-full h-auto rounded-lg"
             src={'https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80'}
             alt={"background"}/>
        <div
            className="w-5/6 bg-gray-800 border rounded-lg shadow border-gray-700 relative top-[-100px]">
            <div className="grid grid-cols-3 w-full relative top-[-70px]">
                <div className="col-span-1 flex justify-center pl-12 pt-16 items-center">
                    <div className="mr-4 p-3 text-center">
                        <span
                            className="text-xl font-bold block uppercase tracking-wide text-white">{user.size} cm</span><span
                        className="text-sm text-white">Taille</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                        <span
                            className="text-xl font-bold block uppercase tracking-wide text-white">{user.weight} kg</span><span
                        className="text-sm text-white">Poids</span>
                    </div>
                </div>
                <div className="col-span-1 flex justify-center flex-col items-center">
                    <img alt={user.firstname} src={user.avatar}
                         className="shadow-xl rounded-full w-32 h-32 align-middle border-none max-w-25-px mb-2"/>
                    <h5 className="mb-1 text-xl font-medium text-white">{user.gender === "MALE" ? "Mr." : "M."} {user.firstname} {user.lastname}</h5>
                    <span className="text-sm text-gray-400">{user.email}</span>
                </div>
                <div className="col-span-1 flex justify-end items-center pr-9 pt-16">
                    <button type="button" onClick={() => setOpen(true)}
                            className="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-black rounded-lg  focus:ring-4 focus:outline-none  bg-gray-200 hover:bg-blue-700 focus:ring-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-4 h-4 text-black mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                        </svg>
                        Edit
                    </button>
                </div>
            </div>
            <div className="flex items-end w-full justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z"/>
                </svg>
                <span
                    className="ml-2 text-sm font-medium text-white">{dayjs(user.birth_date).format("DD MMMM YYYY")}</span>
            </div>
            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-white">
                            {user.description}
                        </p>
                    </div>
                </div>
            </div>

        </div>

        <DialogEditUser open={open} onClose={(isToReload: boolean) => {
            setIsToReload(isToReload)
            setOpen(false)
        }} user={user}/>
    </div>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);
    console.log(session);

    return {
        props: {}
    }
}