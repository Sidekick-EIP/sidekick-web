import { useForm } from "react-hook-form";
import { useFormState } from "@/components/Providers";
import { Button, Input, TextField } from "@mui/material";
import { Field } from "../../components/Form/Field";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Stepper from "@/components/Form/Stepper";
import React from "react";
import {Key} from "react-feather";

const Email = () => {
  const router = useRouter();
  const [state, setState] = useFormState() as any;
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: state, mode: "onSubmit" });
  const watchPassword = watch("password");

  const saveData = (data: any) => {
    setState({ ...state, ...data });
    router.push("/signup/infos");
  };

  return (
    <>
      <div className="pt-20 pb-36">
        <h1 className="text-40 text-center font-4 lh-6 ld-04 font-bold text-white mb-6 pb-15">
          Inscription !
        </h1>
        <div className='flex flex-col items-center justify-center space-y-4'>
          <Stepper />
          <form onSubmit={handleSubmit(saveData)} className='flex flex-col items-center space-y-4 max-w-lg w-full'>
            <fieldset className="w-full">

              <Field error={errors?.email}>
                <div className="pt-2 text-start">
                  <label className="text-sm text-orange-950">Email address</label>
                  <div className="relative">
                    <input type="email"
                           {...register("email", { required: "Email is required" })}
                           className="py-3 ps-11 border border-orange-300 w-full text-orange-950 bg-white placeholder:text-orange-950 rounded-md text-sm sm:p-4 sm:ps-11"
                           placeholder="exemple@gmail.com"/>
                    <div
                        className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 ps-4">
                      <svg className="h-4 w-4 text-orange-950" xmlns="http://www.w3.org/2000/svg"
                           width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path
                            d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* <TextField
                    {...register("email", {required: "Email is required"})}
                    label="Email"
                    type="email"
                    id="email"
                    placeholder="test@gmail.com"
                    focused
                    variant="outlined"
                    color="white"
                    InputProps={{
                      style: {
                        fontStyle: 'italic',
                        color: 'silver', // Customize the color here
                      },
                    }}
                    className="w-full placeholder-yellow-200"
                /> */}
              </Field>

              <Field error={errors?.password}>
                <div className="text-start">
                  <label className="text-orange-950 text-sm">Password</label>
                  <div className="relative">
                    <input type="password"
                           {...register("password", { required: "Password is required" })}
                           className="py-3 ps-11 pe-4 border border-orange-300 w-full bg-white text-orange-950 placeholder:text-orange-950 rounded-md text-sm focus:border-white/30 focus:ring-white/30 sm:p-4 sm:ps-11"
                           placeholder="******"/>
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 ps-4">
                      <Key size={16} className="text-orange-950" />
                    </div>
                  </div>
                </div>
              </Field>

              <Field error={errors?.confirmPassword}>
                <div className="text-start">
                  <label className="text-orange-950 text-sm">Password confirmation</label>
                  <div className="relative">
                    <input type="password"
                           {...register("confirmPassword", {
                             required: "Confirm the password",
                             validate: (value) =>
                                 value === watchPassword || "The passwords do not match",
                           })}
                           className="py-3 ps-11 pe-4 border border-orange-300 w-full bg-white text-orange-950 placeholder:text-orange-950 rounded-md text-sm focus:border-white/30 focus:ring-white/30 sm:p-4 sm:ps-11"
                           placeholder="******"/>
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 ps-4">
                      <Key size={16} className="text-orange-950" />
                    </div>
                  </div>
                </div>
              </Field>

              <button type='submit' className="flex flex-row justify-center w-full items-center bg-orangePrimary hover:underline text-gray-800 font-bold rounded-full py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                <p style={{color: 'white'}}>Next {">"}</p>
              </button>

            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default Email;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/" } };
  }

  return {
    props: {}
  }
}