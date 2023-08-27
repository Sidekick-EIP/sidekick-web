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

      <div className="flex pt-20 pb-36 items-center justify-center">
        <div className='flex flex-col items-center justify-center space-y-4'>
          <Stepper />
          <form onSubmit={handleSubmit(saveData)} className='flex flex-col items-center space-y-4  max-w-md w-full'>
            <fieldset className="flex flex-row space-x-4 w-full">

              <div className="flex flex-col w-full">
                <Field>
                  <TextField
                    {...register("firstname", { required: "First name is required" })}
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
                  />
                </Field>

                <Field>
                  <TextField
                    {...register("size", { required: "Size is required", min: 50, max: 300 })}
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
                  />
                </Field>

              </div>

              <div className="w-full">
                <Field>
                  <TextField
                    {...register("lastname", { required: "Last name is required" })}
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
                  />
                </Field>

                <Field>
                  <TextField
                    placeholder="YYYY-MM-DD"
                    {...register("birth_date", { required: "Birth date is required", pattern: /\d{4}-\d{2}-\d{2}/ })}
                    label="Date de naissance"
                    type="text"
                    id="birth_date"
                    placeholder=""
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
              </div>
            </fieldset>

            <div className="flex flex-col w-full">
              <Field error={errors?.description}>
                <TextField
                  {...register("description", { required: "Description is required" })}
                  label="Description"
                  type="text"
                  id="description"
                  placeholder="Description"
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

              <Field error={errors?.username}>
                <TextField
                  {...register("username", { required: "Username is required" })}
                  label="Username"
                  type="text"
                  id="username"
                  placeholder="Username"
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
            </div>
            <div>
              {errors.firstname ? (
                <>
                  {errors.firstname.type === "required" && (
                    <p style={{ color: "white" }}>
                      Un prenom est requis.
                    </p>
                  )}
                  {errors.firstname.type === "pattern" && (
                    <p style={{ color: "white" }}>
                      Poids non correct.
                    </p>
                  )}
                </>
              ) : null}

              {errors.size ? (
                <>
                  {errors.size.type === "required" && (
                    <p style={{ color: "white" }}>
                      Une taille est requise.
                    </p>
                  )}
                  {errors.size.type === "pattern" && (
                    <p style={{ color: "white" }}>
                      Une taille est requise.
                    </p>
                  )}
                </>
              ) : null}

              {errors.lastname ? (
                <>
                  {errors.lastname.type === "required" && (
                    <p style={{ color: "white" }}>
                      Un nom est requis.
                    </p>
                  )}
                  {errors.lastname.type === "pattern" && (
                    <p style={{ color: "white" }}>
                      nom non correct.
                    </p>
                  )}
                </>
              ) : null}

              {errors.birth_date ? (
                <>
                  {errors.birth_date.type === "required" && (
                    <p style={{ color: "white" }}>
                      Un poids est requis.
                    </p>
                  )}
                  {errors.birth_date.type === "pattern" && (
                    <p style={{ color: "white" }}>
                      Poids non correct.
                    </p>
                  )}
                </>
              ) : null}

              {errors.description ? (
                <>
                  {errors.description.type === "required" && (
                    <p style={{ color: "white" }}>
                      Une description est requise.
                    </p>
                  )}
                  {errors.description.type === "pattern" && (
                    <p style={{ color: "white" }}>
                      Description non correcte.
                    </p>
                  )}
                </>
              ) : null}

              {errors.username ? (
                <>
                  {errors.username.type === "required" && (
                    <p style={{ color: "white" }}>
                      Un nom d'utilisateur est requis.
                    </p>
                  )}
                  {errors.username.type === "pattern" && (
                    <p style={{ color: "white" }}>
                      Nom d'utilisateur est incorect.
                    </p>
                  )}
                </>
              ) : null}
            </div>
            <Button type="submit" variant="contained" className="w-full bg-orangePrimary">Next {">"}</Button>
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
    return { redirect: { destination: "/" } };
  }

  return {
    props: {}
  }
}