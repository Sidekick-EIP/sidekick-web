"use client";
import React, {Suspense} from 'react';

import Main from "../components/Main";

export default function Home() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <Main/>
            </div>
        </Suspense>
    );
}
