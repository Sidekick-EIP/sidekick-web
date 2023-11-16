import { useSession } from "next-auth/react";
import React, { Component, useEffect, useState } from "react";

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

async function fetchEvents(date: number, access_token: string) {
  date = new Date(new Date(date).setUTCHours(0, 0, 0, 0)).getTime();
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/planning?day=" + date.toString(),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  console.log("ligne 28");
  if (!response.ok) {
    throw new Error("Unable to retrieve events");
  }

  const events = await response.json();
  for (const event of events) {
    if (event.type === "SPORTS_EXERCISE") {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          "/sports-exercise/" +
          event.content.id,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to retrieve sports_exercise");
      }
      const sports_exercise = await response.json();
      event.sports_exercise = sports_exercise;
    }
  }
  return events;
}

export default function Planning() {
  const session = useSession();
  const [selectedDate, setSelectedDate] = useState(Date());
  const [events, setEvents] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchEventData = async () => {
      if (session.data) {
        try {
          const data = await fetchEvents(
            Date.parse(selectedDate),
            session.data.user.access_token
          );
          setEvents(data);
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      }
    };

    fetchEventData();
  }, [selectedDate, session.data]);

  const calendarEventsSidekick = [
    {
      date: '2023-11-21',
      description: 'séance abdos / épaule a villeneuve',
      sportName: 'Salle de sport',
    },
    {
      date: '2023-11-18',
      description: 'preparation pour le marathon, 20 km',
      sportName: 'Course a pied',
    },
    {
      date: '2023-11-22',
      description: 'Tour du mont des cats, 105 km',
      sportName: 'Vélo',
    },
    {
      date: '2023-11-24',
      description: 'séance pecs / jambes a villeneuve',
      sportName: 'Salle de sport',
    },
  ];

  const [calendarEvents, setCalendarEvents] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    sportName: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setCalendarEvents([...calendarEvents, formData]);
    setFormData({
      date: '',
      description: '',
      sportName: '',
    });
  };

  const sortedEvents = [...calendarEvents].sort((a, b) => new Date(a.date) - new Date(b.date));
  const sortedEventsSidekick = [...calendarEventsSidekick].sort((a, b) => new Date(a.date) - new Date(b.date));

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
          <form onSubmit={handleFormSubmit} className="flex flex-wrap gap-2">
        <div className="flex items-center">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className="w-full mb-2"
        />

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full mb-2"
        />

        <label htmlFor="sportName">Sport:</label>
        <input
          type="text"
          id="sportName"
          name="sportName"
          value={formData.sportName}
          onChange={handleInputChange}
          className="w-full mb-2"
        />

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Plannifier
        </button>
        </div>
          </form>
        </div>

        <div>
          <div className="mt-4 ktq4">
            <h2 className="text-lg text-white font-bold mb-2"><strong className="text-orange-500">Vos</strong> seances sportives prevues:</h2>
            <ul className="text-left">
          {sortedEvents.map((event, index) => {
            const eventDate = new Date(event.date);
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
                <strong>{event.date}:</strong> {event.description} ({event.sportName})
              </li>
            );
          })}
            </ul>
          </div>
        </div>

        <div>
          <div className="mt-4 ktq4">
            <h2 className="text-lg text-white font-bold mb-2">Les seances sportives prevues par votre <strong className="text-orange-500">Sidekick</strong>:</h2>
            <ul className="text-left">
            {sortedEventsSidekick.map((event, index) => {
            const eventDate = new Date(event.date);
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
                <strong>{event.date}:</strong> {event.description} ({event.sportName})
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
