import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, ListItemText} from "@mui/material";
import {Session} from "next-auth";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {useSnackBar} from "@/components/SnackBar";
import axios from "axios";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import {LoadingButton} from "@mui/lab";

interface DialogSupportProps {
    open: boolean;
    onClose: (isToReload: boolean) => void;
    idSupport: number;
}

export default function DialogSupport({open, onClose, idSupport}: DialogSupportProps) {
    const {data}: { data: Session | null } = useSession();
    const [dataSupports, setDataSupports] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState<string>("");
    const useAlert: any = useSnackBar();

    useEffect(() => {
        if (data) {
            if (idSupport === 0) return;
            (async () => {
                try {
                    setIsLoading(true)
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tickets/${idSupport}`, {
                        headers: {
                            Authorization: `Bearer ${data?.user.access_token}`
                        }
                    });
                    console.log(response.data);
                    setDataSupports(response.data);
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
    }, [data, idSupport]);

    async function handleCloseTickets() {
        try {
            setIsLoading(true)
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tickets/${idSupport}/close`, {
                id: idSupport
            }, {
                headers: {
                    Authorization: `Bearer ${data?.user.access_token}`
                }
            });
            setIsLoading(false)
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useAlert("Ticket close with success", "success");
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

    async function handleRespond() {
        try {
            setIsLoading(true)
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tickets/${idSupport.toString()}/admin/answer`, {
                answer: content
            }, {
                headers: {
                    Authorization: `Bearer ${data?.user.access_token}`
                }
            });
            setIsLoading(false)
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useAlert("Ticket respond with success", "success");
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
        {!isLoading && dataSupports !== null ? <DialogTitle>
            {dataSupports.title}
        </DialogTitle> : <div className="flex justify-center items-center p-10">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-950"></div>
        </div>}
        {dataSupports !== null && <><DialogContent>
            <Grid container item xs={12} sx={{mt: 0}} spacing={1}>
                <Grid item xs={6}>
                    <ListItemText primary={"Date d'envoye"}
                                  secondary={dayjs(dataSupports.responses[0].createdAt).toString()}/>
                </Grid>
                <Grid item xs={6}>
                    <ListItemText primary={"Utilisateurs"} secondary={dataSupports.responses[0].user.email}/>
                </Grid>
                <Grid item xs={12}>
                    <ListItemText primary={"Messages"} secondary={dataSupports.responses[0].content}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={content} onChange={(e: any) => setContent(e.target.value)} fullWidth multiline
                               rows={4} label={'Réponse'}/>
                </Grid>
            </Grid>
        </DialogContent>
            <DialogActions>
                <LoadingButton loading={isLoading} onClick={handleCloseTickets}>
                    Close ticket
                </LoadingButton>
                <LoadingButton loading={isLoading} onClick={handleRespond}>
                    SEND
                </LoadingButton>
            </DialogActions>
        </>}
    </Dialog>
}