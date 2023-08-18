"use client";
import React from 'react';
import { Container, Typography, Grid, Card, CardContent, ButtonGroup, Button, Stack } from '@mui/material';
import Image from 'next/image'
import Link from 'next/link';



export default function Home() {

  const personData = [
    { name: 'Gregoire D', info: 'Personnaly I just like lifting a lot!  Im the big guy of the team :D' },
    { name: 'Ilian B', info: 'dont know if im the CEO by choice or by default, but im trying to direct the boat in the right direction the best I can for sure !' },
    { name: 'Alizee S', info: 'Im the artist of the group !' },
  ];


  return (
    <div >
      <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={6}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h1" color="#FFAA83" gutterBottom>
            The Project
          </Typography>
          <Typography variant="body1" align="center">
            <p>Sidekick is an application that connects two strangers so that they can pull each other up and achieve their common goals, whether it's for sports and/or for a food plan.</p>
            <p>The aim is to improve the lives of our users, to make it easier for them to access sports and sports programs, and thus improve their health.</p>
            <p>With us find your sidekick for your sport adventure!</p>
          </Typography>
          
          <div>
            <ButtonGroup variant="text" aria-label="text button group" style={{ alignItems: "center" }}>
              <Link href="/app-release.apk" passHref>
                <Button color="secondary" component="a" download>
                  Get for Android
                </Button>
              </Link>
              <Link href="/app-release.ipa" passHref>
                <Button color="secondary" component="a" download>
                  Get for iOS
                </Button>
              </Link>
            </ButtonGroup>
          </div>
        </Container>

        <Container maxWidth="md">
          <Typography variant="h4" component="h1" color="#FFAA83" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1" align="center"  color="#FFFFFF" gutterBottom>
          We are a team of French computer science students, passionate about new technologies, but also, as you can imagine, about sports! We decided to found Sidekick, our own company in order to combine our passions. For the moment, we are all around the world, but we are all working together on our project!
          </Typography>
          <Grid container spacing={2}>
            {personData.map((person, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {person.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {person.info}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Container maxWidth="md">
          <Typography variant="h4" component="h1" color="#FFAA83" gutterBottom>
            Timeline
          </Typography>
          <Image src="/timetable.png" alt="Timetable of the project" width={1011} height={412} />
        </Container>

        <Container maxWidth="md" >
          <Typography variant="h4" component="h1" color="#FFAA83" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" align="center">
            <h3 className="m-0">
              Some Questions ? Send an email at : sidekick.eip@gmail.com !
            </h3>
          </Typography>
        </Container>

      </Stack>
    </div>
  );
}
