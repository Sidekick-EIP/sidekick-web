import {useForm} from "react-hook-form";
import {useFormState} from "@/components/Providers";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {Field} from "@/components/Form/Field";
import {useRouter} from "next/router";
import {GetServerSidePropsContext} from "next";
import {authOptions} from "../api/auth/[...nextauth]";
import {getServerSession} from "next-auth";
import Stepper from "@/components/Form/Stepper";
import {signIn} from "next-auth/react";
import React from "react";

const Infos = () => {
    const router = useRouter();
    const [state, setState] = useFormState() as any;

    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm({defaultValues: state, mode: "onSubmit"});

    const saveData = async (data: any) => {
        setState({...state, ...data});
        const tempBody = {
            ...state,
            ...data,
        }
        signIn('signup', {
            ...tempBody,
            redirect: false,
        }).then((res) => {
            if (res?.ok) {
                router.push("/");
            } else {
                router.push("/signup/");
            }
        });
    };

    return (
        <>
            <div className="max-w-5xl pt-20 pb-36 mx-auto">
                <h1 className="text-40 text-center font-4 lh-6 ld-04 font-bold text-white mb-6 pb-15">
                    Inscription !
                </h1>
                <div className='flex flex-col items-center justify-center space-y-4'>
                    <Stepper/>


                    <form onSubmit={handleSubmit(saveData)} className='flex flex-col space-y-4 max-w-3xl w-full'>
                        <fieldset className="flex flex-row space-x-4">
                            <div className="flex flex-col w-full">

                                <Field className="w-full">
                                    <div className="pt-2 text-start">
                                        <label className="text-sm text-orange-950">Weight (kg)</label>
                                        <input
                                            {...register("weight", {required: "Weight is required", min: 30, max: 300})}
                                            placeholder="76"
                                            type="number"
                                            className="py-3 border border-orange-300 w-full text-orange-950 bg-white placeholder:text-orange-950 rounded-md text-sm sm:p-4 sm:ps-2"
                                            required/>
                                    </div>
                                </Field>


                                <Field color="white" className="w-full" focused>
                                    <div className="pt-2 text-start">
                                        <label className="text-sm text-orange-950">Sport frequency (per
                                            week)</label>
                                        <select id="countries" required placeholder="fe" {...register("sport_frequence", {required: "Sport frequency is required"})}
                                                className="py-3 border border-orange-300 w-full text-orange-950 bg-white placeholder:text-orange-950 rounded-md text-sm sm:p-4 sm:ps-2">
                                            <option value="NEVER">Never</option>
                                            <option value="ONCE_A_WEEK">Once a week</option>
                                            <option value="TWICE_A_WEEK">Twice a week</option>
                                            <option value="THREE_A_WEEK">Three times a week</option>
                                            <option value="FOUR_A_WEEK">Four times a week</option>
                                            <option value="FIVE_A_WEEK">Five times a week</option>
                                            <option value="MORE_THEN_FIVE_A_WEEK">More than five times a
                                                week</option>
                                        </select>
                                    </div>
                                </Field>
                            </div>

                            <div className="flex flex-col w-full">
                                <Field>
                                    <div className="pt-2 text-start">
                                        <label className="text-sm text-orange-950">Gender
                                        </label>
                                        <select id="countries" required placeholder="fe" {...register("gender", {required: "Gender is required"})}
                                                className="py-3 border border-orange-300 w-full text-orange-950 bg-white placeholder:text-orange-950 rounded-md text-sm sm:p-4 sm:ps-2">
                                            <option value="MALE">Homme</option>
                                            <option value="FEMALE">Femme</option>
                                            <option value="PREFER_NOT_TO_SAY">Ne se prononce pas</option>
                                        </select>
                                    </div>
                                </Field>
                                <Field>
                                    <div className="pt-2 text-start">
                                        <label className="text-sm text-orange-950">Objectif
                                        </label>
                                        <select id="countries" required placeholder="fe" {...register("goal", {required: "Goal is required"})}
                                                className="py-3 border border-orange-300 w-full text-orange-950 bg-white placeholder:text-orange-950 rounded-md text-sm sm:p-4 sm:ps-2">
                                            <option value="WEIGHT_LOSS">Perte de poids</option>
                                            <option value="WEIGHT_GAIN">Gain de poids</option>
                                            <option value="GETTING_BACK_IN_SHAPE">Retrouver la forme</option>
                                        </select>
                                    </div>
                                </Field>
                            </div>

                        </fieldset>
                        <div>
                            {errors.weight ? (
                                <>
                                    {errors.weight.type === "required" && (
                                        <p style={{color: "white"}}>
                                            Un poids est requis.
                                        </p>
                                    )}
                                    {errors.weight.type === "pattern" && (
                                        <p style={{color: "white"}}>
                                            Poids non correct.
                                        </p>
                                    )}
                                </>
                            ) : null}

                            {errors.gender ? (
                                <>
                                    {errors.gender.type === "required" && (
                                        <p style={{color: "white"}}>
                                            Une reponse est requise.
                                        </p>
                                    )}
                                    {errors.gender.type === "pattern" && (
                                        <p style={{color: "white"}}>
                                            Une reponse est requise.
                                        </p>
                                    )}
                                </>
                            ) : null}

                            {errors.goal ? (
                                <>
                                    {errors.goal.type === "required" && (
                                        <p style={{color: "white"}}>
                                            Un objectif est requis.
                                        </p>
                                    )}
                                    {errors.goal.type === "pattern" && (
                                        <p style={{color: "white"}}>
                                            Un objectif est requis.
                                        </p>
                                    )}
                                </>
                            ) : null}

                            {errors.sport_frequence ? (
                                <>
                                    {errors.sport_frequence.type === "required" && (
                                        <p style={{color: "white"}}>
                                            Une frequence est requise.
                                        </p>
                                    )}
                                    {errors.sport_frequence.type === "pattern" && (
                                        <p style={{color: "white"}}>
                                            Une frequence est requise.
                                        </p>
                                    )}
                                </>
                            ) : null}
                        </div>
                        <button type='submit' className="flex flex-row justify-center w-full items-center bg-orangePrimary hover:underline text-gray-800 font-bold rounded-full py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                            <p style={{color: 'white'}}>Submit</p>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Infos;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (session) {
        return {redirect: {destination: "/"}};
    }

    return {
        props: {}
    }
}