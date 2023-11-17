import { Field } from "@/components/Form/Field";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSession } from "next-auth/react";
import React, { Component, useEffect, useState } from "react";
import dayjs from 'dayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type SportsExercise = {
  name: string;
};

type PlanningEvent = {
  type: string;
  content: {
    moment: string;
    repetitions?: number;
  };
  sports_exercise?: SportsExercise;
};


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

export default function Planning() {
  const session = useSession();
  const [selectedDate, setSelectedDate] = useState(Date());
  const [workouts, setWorkouts] = useState([]);
  const [exercices, setExercices] = useState([]);
  const [sidekickWorkouts, setSidekickWorkouts] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchEventData = async () => {
      if (session.data) {
        try {
          setWorkouts(await fetchWorkouts(session.data.user.access_token));
          setSidekickWorkouts(await fetchSidekickWorkouts(session.data.user.access_token));
          setExercices(await fetchExercices(session.data.user.access_token));
        } catch (error) {
          console.error("Error fetching workouts:", error);
        }
      }
    };
    fetchEventData();
  }, [selectedDate, session.data]);

  const [calendarEvents, setCalendarEvents] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    workout: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setCalendarEvents([...calendarEvents, formData]);
    setFormData({
      date: '',
      workout: '',
    });
  };

  const color = "#FFFFFF";
  const sortedWorkouts = [...workouts].sort((a, b) => new Date(a.date) - new Date(b.date));
  const sortedWorkoutsSidekick = [...sidekickWorkouts].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <section className="text-gray-600 body-font">

      <div className="pt-12 max-w-5xl mx-auto md:px-1 px-3">
        <div className="ktq4 text-center">
          <h3 className="pt-3 font-semibold text-lg text-white">La page Planning</h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Planifier vos exercices et regarder ceux de votre sidekick pour rester motivé vers vos objectifs !
          </p>
        </div>
      </div>
      
      <div className="mt-6 max-w-5xl mx-auto md:px-1 px-3 text-center">
        <div className="mt-6 ktq4">
        <h3 className="pt-3 font-semibold text-lg text-white">Ajouter un exercice</h3>
        <form onSubmit={handleFormSubmit} className='flex flex-col space-y-4 max-w-md w-full'>
            <fieldset className="flex flex-row space-x-4">
              <div className="flex flex-col w-full" text-color="white">
                <Field color="white" className="w-full" >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Select a Date"
                      value={dayjs(selectedDate)}
                      onChange={handleDateChange}
                      sx={{
                        svg: { color },
                        input: { color },
                        label: { color },
                        '& input': { borderColor: color },
                        '& fieldset': { borderColor: color },
                        '&:hover fieldset': { borderColor: color },
                      }}
                      slotProps={{
                        textField: {
                          helperText: 'MM/DD/YYYY',
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Field>

                <Field color="white" className="w-full" >
                  <FormControl fullWidth focused>
                    <InputLabel color="white" id="sport_frequence_label">Workouts</InputLabel>
                    <Select
                      label="Workouts"
                      labelId="workout_label"
                      type="text"
                      id="workout"
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
                      {exercices.map((exercise) => {
                        return <MenuItem value="name">{exercise.name}</MenuItem>
                      })}
                    </Select>
                  </FormControl>
                </Field>
              </div>
            </fieldset>
            <Button type="submit" variant="contained" className="w-full bg-orangePrimary">Submit</Button>
          </form>
        </div>

        <div className="flex">
          <div className="mt-4 mr-4 ktq4 w-1/2">
            <h2 className="text-lg text-white font-bold mb-2">Vos seances sportives prevues:</h2>
            <ul className="text-left">
              {sortedWorkouts.map((workout, index) => {
                console.log(workout);
            const eventDate = new Date(workout.date);
            const today = new Date();
            const differenceInDays = Math.floor((eventDate - today) / (24 * 60 * 60 * 1000));

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
          })}
            </ul>
          </div>


          <div className="mt-4 ktq4 w-1/2">
            <h2 className="text-lg text-white font-bold mb-2">Les seances sportives prevues par votre Sidekick:</h2>
            <ul className="text-left">
            {sortedWorkoutsSidekick.map((workout, index) => {
            const eventDate = new Date(workout.date);
            const today = new Date();
            const differenceInDays = Math.floor((eventDate - today) / (24 * 60 * 60 * 1000));

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
          })}
            </ul>
          </div>
        </div>
        
      </div>
    </section>
  );
}


// import { useSession } from "next-auth/react";
// import React, { Component, useEffect, useState } from "react";
// import { Grid, Typography, Paper, Button } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Link from "next/link";
// import dayjs from "dayjs";

// type SportsExercise = {
//   name: string;
// };

// type PlanningEvent = {
//   type: string;
//   content: {
//     moment: string;
//     repetitions?: number;
//   };
//   sports_exercise?: SportsExercise;
// };

// async function fetchEvents(date: number, access_token: string) {
//   date = new Date(new Date(date).setUTCHours(0, 0, 0, 0)).getTime();
//   const response = await fetch(
//     process.env.NEXT_PUBLIC_API_URL + "/planning?day=" + date.toString(),
//     {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Unable to retrieve events");
//   }

//   const events = await response.json();
//   for (const event of events) {
//     if (event.type === "SPORTS_EXERCISE") {
//       const response = await fetch(
//         process.env.NEXT_PUBLIC_API_URL +
//           "/sports-exercise/" +
//           event.content.id,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${access_token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Unable to retrieve sports_exercise");
//       }
//       const sports_exercise = await response.json();
//       event.sports_exercise = sports_exercise;
//     }
//     // else {
//     // const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/meals/" + event.content.id, {
//     // method: "GET",
//     // headers: {
//     //   "Authorization": `Bearer ${access_token}`,
//     // }});
    
//     if (!response.ok) {
//       throw new Error("Unable to retrieve meal");
//     }
//     const meal = await response.json();
//     event.meal = meal;
//   }
//   return events;
// }

// import { Calendar, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'

// const localizer = momentLocalizer(moment)

// class CalendarBlock extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       message: "React/Parcel Starter"
//     };
//   }
//   render() {
//     const events = [
//       {
//         title: "All Day Event very long title",
//         bgColor: "#ff7f50",
//         allDay: true,
//         start: new Date(2015, 3, 0),
//         end: new Date(2015, 3, 1)
//       },
//     ];
//     return (
//       <div {...this.props}>
//         <h3 className="callout">
//           Click an event to see more info, or drag the mouse over the calendar
//           to select a date/time range.
//         </h3>
//         <div>
//     <Calendar
//       localizer={localizer}
//       events={events}
//       startAccessor="start"
//       endAccessor="end"
//       style={{ height: 500 }}
//     />
//   </div>
//       </div>
//     );
//   }
// }

// export default function Planning() {
//   const session = useSession();
//   const [selectedDate, setSelectedDate] = useState(Date());
//   const color = "#F1895A";
//   const theme = createTheme({
//     	components: {
//     		MuiIconButton: {
//     			styleOverrides: {
//     				sizeMedium: {
//     					color
//     				}
//     			}
//     		},
//     		MuiOutlinedInput: {
//     			styleOverrides: {
//     				root: {
//     					color: color, '& fieldset': {
//     						borderColor: color,
//     					},
//     				}
//     			}
//     		},
//     		MuiInputLabel: {
//     			styleOverrides: {
//     				root: {
//     					color
//     				}
//     			}
//     		}
//     	}
//       });

//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchEventData = async () => {
//       if (session.data) {
//         try {
//           const data = await fetchEvents(
//             Date.parse(selectedDate),
//             session.data.user.access_token
//           );
//           setEvents(data);
//         } catch (error) {
//           console.error("Error fetching events:", error);
//         }
//       }
//     };

//     fetchEventData();
//   }, [selectedDate, session.data]);

//   return (
//     <><CalendarBlock /><Grid spacing={2}>
//       <Grid item xs={12} container spacing={0} alignItems="center" justifyContent="center">
//         <Typography variant="h5" color="common.white">
//           Planning
//         </Typography>
//       </Grid>
//       <Grid item xs={12} container spacing={0} alignItems="center" justifyContent="center">
//         <ThemeProvider theme={theme}>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               defaultValue={dayjs()}
//               label="Sélectionnez une date"
//               value={dayjs(selectedDate)}
//               onChange={(newDate) => {
//                 if (newDate) {
//                   setSelectedDate(newDate.toString());
//                 } else {
//                   setSelectedDate("");
//                 }
//               } } />
//           </LocalizationProvider>
//         </ThemeProvider>
//       </Grid>
//       <Grid item xs={12} sx={{ mx: "25%", mt: 6 }}>
//         {events.length === 0 ? (
//           <>
//             <Paper style={{ textAlign: "center", marginTop: "20px" }}>
//               <Typography sx={{ pt: 1 }} variant="body1">
//                 Rien de prévu ce jour
//               </Typography>
//             </Paper>
//           </>
//         ) : null}
//         {events.map((event, index) => {
//           const typedEvent = event as PlanningEvent;
//           return (
//             <Paper key={index} style={{ textAlign: "center", marginTop: "20px" }}>
//               <Typography sx={{ pt: 1 }} variant="body1">{typedEvent.content.moment}h</Typography>
//               <Typography sx={{ pt: 1 }} variant="body1">{typedEvent.type}</Typography>
//               {typedEvent.type === "SPORTS_EXERCISE" ? (
//                 <>
//                   <Typography variant="body2">{typedEvent.sports_exercise!.name}</Typography>
//                   <Typography variant="body2">{typedEvent.content.repetitions} répétitions.</Typography>
//                 </>
//               ) : (
//                 <>
//                   <Typography variant="body2">{typedEvent.meal!.name}</Typography>
//                   <Typography variant="body2">{typedEvent.meal!.period}</Typography>
//                 </>
//               )}
//             </Paper>
//           );
//         })}
//       </Grid>
//     </Grid></>
//   );
// }



// import { useSession } from "next-auth/react";
// import React, { Component, useEffect, useState } from "react";
// import { Grid, Typography, Paper, Button } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Link from "next/link";
// import dayjs from "dayjs";

// type SportsExercise = {
//   name: string;
// };

// type PlanningEvent = {
//   type: string;
//   content: {
//     moment: string;
//     repetitions?: number;
//   };
//   sports_exercise?: SportsExercise;
// };

// async function fetchEvents(date: number, access_token: string) {
//   date = new Date(new Date(date).setUTCHours(0, 0, 0, 0)).getTime();
//   const response = await fetch(
//     process.env.NEXT_PUBLIC_API_URL + "/planning?day=" + date.toString(),
//     {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Unable to retrieve events");
//   }

//   const events = await response.json();
//   for (const event of events) {
//     if (event.type === "SPORTS_EXERCISE") {
//       const response = await fetch(
//         process.env.NEXT_PUBLIC_API_URL +
//           "/sports-exercise/" +
//           event.content.id,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${access_token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Unable to retrieve sports_exercise");
//       }
//       const sports_exercise = await response.json();
//       event.sports_exercise = sports_exercise;
//     }
//     // else {
//     // const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/meals/" + event.content.id, {
//     // method: "GET",
//     // headers: {
//     //   "Authorization": `Bearer ${access_token}`,
//     // }});
    
//     if (!response.ok) {
//       throw new Error("Unable to retrieve meal");
//     }
//     const meal = await response.json();
//     event.meal = meal;
//   }
//   return events;
// }

// import { Calendar, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'

// const localizer = momentLocalizer(moment)

// class CalendarBlock extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       message: "React/Parcel Starter"
//     };
//   }
//   render() {
//     const events = [
//       {
//         title: "All Day Event very long title",
//         bgColor: "#ff7f50",
//         allDay: true,
//         start: new Date(2015, 3, 0),
//         end: new Date(2015, 3, 1)
//       },
//     ];
//     return (
//       <div {...this.props}>
//         <h3 className="callout">
//           Click an event to see more info, or drag the mouse over the calendar
//           to select a date/time range.
//         </h3>
//         <div>
//     <Calendar
//       localizer={localizer}
//       events={events}
//       startAccessor="start"
//       endAccessor="end"
//       style={{ height: 500 }}
//     />
//   </div>
//       </div>
//     );
//   }
// }

// export default function Planning() {
//   const session = useSession();
//   const [selectedDate, setSelectedDate] = useState(Date());
//   const color = "#F1895A";
//   const theme = createTheme({
//     	components: {
//     		MuiIconButton: {
//     			styleOverrides: {
//     				sizeMedium: {
//     					color
//     				}
//     			}
//     		},
//     		MuiOutlinedInput: {
//     			styleOverrides: {
//     				root: {
//     					color: color, '& fieldset': {
//     						borderColor: color,
//     					},
//     				}
//     			}
//     		},
//     		MuiInputLabel: {
//     			styleOverrides: {
//     				root: {
//     					color
//     				}
//     			}
//     		}
//     	}
//       });

//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchEventData = async () => {
//       if (session.data) {
//         try {
//           const data = await fetchEvents(
//             Date.parse(selectedDate),
//             session.data.user.access_token
//           );
//           setEvents(data);
//         } catch (error) {
//           console.error("Error fetching events:", error);
//         }
//       }
//     };

//     fetchEventData();
//   }, [selectedDate, session.data]);

//   return (
//     <><CalendarBlock /><Grid spacing={2}>
//       <Grid item xs={12} container spacing={0} alignItems="center" justifyContent="center">
//         <Typography variant="h5" color="common.white">
//           Planning
//         </Typography>
//       </Grid>
//       <Grid item xs={12} container spacing={0} alignItems="center" justifyContent="center">
//         <ThemeProvider theme={theme}>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               defaultValue={dayjs()}
//               label="Sélectionnez une date"
//               value={dayjs(selectedDate)}
//               onChange={(newDate) => {
//                 if (newDate) {
//                   setSelectedDate(newDate.toString());
//                 } else {
//                   setSelectedDate("");
//                 }
//               } } />
//           </LocalizationProvider>
//         </ThemeProvider>
//       </Grid>
//       <Grid item xs={12} sx={{ mx: "25%", mt: 6 }}>
//         {events.length === 0 ? (
//           <>
//             <Paper style={{ textAlign: "center", marginTop: "20px" }}>
//               <Typography sx={{ pt: 1 }} variant="body1">
//                 Rien de prévu ce jour
//               </Typography>
//             </Paper>
//           </>
//         ) : null}
//         {events.map((event, index) => {
//           const typedEvent = event as PlanningEvent;
//           return (
//             <Paper key={index} style={{ textAlign: "center", marginTop: "20px" }}>
//               <Typography sx={{ pt: 1 }} variant="body1">{typedEvent.content.moment}h</Typography>
//               <Typography sx={{ pt: 1 }} variant="body1">{typedEvent.type}</Typography>
//               {typedEvent.type === "SPORTS_EXERCISE" ? (
//                 <>
//                   <Typography variant="body2">{typedEvent.sports_exercise!.name}</Typography>
//                   <Typography variant="body2">{typedEvent.content.repetitions} répétitions.</Typography>
//                 </>
//               ) : (
//                 <>
//                   <Typography variant="body2">{typedEvent.meal!.name}</Typography>
//                   <Typography variant="body2">{typedEvent.meal!.period}</Typography>
//                 </>
//               )}
//             </Paper>
//           );
//         })}
//       </Grid>
//     </Grid></>
//   );
// }
