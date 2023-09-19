import React, { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import {FormControl, InputLabel, MenuItem, Select, Button, TextField, Field } from "@mui/material";
import { redirect } from 'next/dist/server/api-utils';

async function getMeals(access_token: string) {
  // const response = await fetch(
  //   process.env.NEXT_PUBLIC_API_URL + "/meals/findAll",
  //   {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${access_token}`,
  //     },
  //   }
  // );

  // if (!response.ok) {
  //   throw new Error("Unable to retrieve meals");
  // }

  // return await response.json();
}

export default function AddMeal() {
  //const session = useSession();
  //const [meals, setMeals] = useState([]);

  //console.log(await getMeals(session.data!.user.access_token))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  }

  return (
    <div className="max-w-5xl pt-20 pb-36 mx-auto">
      <h1 className="text-40 text-center font-4 lh-6 ld-04 font-bold text-white mb-6 pb-10">
          Add Meal !
      </h1>
    <div className='flex items-center justify-center'>
      <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
            {/* <Field color="white" className="w-full" focused>
                  <FormControl fullWidth focused>
                    <InputLabel color="white" id="sport_frequence_label">Meal</InputLabel>
                    <Select
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
                </Field> */}
        <Button className="bg-orangePrimary" variant="contained" type='submit'>Add</Button>
      </form>
    </div>
    </div>
  )
}