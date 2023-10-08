import {Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import axios from "axios";
import {useSnackBar} from "@/components/SnackBar";
import {Session} from "next-auth";
import {useSession} from "next-auth/react";
import MenuItem from "@mui/material/MenuItem";

interface DialogEditUserProps {
    open: boolean
    onClose: (isToReload: boolean) => void
    user: any
}

export default function DialogEditUser({open, onClose, user}: DialogEditUserProps) {
    const {data}: { data: Session | null } = useSession();

    const [lastname, setLastname] = useState<string>('');
    const [firstname, setFirstname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [goals, setGoals] = useState<string>('LOSE_WEIGHT');
    const [size, setSize] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [gender, setGender] = useState<string>('MALE')

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const useAlert: any = useSnackBar();

    useEffect(() => {
        setLastname(user.lastname);
        setFirstname(user.firstname);
        setEmail(user.email);
        setGoals(user.goals);
        setSize(user.size);
        setWeight(user.weight);
        setDescription(user.description);
        setGender(user.gender);
    }, [user]);

    function handleClose(isToReload: boolean): void {
        onClose(isToReload);
        setLastname(user.lastname);
        setFirstname(user.firstname);
        setEmail(user.email);
        setGoals(user.goals);
        setSize(user.size);
        setWeight(user.weight);
        setDescription(user.description);
        setGender(user.gender);
    }

    async function handleSubmit(event: any): Promise<void> {
        event.preventDefault();
        try {
            setIsLoading(true);
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user_infos/update`, {
                lastname,
                firstname,
                email,
                username: user.username,
                size,
                weight,
                gender,
                description,
                sport_frequence: user.sport_frequence,
                sports: user.sports,
                goals: goals,
            }, {
                headers: {
                    Authorization: `Bearer ${data?.user.access_token}`
                }
            });
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
        onClose(true);
    }

    return <Dialog component={'form'} open={open} onClose={() => handleClose(false)} onSubmit={handleSubmit} maxWidth={"sm"}
                   fullWidth>
        <DialogTitle>
            Modifier mon profile
        </DialogTitle>
        <DialogContent>
            <TextField required fullWidth variant={'standard'} label={'Nom'} value={lastname} onChange={(event: any) => setLastname(event.target.value)}/>
            <TextField required fullWidth variant={'standard'} label={'Prénom'} value={firstname} onChange={(event: any) => setFirstname(event.target.value)}/>
            <TextField required fullWidth variant={'standard'} label={'Email'} value={email} onChange={(event: any) => setEmail(event.target.value)}/>
            <FormControl variant="standard" fullWidth required>
                <InputLabel>Goals</InputLabel>
                <Select
                    value={goals}
                    onChange={(event: any) => setGoals(event.target.value)}
                    label="Age"
                >
                    <MenuItem value={'LOSE_WEIGHT'}>LOSE_WEIGHT</MenuItem>
                    <MenuItem value={'STAY_IN_SHAPE'}>STAY_IN_SHAPE</MenuItem>
                    <MenuItem value={'GAIN_MUSCLE_MASS'}>GAIN_MUSCLE_MASS</MenuItem>
                    <MenuItem value={'BUILD_MUSCLE'}>BUILD_MUSCLE</MenuItem>
                </Select>
            </FormControl>
            <TextField required fullWidth variant={'standard'} label={'Taille'} type={"number"} value={size} onChange={(event: any) => setSize(parseInt(event.target.value))}/>
            <TextField required fullWidth variant={'standard'} label={'Poids'} type={"number"} value={weight} onChange={(event: any) => setWeight(parseInt(event.target.value))}/>
            <TextField required fullWidth variant={'standard'} multiline rows={3} label={'Description'} value={description} onChange={(event: any) => setDescription(event.target.value)}/>
            <FormControl variant="standard" fullWidth required>
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
        </DialogContent>
        <DialogActions>
            <Button disabled={isLoading} type={"submit"} onClick={() => handleClose(false)}>
                Sauvegarder
            </Button>
        </DialogActions>
    </Dialog>
}