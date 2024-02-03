import {Session} from "next-auth";
import {useSession} from "next-auth/react";
import React, {useEffect, useState} from "react";
import {useSnackBar} from "@/components/SnackBar";
import {useRouter} from "next/router";
import axios from "axios";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { MoreVertical } from "react-feather";
import {Grid, Paper} from "@mui/material";
import dayjs from "dayjs";

export default function Tickets() {
    const {data}: { data: Session | null } = useSession();
    const [dataSupports, setDataSupports] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isToReload, setIsToReload] = useState<boolean>(true);
    const useAlert: any = useSnackBar();
    const router = useRouter();

    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    useEffect(() => {
        if (data) {
            if (!isToReload)
                return;
            (async () => {
                try {
                    setIsLoading(true);
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tickets/me`, {
                        headers: {
                            Authorization: `Bearer ${data?.user.access_token}`
                        }
                    });
                    console.log(response.data);
                    setDataSupports(response.data);
                    setIsLoading(false)
                    setIsToReload(false)
                } catch (err: any) {
                    setIsLoading(false)
                    setIsToReload(false)
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
    }, [data, isToReload]);

    return <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md mt-32">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-orange-950">Vos tickets</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-orange-400 sm:text-xl">Voici tout vos ticket en
            cours.</p>
        {dataSupports.length === 0 ? <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <Typography variant={'h6'}>Vous n'avez aucun ticket.</Typography>
        </div> : <div>
            {dataSupports.map((support: any, index: number) => (
                <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                    <AccordionSummary
                        expandIcon={<MoreVertical/>}
                    >
                        <Typography sx={{width: '33%', flexShrink: 0}}>
                            {support.title} - <span
                            style={{fontStyle: 'italic', fontSize: 11}}>{new Date(support.createdAt).getFullYear() + '/' + (new Date(support.createdAt).getMonth() + 1) + '/' + new Date(support.createdAt).getDate() + ' ' + new Date(support.createdAt).getHours() + ':' + new Date(support.createdAt).getMinutes() + ':' + new Date(support.createdAt).getSeconds()}</span>
                        </Typography>
                        <Typography sx={{color: 'text.secondary'}}>{support.status}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container item xs={12} sx={{mt: 0}} spacing={1}>
                            {support.responses && support.responses.length && support.responses.map((elem: any, index: any) => <Grid key={index + '-message'} container
                                                                                    item xs={12}
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
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>}
    </div>
}