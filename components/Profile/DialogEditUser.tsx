import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    Select
} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import axios from "axios";
import {useSnackBar} from "@/components/SnackBar";
import {Session} from "next-auth";
import {useSession} from "next-auth/react";
import MenuItem from "@mui/material/MenuItem";
import {Activities} from "@/pages/profile";
import Typography from "@mui/material/Typography";

interface DialogEditUserProps {
    open: boolean
    onClose: (isToReload: boolean) => void
    user: any
    type: 'PROFILE' | 'SPORT'
}

const sports: string[] = [
    "RUNNING",
    "CYCLING",
    "WEIGHTLIFTING",
    "SWIMMING",
    "MARTIAL_ARTS",
    "YOGA",
    "PILATES",
    "DANCING",
    "BOXING",
    "HIKING",
    "ROCK_CLIMBING",
    "TENNIS",
    "GOLF",
    "BASKETBALL",
    "SOCCER",
    "BASEBALL",
    "RUGBY",
    "VOLLEYBALL",
    "SQUASH",
    "BADMINTON",
    "TABLE_TENNIS",
    "SKIING",
    "SNOWBOARDING",
    "ROWING",
    "TRIATHLON",
    "SKATING",
    "HORSE_RIDING",
    "CROSSFIT",
    "GYMNASTICS",
    "SURFING",
]

export default function DialogEditUser({open, onClose, user, type = 'PROFILE'}: DialogEditUserProps) {
    const {data}: { data: Session | null } = useSession();

    const [lastname, setLastname] = useState<string>('');
    const [firstname, setFirstname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [goalWeight, setGoalWeight] = useState<number>(0);
    const [activities, setActivities] = useState<string[]>([]);

    const [goals, setGoals] = useState<string>('LOSE_WEIGHT');
    const [size, setSize] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [gender, setGender] = useState<string>('MALE')
    const [level, setLevel] = useState<string>('ADVANCED');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const useAlert: any = useSnackBar();

    useEffect(() => {
        setLastname(user.lastname);
        setFirstname(user.firstname);
        setEmail(user.email);
        setGoals(user.goal);
        setGoalWeight(user.goal_weight);
        setSize(user.size);
        setWeight(user.weight);
        setDescription(user.description);
        setGender(user.gender);
        setLevel(user.level);
        setActivities(user.activities);
    }, [user]);

    function handleClose(isToReload: boolean): void {
        onClose(isToReload);
    }

    async function handleSubmit(event: any): Promise<void> {
        event.preventDefault();
        try {
            setIsLoading(true);
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user_infos/update`, {
                firstname: firstname,
                lastname: lastname,
                size: size,
                goal_weight: goalWeight,
                weight: weight,
                gender: gender,
                description: description,
                goal: goals,
                level: level,
                activities: activities
            }, {
                headers: {
                    Authorization: `Bearer ${data?.user.access_token}`
                }
            });
            useAlert("Votre profil est bien sauvegardé.", "success");
            handleClose(true);
            setIsLoading(false);
        } catch (err: any) {
            if (err.response) {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                useAlert(err.response.data.message, "error");
            } else {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                useAlert(err.message, "error");
            }
        }
    }

    // @ts-ignore
    return <Dialog component={'form'} open={open} onClose={() => handleClose(false)} onSubmit={handleSubmit}
                   maxWidth={"sm"}
                   fullWidth>
        <DialogTitle>
            Modifier mon profile
        </DialogTitle>
        <DialogContent>
            {type === 'PROFILE' && <Grid container item xs={12} sx={{mt: 0}} spacing={2}>
                <Grid item xs={4.5}>
                    <TextField fullWidth variant={'outlined'} label={'Nom'} value={lastname}
                               onChange={(event: any) => setLastname(event.target.value)}/>
                </Grid>
                <Grid item xs={4.5}>
                    <TextField fullWidth variant={'outlined'} label={'Prénom'} value={firstname}
                               onChange={(event: any) => setFirstname(event.target.value)}/>
                </Grid>
                <Grid item xs={3}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            value={gender}
                            onChange={(event: any) => setGender(event.target.value)}
                            label="Age"
                        >
                            <MenuItem value={'MALE'}>Garçon</MenuItem>
                            <MenuItem value={'FEMALE'}>Fille</MenuItem>
                            <MenuItem value={'PREFER_NOT_TO_SAY'}>Autre</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth variant={'outlined'} label={'Email'} value={email}
                               onChange={(event: any) => setEmail(event.target.value)}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth variant={'outlined'} label={'Taille'} type={"number"} value={size}
                               onChange={(event: any) => setSize(parseInt(event.target.value))} InputProps={{
                        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                    }}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth variant={'outlined'} label={'Poids'} type={"number"} value={weight}
                               onChange={(event: any) => setWeight(parseInt(event.target.value))} InputProps={{
                        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    }}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth variant={'outlined'} multiline rows={3} label={'Description'}
                               value={description} onChange={(event: any) => setDescription(event.target.value)}/>
                </Grid>
            </Grid>}


            {type === 'SPORT' && <Grid container item xs={12} sx={{mt: 0}} spacing={2}>
                <Grid item xs={6}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Goals</InputLabel>
                        <Select
                            value={goals}
                            onChange={(event: any) => setGoals(event.target.value)}
                            label="Age"
                        >
                            <MenuItem value={'LOSE_WEIGHT'}>Perdre du poids</MenuItem>
                            <MenuItem value={'STAY_IN_SHAPE'}>Rester en forme</MenuItem>
                            <MenuItem value={'GAIN_MUSCLE_MASS'}>Prendre de la masse musculaire</MenuItem>
                            <MenuItem value={'BUILD_MUSCLE'}>Se muscler</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth variant={'outlined'} label={'Poids ideal'} type={"number"} value={goalWeight}
                               onChange={(event: any) => setGoalWeight(parseInt(event.target.value))} InputProps={{
                        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    }}/>
                </Grid>
                <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Level</InputLabel>
                        <Select
                            value={level}
                            onChange={(event: any) => setLevel(event.target.value)}
                            label="Level"
                        >
                            <MenuItem value={'BEGINNER'}>Débutant</MenuItem>
                            <MenuItem value={'IRREGULAR_TRAINING'}>Entrainement irrégulier</MenuItem>
                            <MenuItem value={'INTERMEDIATE'}>Intermédiaire</MenuItem>
                            <MenuItem value={'ADVANCED'}>Avancé</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"body1"}>Activités:</Typography>
                </Grid>
                <Grid container item xs={12} spacing={2}>
                    {sports.map((item: any) => <Grid item xs={4}>
                        <Button onClick={() => {
                            if (activities.includes(item)) {
                                setActivities(activities.filter((activity: string) => activity !== item))
                            } else {
                                setActivities([...activities, item])
                            }
                        }} variant={"outlined"} fullWidth color={activities.includes(item) ? 'primary' : 'secondary'} sx={{p: 2}}>{item}</Button>
                    </Grid>)}
                </Grid>

            </Grid>}


        </DialogContent>
        <DialogActions>
            <Button disabled={isLoading} type={"submit"} onClick={() => handleClose(false)}>
                Sauvegarder
            </Button>
        </DialogActions>
    </Dialog>
}