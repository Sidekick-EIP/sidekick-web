import {useForm} from "react-hook-form";
import {useFormState} from "@/components/Providers";
import {Button, Input, TextField} from "@mui/material";
import {Field} from "@/components/Form/Field";
import {useRouter} from "next/router";
import {GetServerSidePropsContext} from "next";
import {authOptions} from "../api/auth/[...nextauth]";
import {getServerSession} from "next-auth";
import Stepper from "@/components/Form/Stepper";
import React from "react";

const Infos = () => {
    const router = useRouter();
    const [state, setState] = useFormState() as any;
    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm({defaultValues: state, mode: "onSubmit"});

    const saveData = (data: any) => {
        setState({...state, ...data});
        router.push("/signup/sport");
    };

    return (
        <>
            <div className="max-w-5xl pt-20 pb-36 mx-auto">
                <h1 className="text-40 text-center font-4 lh-6 ld-04 font-bold text-white mb-6 pb-15">
                    Inscription !
                </h1>

                <div className='flex flex-col items-center justify-center space-y-4'>
                    <Stepper/>
                    <form onSubmit={handleSubmit(saveData)}
                          className='flex flex-col items-center space-y-4 max-w-lg w-full'>
                        <fieldset className="flex flex-row space-x-4 w-full">

                            <div className="flex flex-col w-full">
                                <Field>
                                    <div className="pt-2 text-start">
                                        <label className="text-sm text-orange-950">Firstname</label>
                                        <input
                                            {...register("firstname", {required: "First name is required"})}
                                            placeholder="Firstname"
                                            className="py-3 border border-orange-300 w-full text-orange-950 bg-white placeholder:text-orange-950 rounded-md text-sm sm:p-4 sm:ps-2"
                                            required/>
                                    </div>
                                    {/* <TextField
                      {...register("firstname", {required: "First name is required"})}
                      label="Prenom"
                      type="text"
                      id="firstname"
                      placeholder="Paul"
                      focused
                      color="white"
                      InputProps={{
                        style: {
                          fontStyle: 'italic',
                          color: "Silver",
                        },
                      }}
                      className="w-full"
                  /> */}
                                </Field>

                                <Field>
                                    <div className="pt-2 text-start">
                                        <label className="text-sm text-orange-950">Size (cm)</label>
                                        <input
                                            {...register("size", {required: "Size is required", min: 50, max: 300})}
                                            type="number"
                                            placeholder="160"
                                            className="py-3 border border-orange-300 w-full text-orange-950 bg-white placeholder:text-orange-950 rounded-md text-sm sm:p-4 sm:ps-2"
                                            required/>
                                    </div>
                                    {/* <TextField
                                        {...register("size", {required: "Size is required", min: 50, max: 300})}
                                        label="Taille (cm)"
                                        type="number"
                                        id="size"
                                        placeholder="160"
                                        focused
                                        color="white"
                                        InputProps={{
                                            style: {
                                                fontStyle: 'italic',
                                                color: 'silver', // Customize the color here
                                            },
                                        }}
                                        className="w-full"
                                    /> */}
                                </Field>

                            </div>

                            <div className="w-full">
                                <Field>

                                    <div className="pt-2 text-start">
                                        <label className="text-sm text-orange-950">Lastname</label>
                                        <input
                                            {...register("lastname", {required: "Last name is required"})}
                                            placeholder="Lastname"
                                            className="py-3 border border-orange-300 w-full text-orange-950 bg-white placeholder:text-orange-950 rounded-md text-sm sm:p-4 sm:ps-2"
                                            required/>
                                    </div>

                                    {/* <TextField
                                        {...register("lastname", {required: "Last name is required"})}
                                        label="Nom"
                                        type="text"
                                        id="lastname"
                                        placeholder="Lastname"
                                        focused
                                        color="white"
                                        InputProps={{
                                            style: {
                                                fontStyle: 'italic',
                                                color: 'silver', // Customize the color here
                                            },
                                        }}
                                        className="w-full"
                                    /> */}
                                </Field>

                                <Field>

                                    <div className="pt-2 text-start">
                                        <label className="text-sm text-orange-950">Birth Date</label>
                                        <input
                                            {...register("birth_date", {
                                                required: "Birth date is required",
                                                pattern: /\d{4}-\d{2}-\d{2}/
                                            })}
                                            type="date"
                                            placeholder="YYYY-MM-DD"
                                            className="py-3 border border-orange-300 w-full text-orange-950 bg-white placeholder:text-orange-950 rounded-md text-sm sm:p-4 sm:ps-2"
                                            required/>
                                    </div>
                                </Field>
                            </div>
                        </fieldset>

                        <div className="flex flex-col w-full">
                            <Field error={errors?.username}>
                                <div className="pt-2 text-start">
                                    <label className="text-sm text-orange-950">Username</label>
                                    <input
                                        {...register("username", {required: "Username is required"})}
                                        placeholder="Username"
                                        className="py-3 border border-orange-300 w-full text-orange-950 bg-white placeholder:text-orange-950 rounded-md text-sm sm:p-4 sm:ps-2"
                                        required/>
                                </div>
                            </Field>

                            <Field error={errors?.description}>
                                <div className="pt-2 text-start">
                                    <label className="text-sm text-orange-950">Birth Date</label>
                                    <textarea
                                        {...register("description", {required: "Description is required"})}
                                        placeholder="Description"
                                        className="py-3 border border-orange-300 w-full text-orange-950 bg-white placeholder:text-orange-950 rounded-md text-sm sm:p-4 sm:ps-2"
                                        required rows={4}/>
                                </div>
                            </Field>
                        </div>
                        <div>
                            {errors.firstname ? (
                                <>
                                    {errors.firstname.type === "required" && (
                                        <p style={{color: "white"}}>
                                            Un prenom est requis.
                                        </p>
                                    )}
                                    {errors.firstname.type === "pattern" && (
                                        <p style={{color: "white"}}>
                                            Poids non correct.
                                        </p>
                                    )}
                                </>
                            ) : null}

                            {errors.size ? (
                                <>
                                    {errors.size.type === "required" && (
                                        <p style={{color: "white"}}>
                                            Une taille est requise.
                                        </p>
                                    )}
                                    {errors.size.type === "pattern" && (
                                        <p style={{color: "white"}}>
                                            Une taille est requise.
                                        </p>
                                    )}
                                </>
                            ) : null}

                            {errors.lastname ? (
                                <>
                                    {errors.lastname.type === "required" && (
                                        <p style={{color: "white"}}>
                                            Un nom est requis.
                                        </p>
                                    )}
                                    {errors.lastname.type === "pattern" && (
                                        <p style={{color: "white"}}>
                                            nom non correct.
                                        </p>
                                    )}
                                </>
                            ) : null}

                            {errors.birth_date ? (
                                <>
                                    {errors.birth_date.type === "required" && (
                                        <p style={{color: "white"}}>
                                            Une date de naissance est requise.
                                        </p>
                                    )}
                                    {errors.birth_date.type === "pattern" && (
                                        <p style={{color: "white"}}>
                                            Date de naissance non correcte.
                                        </p>
                                    )}
                                </>
                            ) : null}

                            {errors.description ? (
                                <>
                                    {errors.description.type === "required" && (
                                        <p style={{color: "white"}}>
                                            Une description est requise.
                                        </p>
                                    )}
                                    {errors.description.type === "pattern" && (
                                        <p style={{color: "white"}}>
                                            Description non correcte.
                                        </p>
                                    )}
                                </>
                            ) : null}

                            {errors.username ? (
                                <>
                                    {errors.username.type === "required" && (
                                        <p style={{color: "white"}}>
                                            Un nom d'utilisateur est requis.
                                        </p>
                                    )}
                                    {errors.username.type === "pattern" && (
                                        <p style={{color: "white"}}>
                                            Nom d'utilisateur est incorect.
                                        </p>
                                    )}
                                </>
                            ) : null}
                        </div>
                        <button type='submit' className="flex flex-row justify-center w-full items-center bg-orangePrimary hover:underline text-gray-800 font-bold rounded-full py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                            <p style={{color: 'white'}}>Next {">"}</p>
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