import { Field } from "@/components/Form/Field";
import { Button, FormControl, InputLabel, MenuItem, Select, Stepper, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { useForm, useFormState } from "react-hook-form";

type Workout = {
  date: string;
  duration: number;
  exercise: Exercise;
  burned_calories: number;
}

type Exercise = {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  video: string;
  met: number;
  muscle_group: string;
}

async function fetchWorkouts(access_token: string) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/workouts/",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Unable to retrieve events");
  }

  return await response.json();
}

async function fetchSidekickWorkouts(access_token: string) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/workouts/sidekick",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Unable to retrieve events");
  }

  return await response.json();
}

async function fetchExercices(access_token: string) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/exercises-library",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Unable to retrieve exercices");
  }

  return await response.json();
}

async function addWorkout(access_token: string, body: any): Promise<void> {
  try {
    console.log(body);
    console.log(JSON.stringify(body))
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/workouts/add",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Unable to add workout");
    }
  } catch (error) {
    throw new Error("Unable to add workout");
  }
}

function computeDifferenceInDays(workout_date: string) {
  const eventDate: Date = new Date(workout_date);
  const today: Date = new Date();

  const differenceInMilliseconds: number = eventDate.getTime() - today.getTime();
  return Math.floor(differenceInMilliseconds / (24 * 60 * 60 * 1000));
}

function displayWorkouts(workout: Workout, index: number) {
  const differenceInDays: number = computeDifferenceInDays(workout.date);

  let colorClass;
  if (differenceInDays === 0) {
    colorClass = 'text-red-500';
  } else if (differenceInDays === 1) {
    colorClass = 'text-red-500';
  } else if (differenceInDays <= 5) {
    colorClass = 'text-yellow-500';
  } else {
    colorClass = 'text-green-500';
  }

  return (
    <li key={index} className={colorClass}>
      <strong>{workout.date}:</strong> ({workout.exercise.name})
    </li>
  );
}

function displayTimeline(workout: Workout, index: number) {
  const differenceInDays: number = computeDifferenceInDays(workout.date);

  let colorClass;
  if (differenceInDays === 0) {
    colorClass = 'text-red-500';
  } else if (differenceInDays === 1) {
    colorClass = 'text-red-500';
  } else if (differenceInDays <= 5) {
    colorClass = 'text-yellow-500';
  } else {
    colorClass = 'text-green-500';
  }

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ py: '12px', px: 2 }}>
        <Typography variant="h6" component="span">
          Eat
        </Typography>
        <Typography>Because you need strength</Typography>
      </TimelineContent>
    </TimelineItem>
  );
}


export default function Planning() {
  const session = useSession();
  const [workouts, setWorkouts] = useState([]);
  const [exercices, setExercices] = useState([]);
  const [sidekickWorkouts, setSidekickWorkouts] = useState([]);
  const [refreshWorkouts, setRefreshWorkouts] = useState(false);


  useEffect(() => {
    const fetchEventData = async () => {
      if (session.data) {
        try {
          setWorkouts(await fetchWorkouts(session.data.user.access_token));
          setSidekickWorkouts(await fetchSidekickWorkouts(session.data.user.access_token));
          setExercices(await fetchExercices(session.data.user.access_token));
          setRefreshWorkouts(false);
        } catch (error) {
          console.error("Error fetching workouts:", error);
        }
      }
    };
    fetchEventData();
  }, [session.data, refreshWorkouts]);

  const { handleSubmit, register, formState: { errors } } = useForm();

  const onFormSubmit = async (data: any) => {
    console.log(data);
    const formattedDate: string = new Date(data.date).toISOString();
    const body = {
      date: formattedDate,
      duration: parseInt(data.duration),
      exerciseId: parseInt(data.exercise_id),
    }
    if (session.data) {
      await addWorkout(session.data.user.access_token, body);
      setRefreshWorkouts(true);
    }
  }

  const sortedWorkouts: Workout[] = [...workouts].sort((a: Workout, b: Workout) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const sortedWorkoutsSidekick: Workout[] = [...sidekickWorkouts].sort((a: Workout, b: Workout) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <section className="text-gray-600 body-font mt-16 mx-auto">
      <div className="pt-12 max-w-5xl mx-auto md:px-1 px-3">
        <div className="pt-3 text-center">
          <h3 className="pt-3 font-semibold text-lg">La page Planning</h3>
          <p className="pt-2 value-text text-md fkrr1">
            Planifier vos exercices et regarder ceux de votre sidekick pour rester motivé vers vos objectifs !
          </p>
        </div>

        <div className="ktq4 flex flex-col items-center justify-center text-center space-y-4">
          <Stepper />

          <form onSubmit={handleSubmit(onFormSubmit)} className='flex flex-col max-w-3xl w-full'>
            <h4 className="pt-3 font-semibold text-lg pb-3">Ajouter un exercice</h4>
            <fieldset className="flex-row">
              <div className="flex flex-row justify-center">
                <Field className="w-64" >
                  <div className="pt-2 text-start flex flex-col">
                    <label className="text-sm text-orange-950">Date</label>
                    <input
                      {...register("date", {
                        required: "Date is required",
                        pattern: /\d{4}-\d{2}-\d{2}/
                      })}
                      type="date"
                      placeholder="YYYY-MM-DD"
                      className="py-3 border border-orange-300 w-64 text-orange-950 bg-white placeholder:text-orange-950 rounded-md text-sm sm:p-4 sm:ps-2"
                      required />
                  </div>
                </Field>
                <div className="w-20" />
                <Field>
                  <div className="pt-2 text-start flex flex-col">
                    <label className="text-sm text-orange-950">Durée</label>
                    <input
                      {...register("duration", { required: "Duration is required" })}
                      placeholder="60"
                      className="py-3 border border-orange-300 w-64 text-orange-950 bg-white placeholder:text-orange-950 rounded-md text-sm sm:p-4 sm:ps-2"
                      required />
                  </div>
                </Field>
              </div>
              <div className="flex flex-row justify-center">
                <Field color="white" className=" w-64 flex justify-center">
                  <div className="pt-2 text-start flex flex-col">
                    <label className="text-sm text-orange-950">Exercice</label>
                    <select id="countries" required placeholder="fe" {...register("exercise_id", { required: "Workout is required" })}
                      className="py-3 border border-orange-300 w-64 text-orange-950 bg-white placeholder:text-orange-950 rounded-md text-sm sm:p-4 sm:ps-2">
                      {exercices.map((exercise: Exercise) => {
                        return <option value={exercise.id}>{exercise.name}</option>
                      })}
                    </select>
                  </div>
                </Field>
                <div className="  w-20" />
                <Button type="submit" variant="contained" className=" mt-7 w-64 h-14 flex bg-orangePrimary">Submit</Button>
              </div>
            </fieldset>
          </form>
        </div >

        <div className="flex">
          {/* <div className="mt-4 mr-4 ktq4 w-1/2">
              <h2 className="text-lg text-white font-bold mb-2">Vos seances sportives prevues:</h2>
              <ul className="text-left">
                {sortedWorkouts.map((workout: Workout, index: number) => {
                  return displayWorkouts(workout, index);
                })}
              </ul>
            </div> */}

          <Timeline>

            {sortedWorkouts.map((workout: Workout, index: number) => {
              return displayTimeline(workout, index);
            })}
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h6" component="span">
                  Eat
                </Typography>
                <Typography>Because you need strength</Typography>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Code</TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="secondary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Sleep</TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
              </TimelineSeparator>
              <TimelineContent>Repeat</TimelineContent>
            </TimelineItem>

          </Timeline>

          {/* <div className="mt-4 ktq4 w-1/2">
              <h2 className="text-lg text-white font-bold mb-2">Les seances sportives prevues par votre Sidekick:</h2>
              <ul className="text-left">
                {sortedWorkoutsSidekick.map((workout: Workout, index) => {
                  return displayWorkouts(workout, index);
                })}
              </ul>
            </div> */}
        </div>

      </div >
    </section >
  );
}
