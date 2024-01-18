import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, ListItemText, Paper} from "@mui/material";
import {Session} from "next-auth";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {useSnackBar} from "@/components/SnackBar";
import axios from "axios";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import {LoadingButton} from "@mui/lab";
import Box from "@mui/material/Box";

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
            handleClose(true);
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
            handleClose(true);
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

    function handleClose(isToReload: boolean) {
        setContent("");
        onClose(isToReload);
    }

    return <Dialog open={open} onClose={() => handleClose(false)} fullWidth maxWidth={'md'}>
        {!isLoading && dataSupports !== null ? <DialogTitle>
            {dataSupports.title} - {dataSupports.user.email}
        </DialogTitle> : <div className="flex justify-center items-center p-10">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-950"></div>
        </div>}
        {dataSupports !== null && <><DialogContent>
            <Grid container item xs={12} sx={{mt: 0}} spacing={1}>
                {dataSupports.responses.map((elem: any, index: any) => <Grid container item xs={12}
                                                                             justifyContent={'center'}>
                    <Grid item xs={12}>
                        <Paper variant={'outlined'} sx={{p: 1}}>
                            <Grid item xs={12} spacing={1}>

                                {/* <Grid item xs={6}>
                                                <Typography variant={'caption'}>{elem.user.email}</Typography>
                                            </Grid> */}
                                <Grid item xs={12}>
                                    <Typography>{elem.content}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant={'caption'}
                                                fontStyle={'italic'}>{dayjs(elem.createdAt).toString()}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>)}
            </Grid>
            <Grid item xs={12} sx={{mt: 3}}>
                <TextField value={content} onChange={(e: any) => setContent(e.target.value)} fullWidth multiline
                           rows={4} label={'Send a message at the customer'}/>
            </Grid>
        </DialogContent>
            <DialogActions sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1}}>
                <Typography>
                    {dataSupports.status}
                </Typography>
                <Box>
                    <LoadingButton disabled={dataSupports.status === "CLOSED"} loading={isLoading}
                                   onClick={handleCloseTickets}>
                        Close ticket
                    </LoadingButton>
                    <LoadingButton variant={'outlined'} disabled={dataSupports.status === "CLOSED"} loading={isLoading}
                                   onClick={handleRespond}>
                        SEND
                    </LoadingButton>
                </Box>
            </DialogActions>
        </>}
    </Dialog>
}