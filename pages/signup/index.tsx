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
                className="w-full"
              />
            </Field>
            <Field error={errors?.password}>
              <TextField
                {...register("password", { required: "Password is required" })}
                label="Password"
                type="password"
                id="password"
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
                className="w-full"
              />
            </Field>
            <Button type="submit" variant="outlined" className="w-full">Next {">"}</Button>
          </fieldset>
        </form>
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