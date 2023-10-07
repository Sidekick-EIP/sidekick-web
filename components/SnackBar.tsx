"use client";
import {Alert, AlertColor, Snackbar} from '@mui/material';
import React from "react";

const SnackBarContext: React.Context<(message: (string | undefined), severity: (AlertColor | undefined)) => void> = React.createContext((message: string = 'Une erreur s\'est produite', severity: AlertColor | undefined) => {});

export default function SnackBar({children}: {
    children: React.ReactNode
}): JSX.Element {
    const [message, setMessage] = React.useState<string>('');
    const [severity, setSeverity] = React.useState<AlertColor | undefined>(undefined);
    const [open, setOpen] = React.useState<boolean>(false);

    const handleSnackBar = React.useCallback((message: string = 'Une erreur s\'est produite', severity: AlertColor | undefined = "error") => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    }, []);

    function handleClose() {
        setOpen(false);
        setMessage('');
        setSeverity(undefined);
    }

    return <SnackBarContext.Provider value={handleSnackBar}>
        {children}
        <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    </SnackBarContext.Provider>
}

export const useSnackBar = () => React.useContext(SnackBarContext);