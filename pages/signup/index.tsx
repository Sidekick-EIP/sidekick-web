import { useForm } from "react-hook-form";
import { useFormState } from "@/components/Providers";
import { Button, Input, TextField } from "@mui/material";
import { Field } from "../../components/Form/Field";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Stepper from "@/components/Form/Stepper";

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
      <div className="max-w-5xl pt-20 pb-36 mx-auto">
        <h1 className="text-40 text-center font-4 lh-6 ld-04 font-bold text-white mb-6 pb-15">
          Inscription !
        </h1>
        <div className='flex flex-col items-center justify-center space-y-4'>
          <Stepper />
          <form onSubmit={handleSubmit(saveData)} className='flex flex-col items-center space-y-4 max-w-xs w-full'>
            <fieldset className="w-full">

              <Field error={errors?.email}>
                <TextField
                  {...register("email", { required: "Email is required" })}
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
                />
              </Field>
              <Field error={errors?.password}>
                <TextField
                  {...register("password", { required: "Password is required" })}
                  label="Password"
                  type="password"
                  id="password"
                  placeholder="********"
                  color="white"
                  focused
                  InputProps={{
                    style: {
                      fontStyle: 'italic',
                      color: 'silver', // Customize the color here
                    },
                  }}
                  className="w-full"
                />
              </Field>
              <Field error={errors?.confirmPassword}>
                <TextField
                  {...register("confirmPassword", {
                    required: "Confirm the password",
                    validate: (value) =>
                      value === watchPassword || "The passwords do not match",
                  })}
                  label="Confirm password"
                  type="password"
                  id="password-confirm"
                  placeholder="********"
                  focused
                  color="white"
                  InputProps={{
                    style: {
                      fontStyle: 'italic',
                      color: 'silver', // Customize the color here
                    },
                  }}
                  className="w-full"
                />
              </Field>
              <Button type="submit" variant="contained" className="w-full bg-orangePrimary">Next {">"}</Button>
              
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