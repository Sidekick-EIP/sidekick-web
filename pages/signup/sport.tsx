import { useForm } from "react-hook-form";
import { useFormState } from "@/components/Providers";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Field } from "@/components/Form/Field";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Stepper from "@/components/Form/Stepper";
import { signIn } from "next-auth/react";

const Infos = () => {
  const router = useRouter();
  const [state, setState] = useFormState() as any;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues: state, mode: "onSubmit" });

  const saveData = async (data: any) => {
    setState({ ...state, ...data });
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
          <Stepper />


          <form onSubmit={handleSubmit(saveData)} className='flex flex-col space-y-4 max-w-md w-full'>
            <fieldset className="flex flex-row space-x-4">
              <div className="flex flex-col w-full">

                <Field className="w-full">
                  <TextField
                    {...register("weight", { required: "Weight is required", min: 30, max: 300 })}
                    label="Poids"
                    type="number"
                    id="weight"
                    placeholder="76"
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


                <Field color="white" className="w-full" focused>
                  <FormControl fullWidth focused>
                    <InputLabel color="white" id="sport_frequence_label">Sport frequency (per week)</InputLabel>
                    <Select
                      {...register("sport_frequence", { required: "Sport frequency is required" })}
                      label="Sport frequency (per week)"
                      labelId="sport_frequence_label"
                      type="text"
                      id="sport_frequence"
                      defaultValue={""}
                      placeholder="fe"
                      focused
                      color="white"
                      variant="outlined"
                      className="w-full"
                      InputProps={{
                        style: {
                          fontStyle: 'italic',
                          color: 'silver', // Customize the color here
                        },

                      }}
                    >
                      <MenuItem value="NEVER">Never</MenuItem>
                      <MenuItem value="ONCE_A_WEEK">Once a week</MenuItem>
                      <MenuItem value="TWICE_A_WEEK">Twice a week</MenuItem>
                      <MenuItem value="THREE_A_WEEK">Three times a week</MenuItem>
                      <MenuItem value="FOUR_A_WEEK">Four times a week</MenuItem>
                      <MenuItem value="FIVE_A_WEEK">Five times a week</MenuItem>
                      <MenuItem value="MORE_THEN_FIVE_A_WEEK">More than five times a week</MenuItem>
                    </Select>
                  </FormControl>
                </Field>
              </div>

              <div className="flex flex-col w-full">
                <Field >
                  <FormControl fullWidth focused>
                    <InputLabel color="white" id="gender_label">Genre</InputLabel>
                    <Select
                      {...register("gender", { required: "Gender is required" })}
                      label="Genre"
                      type="text"
                      color="white"
                      id="gender"
                      labelId="gender_label"
                      defaultValue={""}
                    >
                      <MenuItem value="MALE">Homme</MenuItem>
                      <MenuItem value="FEMALE">Femme</MenuItem>
                      <MenuItem value="PREFER_NOT_TO_SAY">Ne se prononce pas</MenuItem>
                    </Select>
                  </FormControl>
                </Field>
                <Field>
                  <FormControl fullWidth focused>
                    <InputLabel id="goal_label">Objectif</InputLabel>
                    <Select
                      {...register("goal", { required: "Goal is required" })}
                      labelId="goal_label"
                      label="Goal"
                      type="text"
                      id="goal"
                      defaultValue={""}
                    >
                      <MenuItem value="WEIGHT_LOSS">Perte de poids</MenuItem>
                      <MenuItem value="WEIGHT_GAIN"> Gain de poids</MenuItem>
                      <MenuItem value="GETTING_BACK_IN_SHAPE">Retrouver la forme</MenuItem>
                    </Select>
                  </FormControl>
                </Field>
              </div>

            </fieldset>
            <div>
              {errors.weight ? (
                <>
                  {errors.weight.type === "required" && (
                    <p style={{ color: "white" }}>
                      Un poids est requis.
                    </p>
                  )}
                  {errors.weight.type === "pattern" && (
                    <p style={{ color: "white" }}>
                      Poids non correct.
                    </p>
                  )}
                </>
              ) : null}

              {errors.gender ? (
                <>
                  {errors.gender.type === "required" && (
                    <p style={{ color: "white" }}>
                      Une reponse est requise.
                    </p>
                  )}
                  {errors.gender.type === "pattern" && (
                    <p style={{ color: "white" }}>
                      Une reponse est requise.
                    </p>
                  )}
                </>
              ) : null}

              {errors.goal ? (
                <>
                  {errors.goal.type === "required" && (
                    <p style={{ color: "white" }}>
                      Un objectif est requis.
                    </p>
                  )}
                  {errors.goal.type === "pattern" && (
                    <p style={{ color: "white" }}>
                      Un objectif est requis.
                    </p>
                  )}
                </>
              ) : null}

              {errors.sport_frequence ? (
                <>
                  {errors.sport_frequence.type === "required" && (
                    <p style={{ color: "white" }}>
                      Une frequence est requise.
                    </p>
                  )}
                  {errors.sport_frequence.type === "pattern" && (
                    <p style={{ color: "white" }}>
                      Une frequence est requise.
                    </p>
                  )}
                </>
              ) : null}
            </div>
            <Button type="submit" variant="contained" className="w-full bg-orangePrimary">Submit</Button>
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