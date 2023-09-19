import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import {FormControl, InputLabel, MenuItem, Select, Button, TextField } from "@mui/material";
import { Field } from "@/components/Form/Field";
import router from 'next/router';

type Meal = {
  name: string;
  id: string;
};

async function getMeals(access_token: string) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/meals/findAll",
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
  const [meals, setMeals] = useState([]);
  const [mealId, setMealId] = useState("");
  const [moment, setMoment] = useState("");

  useEffect(() => {
    const fetch_meals = async () => {
      if (session.data) {
        try {
          const data = await getMeals(session.data!.user.access_token)
          console.log(data)
          setMeals(data);
        } catch (error) {
          console.error("Error fetching meals:", error);
        }
      }
    }

    fetch_meals()
  }, [session.data]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const day = urlParams.get('day');

    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/planning/meal",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.data!.user.access_token}`,
        },
        body: JSON.stringify({moment: moment, meal_id: mealId, day: day})
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
          Add Meal !
      </h1>
    <div className='flex items-center justify-center'>
      <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
            <Field color="white" className="w-full" focused>
                  <FormControl fullWidth focused>
                    <InputLabel color="white" id="sport_frequence_label">Select a Meal</InputLabel>
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
                      onChange={(selected) => {setMealId(selected.target.value)}}
                    >
                      {meals.map((meal, index) => {
                        const typedMeal = meal as Meal
                        return (
                          <MenuItem key={typedMeal.id} value={typedMeal.id}>{typedMeal.name}</MenuItem>
                      )})}
                    </Select>
                  </FormControl>
                </Field>
        <TextField placeholder="18" focused color="white" InputProps={{  style: { fontStyle:'italic', color: 'grey'},}} className="w-full" name='moment' label="Moment" variant="outlined" value={moment} onChange={e => setMoment(e.target.value)} />
        <Button className="bg-orangePrimary" variant="contained" type='submit'>Add</Button>
      </form>
    </div>
    </div>
  )
}