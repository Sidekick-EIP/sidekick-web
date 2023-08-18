"use client";
// import React from 'react';
// import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, styled, Button, TextField, Box } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// const StyledPage = styled('div')`
//   background-color: #1a1a1a;
//   color: #ffffff;
//   padding: 2rem 0;
// `;

// const Section = styled(Container)`
//   padding: 2rem 0;
// `;

// const Gap = styled(Box)`
//   margin-top: 2rem;
// `;

// const Introduction = styled(Typography)`
//   color: #ffa97a;
//   margin-bottom: 2rem;
// `;

// const FAQ = () => {
//   const faqs = [
//     {
//       question: 'What is Sidekick?',
//       answer:
//         'Sidekick is an application that connects two strangers so that they can pull each other up and achieve their common goals, whether it\'s for sports and/or for a food plan. The aim is to improve the lives of our users, to make it easier for them to access sports and sports programs, and thus improve their health.',
//     },
//     {
//       question: 'How can I get Sidekick?',
//       answer:
//         'You can get Sidekick by downloading the app from the App Store (iOS) or Google Play Store (Android).',
//     },
//     {
//       question: 'Is Sidekick free to use?',
//       answer: 'Yes, Sidekick is free to use. However, there may be some premium features that require a subscription.',
//     },
//     {
//       question: 'How can I contact Sidekick support?',
//       answer: 'You can contact Sidekick support by sending an email to sidekick.eip@gmail.com.',
//     },
//   ];

//   return (
//     <>
//       <StyledPage>
//         <Section maxWidth="md">
//           <Introduction variant="h4" component="h1">
//             Frequently Asked Questions
//           </Introduction>
//           <Typography variant="body1" color="white" gutterBottom>
//             If you have any questions about Sidekick, take a look at our frequently asked questions below.
//           </Typography>
//           {faqs.map((faq, index) => (
//             <Gap key={index}>
//               <Accordion>
//                 <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: '#ffa97a' }} />}>
//                   <Typography variant="h6" component="h2" color="white">
//                     {faq.question}
//                   </Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <Typography variant="body1" color="textSecondary" style={{ color: 'white' }}>
//                     {faq.answer}
//                   </Typography>
//                 </AccordionDetails>
//               </Accordion>
//             </Gap>
//           ))}
//         </Section>
//       </StyledPage>
//     </>
//   );
// };

// export default FAQ;

// pages/faq.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

const Question = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Accordion
          onChange={() => setIsOpen(!isOpen)}
          style={{
            backgroundColor: '#FFAA83',
            borderRadius: '10px',
            cursor: 'pointer',
            margin: '1rem 0',
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            maxWidth: isOpen ? 'none' : '600px', // Initial height set to half of its actual size
          }}
        >
          <AccordionSummary>
            <Typography variant="h5" style={{ color: '#FFFFFF' }}>
              {question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: isOpen ? 'auto' : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography style={{ color: '#000000' }}>{answer}</Typography>
            </motion.div>
          </AccordionDetails>
        </Accordion>
      </motion.div>
    );
  };

const Faq = () => {

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
    <Container style={{ textAlign: 'center' }} >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h2" align="center" gutterBottom style={{ color: '#FFAA83' }}>
          FAQ
        </Typography>
        <Typography variant="body1" gutterBottom style={{ color: '#FFFFFF' }}>
          Hey ! welcome to the FAQ page where you can find answers to our most asked questions 
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ marginTop: '1rem' }}
      >
        {questions.map(({ question, answer }) => (
          <Question key={question} question={question} answer={answer} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        style={{ marginTop: '2rem' }}
      >
        <Typography variant="h5" style={{ color: '#FFAA83' }}>
          Contact Us
        </Typography>
        <Typography variant="body1" style={{ color: '#FFFFFF' }}>
          If you have any more questions or need further assistance, feel free to contact us at:
          <br />
          <strong>sidekick.eip@gmail.com</strong>
        </Typography>
      </motion.div>
    </Container>
  );
};

export default Faq;

