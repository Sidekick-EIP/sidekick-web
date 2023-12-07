import {ConfirmationNumberOutlined} from '@mui/icons-material';
import {Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import {useRouter} from 'next/router';
import React, {useState} from "react";
import axios from "axios";
import {Key} from "react-feather";
export default function Backoffice() {
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    return <div className="mt-32">
        backoffice
    </div>
}
