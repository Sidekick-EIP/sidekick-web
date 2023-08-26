"use client";
import React from 'react';
import Head from "next/head"
import Faqcomponent from "../components/Faqcomponent";

export default function Faq() {

    const questions = [
        {
          question: 'What is Sidekick?',
          answer:
            'Sidekick is an application that connects two strangers so that they can pull each other up and achieve their common goals, whether it\'s for sports and/or for a food plan. The aim is to improve the lives of our users, to make it easier for them to access sports and sports programs, and thus improve their health.',
        },
        {
          question: 'How can I get Sidekick?',
          answer: 'You can get Sidekick by downloading the app from the App Store (iOS) or Google Play Store (Android).',
        },
        {
          question: 'Is Sidekick free to use?',
          answer: 'Yes, Sidekick is free to use. However, there may be some premium features that require a subscription.',
        },
        {
          question: 'How can I contact Sidekick support?',
          answer: 'You can contact Sidekick support by sending an email to sidekick.eip@gmail.com.',
        },
      ];

    return (
        <div >
            <Head>
                <title>Sidekick</title>
            </Head>
            <Faqcomponent />
        </div>
    )
  }