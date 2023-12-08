import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, ListItemText } from "@mui/material";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSnackBar } from "@/components/SnackBar";
import axios from "axios";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LoadingButton } from "@mui/lab";

interface WorkoutProps {
	open: boolean;
	onClose: (isToReload: boolean) => void;
	idWorkout: number;
}

export default function Workout({ open, onClose, idWorkout }: WorkoutProps) {
	const { data }: { data: Session | null } = useSession();
	const [workout, setWorkout] = useState<any | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [content, setContent] = useState<string>("");
	const [body, setBody] = useState({});
	const useAlert: any = useSnackBar();

	useEffect(() => {
		if (data) {
			if (idWorkout === 0) return;
			(async () => {
				try {
					setIsLoading(true)
					const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/workouts/${idWorkout}`, {
						headers: {
							Authorization: `Bearer ${data?.user.access_token}`
						}
					});
					console.log(response.data);
					setWorkout(response.data);
					setIsLoading(false)
				} catch (err: any) {
					setIsLoading(false)
					if (err.response) {
						// eslint-disable-next-line react-hooks/rules-of-hooks
						useAlert(err.response.data.message, "error");
					} else {
						// eslint-disable-next-line react-hooks/rules-of-hooks
						useAlert(err.message, "error");
					}
				}
			})();
		}
	}, [data, idWorkout]);

	async function handleUpdate(body: any) {
		try {
			console.log(workout);
			setIsLoading(true)
			await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/workouts/update/${idWorkout}`, {
				"duration": workout.duration,
				"date": workout.date,
				"exerciseId": workout.exerciseId
			}, {
				headers: {
					Authorization: `Bearer ${data?.user.access_token}`
				}
			});
			setIsLoading(false)
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useAlert("Workout updated with success", "success");
			onClose(true);
		} catch (err: any) {
			setIsLoading(false)
			if (err.response) {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				useAlert(err.response.data.message, "error");
			} else {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				useAlert(err.message, "error");
			}
		}
	}

	async function handleDelete() {
		try {
			setIsLoading(true)
			await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/workouts/remove/${idWorkout}`, {
				headers: {
					Authorization: `Bearer ${data?.user.access_token}`
				}
			});
			setIsLoading(false)
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useAlert("Workout deleted with success", "success");
			onClose(true);
		} catch (err: any) {
			setIsLoading(false)
			if (err.response) {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				useAlert(err.response.data.message, "error");
			} else {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				useAlert(err.message, "error");
			}
		}
	}

	return <Dialog open={open} onClose={() => onClose(false)} fullWidth maxWidth={'sm'}>
		{!isLoading && workout !== null ? <DialogTitle>
			{workout.exercise.name}
		</DialogTitle> : <div className="flex justify-center items-center p-10">
			<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-950"></div>
		</div>}
		{workout !== null && <><DialogContent>
			<Grid container item xs={12} sx={{ mb: 2, mt: 1 }}>
				<TextField
					value={dayjs(workout.date).format('YYYY-MM-DD')}
					onChange={(e: any) => setWorkout((prevWorkout: any) => ({...prevWorkout, date: e.target.value }))}
					fullWidth
					type="date"
					label={'Date'}
				/>
			</Grid>
			<Grid item xs={6} sx={{ mb: 2 }} >
				<TextField
					value={workout.exerciseId}
					onChange={(e: any) => setWorkout((prevWorkout: any) => ({ ...prevWorkout, exerciseId: parseInt(e.target.value) }))}
					fullWidth
					type="number"
					label={'Exercise ID'}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					value={workout.duration}
					onChange={(e: any) => setWorkout((prevWorkout: any) => ({ ...prevWorkout, duration: parseInt(e.target.value) }))}
					fullWidth
					type="number"
					label={'Durée'}
				/>
			</Grid>
		</DialogContent>
			<DialogActions>
				<LoadingButton loading={isLoading} onClick={handleUpdate}>
					Update
				</LoadingButton>
				<LoadingButton loading={isLoading} onClick={handleDelete}>
					Delete
				</LoadingButton>
			</DialogActions>
		</>}
	</Dialog>
}