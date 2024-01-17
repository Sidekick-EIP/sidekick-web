import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, ListItemText, Menu, MenuItem, Select } from "@mui/material";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSnackBar } from "@/components/SnackBar";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { LoadingButton } from "@mui/lab";

interface UserProps {
  open: boolean;
  onClose: (isToReload: boolean) => void;
  user: any;
}

export default function User({ open, onClose, user }: UserProps) {
  const { data }: { data: Session | null } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const useAlert: any = useSnackBar();
  const [modifiedUser, setModifiedUser] = useState<any>(user);
  const [sports, setSports] = useState<any>([
      'RUNNING',
      'CYCLING',
      'SWIMMING',
      'WEIGHTLIFTING',
      'YOGA',
      'PILATES',
      'MARTIAL_ARTS',
      'DANCING',
      'HIKING',
      'ROCK_CLIMBING',
      'TENNIS',
      'BASKETBALL',
      'SOCCER',
      'VOLLEYBALL',
      'BASEBALL',
      'SKIING',
      'SNOWBOARDING',
      'SURFING',
      'GOLF',
      'ROWING',
      'CROSSFIT',
      'GYMNASTICS',
      'TRIATHLON',
      'RUGBY',
      'BOXING',
      'SKATING',
      'SQUASH',
      'BADMINTON',
      'HORSE_RIDING',
      'TABLE_TENNIS'
  ]);
  const [genders, setGenders] = useState<any>([
    "MALE",
    "FEMALE",
    "PREFER_NOT_TO_SAY"
  ]);
  const [levels, setLevels] = useState<any>([
    "BEGINNER",
    "MEDIUM",
    "IRREGULAR_TRAINING",
    "ADVANCED",
  ]);
  const [goals, setGoals] = useState<any>([
    "LOSE_WEIGHT",
    "STAY_IN_SHAPE",
    "GAIN_MUSCLE_MASS",
    "BUILD_MUSCLE",
  ]);

  useEffect(() => {
    setModifiedUser(user)
  }, [user]);

  async function handleUpdate() {
    try {
      const stripped = {
        firstname: modifiedUser?.firstname,
        lastname: modifiedUser?.lastname,
        email: modifiedUser?.email,
        description: modifiedUser?.description,
        location: modifiedUser?.location,
        weight: modifiedUser?.weight,
        goal_weight: modifiedUser?.goal_weight,
        gender: modifiedUser?.gender,
        level: modifiedUser?.level,
        activities: modifiedUser?.activities,
        goal: modifiedUser?.goal,
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user_admin/update?user_id=${user.userId}`, {
        ...stripped
      }, {
        headers: {
          Authorization: `Bearer ${data?.user.access_token}`
        }
      });
      setIsLoading(false)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useAlert("User updated with success", "success");
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
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/nutrition/${user}`, {
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
    {!isLoading && user !== null ? <DialogTitle>
      {user.name}
    </DialogTitle> : <div className="flex justify-center items-center p-10">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-950"></div>
    </div>}
    {modifiedUser !== null && <><DialogContent>
      {/* firstname?: string;
      lastname?: string;
      description?: string;
      size?: number;
      location?: string;
      weight?: number;
      goal_weight?: number;
      gender?: string;
      level?: string;
      activities?: string[];
      goal?: string; */}
      <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
        <TextField
          value={modifiedUser?.firstname}
          onChange={(e: any) => {
            setModifiedUser((prevUser: any) => ({ ...prevUser, firstname: e.target.value }))
          }}
          fullWidth
          type="string"
          label={"First Name"}
        />
      </Grid>
      <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
        <TextField
          value={modifiedUser?.lastname}
          onChange={(e: any) => {
            setModifiedUser((prevUser: any) => ({ ...prevUser, lastname: e.target.value }))
          }}
          fullWidth
          type="string"
          label={"Last name"}
        />
      </Grid>
      <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
        <TextField
          value={modifiedUser?.user?.email}
          onChange={(e: any) => {
            setModifiedUser((prevUser: any) => ({ ...prevUser, email: e.target.value }))
          }}
          fullWidth
          type="string"
          label={"Email"}
        />
      </Grid>
      <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
        <TextField
          value={modifiedUser?.description}
          onChange={(e: any) => {
            setModifiedUser((prevUser: any) => ({ ...prevUser, description: e.target.value }))
          }}
          fullWidth
          type="string"
          label={"Description"}
        />
      </Grid>
      <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
        <TextField
          value={modifiedUser?.location}
          onChange={(e: any) => {
            setModifiedUser((prevUser: any) => ({ ...prevUser, location: e.target.value }))
          }}
          fullWidth
          type="string"
          label={"Location"}
        />
      </Grid>
      <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
        <TextField
          value={modifiedUser?.weight}
          onChange={(e: any) => {
            setModifiedUser((prevUser: any) => ({ ...prevUser, weight: e.target.value }))
          }}
          fullWidth
          type="string"
          label={"Weight"}
        />
      </Grid>
      <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
        <TextField
          value={modifiedUser?.weight}
          onChange={(e: any) => {
            setModifiedUser((prevUser: any) => ({ ...prevUser, goal_weight: e.target.value }))
          }}
          fullWidth
          type="string"
          label={"Goal Weight"}
        />
      </Grid>
      <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
        <Select multiple fullWidth value={modifiedUser?.activities} onChange={(e: any) => {
          setModifiedUser((prevUser: any) => ({ ...prevUser, activities: e.target.value }))
        }}>
          {sports.map((sport: any) => (
            <MenuItem key={sport} value={sport}>
              <ListItemText primary={sport} />
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
        <Select fullWidth value={modifiedUser?.gender} onChange={(e: any) => {
          setModifiedUser((prevUser: any) => ({ ...prevUser, gender: e.target.value }))
        }}>
          {genders.map((sport: any) => (
            <MenuItem key={sport} value={sport}>
              <ListItemText primary={sport} />
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
        <Select fullWidth value={modifiedUser?.goal} onChange={(e: any) => {
          setModifiedUser((prevUser: any) => ({ ...prevUser, goal: e.target.value }))
        }}>
          {goals.map((sport: any) => (
            <MenuItem key={sport} value={sport}>
              <ListItemText primary={sport} />
            </MenuItem>
          ))}
        </Select>
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