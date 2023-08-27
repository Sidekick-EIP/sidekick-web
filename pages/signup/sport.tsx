import { useForm } from "react-hook-form";
import { useFormState } from "@/components/Providers";
import { Button, FormControl, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Field } from "../../components/Form/Field";
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
      <div className='flex flex-col items-center justify-center space-y-4'>
        <Stepper />
        <form onSubmit={handleSubmit(saveData)} className='flex flex-col space-y-4 max-w-md w-full'>
          <fieldset className="flex flex-row space-x-4">
            <div className="flex flex-col w-full">
              <Field error={errors?.weight} className="w-full">
                <TextField
                  {...register("weight", { required: "Weight is required", min: 30, max: 300 })}
                  label="Weight (kg)"
                  type="number"
                  id="weight"
                  placeholder="Weight"
                  focused
                  color="white"
                  InputProps={{
                    style: {
                      fontStyle:'italic',
                      color: 'grey', // Customize the color here
                    },
                  }}
                  className="w-full"
                />
              </Field>
              <Field error={errors?.sport_frequence}>
                <FormControl fullWidth>
                  <InputLabel id="sport_frequence_label">Sport frequency (per week)</InputLabel>
                  <Select
                    {...register("sport_frequence", { required: "Sport frequency is required" })}
                    label="Sport frequency (per week)"
                    labelId="sport_frequence_label"
                    type="text"
                    id="sport_frequence"
                    defaultValue={""}
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
              <Field error={errors?.gender}>
                <FormControl fullWidth>
                  <InputLabel id="gender_label">Gender</InputLabel>
                  <Select
                    {...register("gender", { required: "Gender is required" })}
                    label="Gender"
                    type="text"
                    id="gender"
                    labelId="gender_label"
                    defaultValue={""}
                  >
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                    <MenuItem value="PREFER_NOT_TO_SAY">Prefer not to say</MenuItem>
                  </Select>
                </FormControl>
              </Field>
              <Field error={errors?.goal}>
                <FormControl fullWidth>
                  <InputLabel id="goal_label">Goal</InputLabel>
                  <Select
                    {...register("goal", { required: "Goal is required" })}
                    labelId="goal_label"
                    label="Goal"
                    type="text"
                    id="goal"
                    defaultValue={""}
                  >
                    <MenuItem value="WEIGHT_LOSS">Weight loss</MenuItem>
                    <MenuItem value="WEIGHT_GAIN">Weight gain</MenuItem>
                    <MenuItem value="GETTING_BACK_IN_SHAPE">Getting back in shape</MenuItem>
                  </Select>
                </FormControl>
              </Field>
            </div>
          </fieldset>
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