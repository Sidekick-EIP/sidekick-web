import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, ListItemText } from "@mui/material";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSnackBar } from "@/components/SnackBar";
import axios from "axios";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LoadingButton } from "@mui/lab";

enum Period {
	BREAKFAST = "Breakfast",
	LUNCH = "Lunch",
	DINNER = "Dinner",
	SNACKS = "Snacks",
}

interface NutritionProps {
	open: boolean;
	onClose: (isToReload: boolean) => void;
	idNutrition: number;
}

export default function Nutrition({ open, onClose, idNutrition }: NutritionProps) {
	const { data }: { data: Session | null } = useSession();
	const [nutrition, setNutrition] = useState<any | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const useAlert: any = useSnackBar();

	useEffect(() => {
		if (data) {
			if (idNutrition === 0) return;
			(async () => {
				try {
					setIsLoading(true)
					const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/nutrition/${idNutrition}`, {
						headers: {
							Authorization: `Bearer ${data?.user.access_token}`
						}
					});
					console.log(response.data);
					setNutrition(response.data);
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
	}, [data, idNutrition]);

	async function handleUpdate() {
		try {
			setIsLoading(true)
			await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/nutrition/${idNutrition}`, {
				"date": nutrition.date,
				"carbs": nutrition.carbs,
				"fat": nutrition.fat,
				"protein": nutrition.protein,
				"calories": nutrition.calories,
				"weight": nutrition.weight,
			}, {
				headers: {
					Authorization: `Bearer ${data?.user.access_token}`
				}
			});
			setIsLoading(false)
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useAlert("Nutrition updated with success", "success");
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
			await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/nutrition/${idNutrition}`, {
				headers: {
					Authorization: `Bearer ${data?.user.access_token}`
				}
			});
			setIsLoading(false)
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useAlert("Nutrition deleted with success", "success");
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
		{!isLoading && nutrition !== null ? <DialogTitle>
			{nutrition.name}
		</DialogTitle> : <div className="flex justify-center items-center p-10">
			<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-950"></div>
		</div>}
		{nutrition !== null && <><DialogContent>
			<Grid container item xs={12} sx={{ mb: 2, mt: 1 }}>
				<TextField
					value={dayjs(nutrition.date).format('YYYY-MM-DD')}
					onChange={(e: any) => setNutrition((prevNutrition: any) => ({ ...prevNutrition, date: e.target.value }))}
					fullWidth
					type="date"
					label={'Date'}
				/>
			</Grid>
			<Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
				<TextField
					value={nutrition.calories}
					onChange={(e: any) => setNutrition((prevNutrition: any) => ({ ...prevNutrition, calories: parseInt(e.target.value) }))}
					fullWidth
					type="number"
					label={'Calories'}
				/>
			</Grid>
			<Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
				<TextField
					value={nutrition.weight}
					onChange={(e: any) => setNutrition((prevNutrition: any) => ({ ...prevNutrition, weight: parseInt(e.target.value) }))}
					fullWidth
					type="number"
					label={'Poids'}
				/>
			</Grid>
			<Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
				<TextField
					value={nutrition.fat}
					onChange={(e: any) => setNutrition((prevNutrition: any) => ({ ...prevNutrition, fat: parseInt(e.target.value) }))}
					fullWidth
					type="number"
					label={'Lipides'}
				/>
			</Grid>
			<Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
				<TextField
					value={nutrition.protein}
					onChange={(e: any) => setNutrition((prevNutrition: any) => ({ ...prevNutrition, protein: parseInt(e.target.value) }))}
					fullWidth
					type="number"
					label={'Protéines'}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					value={nutrition.carbs}
					onChange={(e: any) => setNutrition((prevNutrition: any) => ({ ...prevNutrition, carbs: parseInt(e.target.value) }))}
					fullWidth
					type="number"
					label={'Glucides'}
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