import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import {FormControl, InputLabel, MenuItem, Select, Button, TextField } from "@mui/material";
import { Field } from "@/components/Form/Field";
import router from 'next/router';

type Exercise = {
  name: string;
  id: string;
};

async function getMeals(access_token: string) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/sports-exercise/",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Unable to retrieve meals");
  }

  return await response.json();
}

export default function AddMeal() {
  const session = useSession();
  const [exercises, setExercises] = useState([]);
  const [exerciseId, setExerciseId] = useState("");
  const [moment, setMoment] = useState("");
  const [repetitions, setRepetitions] = useState("");

  useEffect(() => {
    const fetch_exercises = async () => {
      if (session.data) {
        try {
          const data = await getMeals(session.data!.user.access_token)
          console.log(data)
          setExercises(data);
        } catch (error) {
          console.error("Error fetching exercises:", error);
        }
      }
    }

    fetch_exercises()
  }, [session.data]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const day = urlParams.get('day');

    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/planning/exercise",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.data!.user.access_token}`,
        },
        body: JSON.stringify({moment: moment, exercise_id: exerciseId, day: day, repetitions: repetitions})
      }
    );
 
    console.log(response)
    if (!response.ok) {
      throw new Error("Unable to add a meal");
    }
    router.push("/planning")
  }

  return (
    <div className="max-w-5xl pt-20 pb-36 mx-auto">
      <h1 className="text-40 text-center font-4 lh-6 ld-04 font-bold text-white mb-6 pb-10">
          Add Exercise !
      </h1>
    <div className='flex items-center justify-center'>
      <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
            <Field color="white" className="w-full" focused>
                  <FormControl fullWidth focused>
                    <InputLabel color="white" id="sport_frequence_label">Select an Exercise</InputLabel>
                    <Select
                      label="Meals"
                      labelId="meals_label"
                      type="text"
                      id="meals"
                      defaultValue={""}
                      placeholder="fe"
                      focused="true"
                      color="white"
                      variant="outlined"
                      className="w-full"
                      onChange={(selected) => {setExerciseId(selected.target.value)}}
                    >
                      {exercises.map((exercise, index) => {
                        const typedExercise = exercise as Exercise
                        return (
                          <MenuItem key={typedExercise.id} value={typedExercise.id}>{typedExercise.name}</MenuItem>
                      )})}
                    </Select>
                  </FormControl>
                </Field>
		<TextField placeholder="18" focused color="white" InputProps={{  style: { fontStyle:'italic', color: 'grey'},}} className="w-full" name='repetition' label="Repetitions" variant="outlined" value={repetitions} onChange={e => setRepetitions(e.target.value)} />
        <TextField placeholder="18" focused color="white" InputProps={{  style: { fontStyle:'italic', color: 'grey'},}} className="w-full" name='moment' label="Moment" variant="outlined" value={moment} onChange={e => setMoment(e.target.value)} />
        <Button className="bg-orangePrimary" variant="contained" type='submit'>Add</Button>
      </form>
    </div>
    </div>
  )
}