import {getServerSession, Session} from "next-auth";
import {useSession} from "next-auth/react";
import {GetServerSidePropsContext} from 'next';
import {authOptions} from '@/pages/api/auth/[...nextauth]';
import {useEffect, useState} from "react";
import {useSnackBar} from "@/components/SnackBar";
import axios from "axios";
import dayjs from "dayjs";
import DialogEditUser from "@/components/Profile/DialogEditUser";

enum Goal {
    LOSE_WEIGHT = "LOSE_WEIGHT",
    STAY_IN_SHAPE = "STAY_IN_SHAPE",
    GAIN_MUSCLE_MASS = "GAIN_MUSCLE_MASS",
    BUILD_MUSCLE = "BUILD_MUSCLE",
}

enum Training_level {
    BEGINNER = "BEGINNER",
    IRREGULAR_TRAINING = "IRREGULAR_TRAINING",
    INTERMEDIATE = "INTERMEDIATE",
    ADVANCED = "ADVANCED",
}

export enum Activities {
    RUNNING = "RUNNING",
    CYCLING = "CYCLING",
    SWIMMING = "SWIMMING",
    WEIGHTLIFTING = "WEIGHTLIFTING",
    YOGA = "YOGA",
    PILATES = "PILATES",
    MARTIAL_ARTS = "MARTIAL_ARTS",
    DANCING = "DANCING",
    HIKING = "HIKING",
    ROCK_CLIMBING = "ROCK_CLIMBING",
    TENNIS = "TENNIS",
    BASKETBALL = "BASKETBALL",
    SOCCER = "SOCCER",
    VOLLEYBALL = "VOLLEYBALL",
    BASEBALL = "BASEBALL",
    SKIING = "SKIING",
    SNOWBOARDING = "SNOWBOARDING",
    SURFING = "SURFING",
    GOLF = "GOLF",
    ROWING = "ROWING",
    CROSSFIT = "CROSSFIT",
    GYMNASTICS = "GYMNASTICS",
    TRIATHLON = "TRIATHLON",
    RUGBY = "RUGBY",
    BOXING = "BOXING",
    SKATING = "SKATING",
    SQUASH = "SQUASH",
    BADMINTON = "BADMINTON",
    HORSE_RIDING = "HORSE_RIDING",
    TABLE_TENNIS = "TABLE_TENNIS",
}


export default function Home(): JSX.Element {
    const {data}: { data: Session | null } = useSession();
    const [open, setOpen] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const [isToReload, setIsToReload] = useState<boolean>(true);
    const [typeEdit, setTypeEdit] = useState<'PROFILE' | 'SPORT'>('PROFILE');
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
                console.log(response.data)
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

    function getGoal(goal: string): string {
        switch (goal) {
            case Goal.LOSE_WEIGHT:
                return "Perdre du poids";
            case Goal.STAY_IN_SHAPE:
                return "Rester en forme";
            case Goal.GAIN_MUSCLE_MASS:
                return "Prendre de la masse musculaire";
            case Goal.BUILD_MUSCLE:
                return "Se muscler";
            default:
                return "Aucun";
        }
    }

    function getLevel(level: string): string {
        switch (level) {
            case Training_level.BEGINNER:
                return "Débutant";
            case Training_level.IRREGULAR_TRAINING:
                return "Entrainement irrégulier";
            case Training_level.INTERMEDIATE:
                return "Intermédiaire";
            case Training_level.ADVANCED:
                return "Avancé";
            default:
                return "Aucun";
        }
    }

    return <div className="container mx-auto w-full mt-32">
        <img className="w-full h-auto rounded-lg"
             src={'https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80'}
             alt={"background"}/>

        <div className="col-span-1 flex justify-center flex-col items-center w-full relative top-[-70px]">

            <img alt={user.firstname} src={user.avatar}
                 className="shadow-xl rounded-full w-32 h-32 align-middle border-none max-w-25-px mb-2"/>
            <h5 className="mb-1 text-xl font-medium text-orange-950">{user.gender === "MALE" ? "Mr." : "M."} {user.firstname} {user.lastname}</h5>
            <span className="text-sm text-gray-400">{user.email}</span>
        </div>

        <div className="border-b border-orangePrimary text-start w-full flex flex-row justify-between pb-2">
            <p className="text-orangePrimary font-bold">Information personnel</p>
            <button type="button" onClick={() => {
                setTypeEdit('PROFILE')
                setOpen(true)
            }}
                    className="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white rounded-lg font-bold focus:ring-4 focus:outline-none bg-orange-200 hover:bg-orange-700 focus:ring-orange-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-4 h-4 text-white mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                </svg>
                Edit information personnel
            </button>
        </div>

        <div className="mt-5 text-start w-full">
            <p className="text-orangePrimary font-bold">Date de naissance: <span
                className="text-orange-950">{dayjs(user.birth_date).format("DD MMMM YYYY")}</span></p>
            <p className="text-orangePrimary font-bold">Taille: <span className="text-orange-950">{user.size} cm</span></p>
            <p className="text-orangePrimary font-bold">Poids: <span className="text-orange-950">{user.weight} kg</span></p>
        </div>

        <div className="mt-10 border-b border-orangePrimary text-start w-full pb-2">
            <p className="text-orangePrimary font-bold">Description</p>
        </div>

        <div className="mt-5 text-start w-full">
            <p className="text-orange-950 font-bold">{user.description}</p>
        </div>

        <div className="mt-10 border-b border-orangePrimary text-start w-full flex flex-row justify-between pb-2">
            <p className="text-orangePrimary font-bold">Activité et objectif</p>
            <button type="button" onClick={() => {
                setTypeEdit('SPORT')
                setOpen(true)
            }}
                    className="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white rounded-lg font-bold focus:ring-4 focus:outline-none bg-orange-200 hover:bg-orange-700 focus:ring-orange-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-4 h-4 text-white mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                </svg>
                Edit mes objectif et activité
            </button>
        </div>

        <div className="mt-5 text-start w-full mb-32">
            <p className="text-orangePrimary font-bold">Mon objectif est de <span
                className="text-orange-950">{getGoal(user.goal)}</span></p>
            <p className="text-orangePrimary font-bold">Mon poids ideal est <span className="text-orange-950">{user.goal_weight} kg</span></p>
            <p className="text-orangePrimary font-bold">Je suis un sportif <span className="text-orange-950">{getLevel(user.level)}</span></p>
            <p className="text-orangePrimary font-bold">Sports:</p>
            <div className="grid grid-cols-5 gap-4 pt-2">
                {user.activities.map((activity: string) => <div key={activity} className="grid border border-orangePrimary p-6 rounded">
                    <p className="text-orange-950">{activity}</p>
                </div>)}
            </div>
        </div>

        <DialogEditUser open={open} onClose={(isToReload: boolean) => {
            setIsToReload(isToReload)
            setOpen(false)
        }} user={user} type={typeEdit}/>
    </div>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);
    console.log(session);

    return {
        props: {}
    }
}