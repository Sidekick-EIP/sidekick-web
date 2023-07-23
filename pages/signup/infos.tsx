import { useForm } from "react-hook-form";
import { useFormState } from "@/components/Providers";
import { Button, Input, TextField } from "@mui/material";
import { Field } from "../../components/Form/Field";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Stepper from "@/components/Form/Stepper";

const Infos = () => {
  const router = useRouter();
  const [state, setState] = useFormState() as any;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues: state, mode: "onSubmit" });

  const saveData = (data: any) => {
    setState({ ...state, ...data });
    router.push("/signup/sport");
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center space-y-4'>
        <Stepper />
        <form onSubmit={handleSubmit(saveData)} className='flex flex-col items-center space-y-4  max-w-md w-full'>
          <fieldset className="flex flex-row space-x-4 w-full">
            <div className="flex flex-col w-full">
              <Field error={errors?.firstname}>
                <TextField
                  {...register("firstname", { required: "First name is required" })}
                  label="First name"
                  type="text"
                  id="firstname"
                  className="w-full"
                />
              </Field>
              <Field error={errors?.lastName}>
                <TextField
                  {...register("lastname", { required: "Last name is required" })}
                  label="Last name"
                  type="text"
                  id="lastname"
                  className="w-full"
                />
              </Field>
              <Field error={errors?.username}>
                <TextField
                  {...register("username", { required: "Username is required" })}
                  label="Username"
                  type="text"
                  id="username"
                  className="w-full"
                />
              </Field>
            </div>
            <div className="w-full">
              <Field error={errors?.description}>
                <TextField
                  {...register("description", { required: "Description is required" })}
                  label="Description"
                  type="text"
                  id="description"
                  className="w-full"
                />
              </Field>
              <Field error={errors?.birth_date}>
                <TextField
                  placeholder="YYYY-MM-DD"
                  {...register("birth_date", { required: "Birth date is required", pattern: /\d{4}-\d{2}-\d{2}/ })}
                  label="Birth date"
                  type="text"
                  id="birth_date"
                  className="w-full"
                />
              </Field>
              <Field error={errors?.size}>
                <TextField
                  {...register("size", { required: "Size is required", min: 50, max: 300 })}
                  label="Size (cm)"
                  type="number"
                  id="size"
                  className="w-full"
                />
              </Field>
            </div>
          </fieldset>
          <Button type="submit" variant="outlined" className="w-full">Next {">"}</Button>
        </form>
      </div>
    </>
  );
};

export default Infos;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/" } };
  }

  return {
    props: {}
  }
}