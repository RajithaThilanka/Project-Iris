import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import Navbar from "../Appbar/Navbar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import "./AboutUs.css";

const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

const AboutUs = () => {
  return (
    <>
      <Container className="containerstyle">
        <Grid
          style={{
            backgroundImage: `url(${serverPublic + "background2.png"})`,
            opacity: 1,
            padding: "20px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
          }}
        >
          <Grid>
            <Box className="aboutusheader">
              <Typography variant="h2" align="center" gutterBottom>
                About Us
              </Typography>
            </Box>
          </Grid>
          <Typography variant="body1" align="justify" gutterBottom>
            Welcome to Iris, the ultimate AI-powered matching and dating web
            application. We're here to revolutionize your dating experience by
            harnessing the power of artificial intelligence to help you find
            your perfect match.
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            At Iris, we understand that the modern dating landscape can be
            overwhelming and time-consuming. That's why we've developed a
            state-of-the-art platform that utilizes advanced algorithms and
            intelligent matching systems to simplify the process and maximize
            your chances of finding genuine connections.
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            Our mission is to create a space where meaningful relationships can
            blossom. We believe that compatibility goes beyond mere
            surface-level attraction, so we delve deep into your personality
            traits, interests, and values. By leveraging the latest AI
            technologies, we analyze vast amounts of data to provide you with
            highly compatible matches that align with your preferences.
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            Privacy and security are at the core of Iris. We prioritize the
            confidentiality of your personal information and employ robust
            measures to ensure a safe dating environment. You can explore our
            platform with confidence, knowing that your data is protected and
            your interactions are secure.
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            Diversity and inclusivity are fundamental values we uphold at Iris.
            We celebrate individuals from all backgrounds, cultures, and
            orientations. Our platform is a welcoming space where everyone is
            embraced, respected, and given the opportunity to connect with
            like-minded individuals who share their interests and aspirations.
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            We're committed to continuous improvement, and our AI algorithms
            evolve alongside your feedback and interactions. The more you use
            Iris, the smarter it becomes in understanding your preferences and
            refining its recommendations. We strive to deliver the most accurate
            and relevant matches, enhancing your chances of finding a deep and
            meaningful connection.
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            Discover a range of features designed to make your dating journey
            seamless and enjoyable. From advanced search filters to personalized
            recommendations, we offer tools that empower you to explore and
            connect with potential matches effortlessly. Engage in meaningful
            conversations, break the ice with fun virtual activities, and
            experience the thrill of forming genuine connections.
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            At Iris, our dedicated team is here to support you every step of the
            way. We provide exceptional customer service, ready to assist you
            with any inquiries or concerns you may have. Your satisfaction is
            our top priority, and we're committed to making your experience on
            our platform extraordinary.
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            Join Iris today and embark on an exciting adventure of love,
            companionship, and meaningful connections. Let our AI technology
            guide you on a journey towards discovering that special someone.
            With Iris, finding love has never been more intelligent or
            rewarding.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body2" align="justify">
                Our mission at Iris is to revolutionize the dating experience
                through innovative AI technology, fostering genuine connections
                and empowering individuals to find meaningful relationships.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Our Vision
              </Typography>
              <Typography variant="body2" align="justify">
                Our vision at Iris is to redefine the dating landscape by
                leveraging AI technology, enabling individuals to forge genuine
                connections and find love in a seamless and meaningful way.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="photosstyle">
          <Stack direction="row" spacing={2} className="stackstyle" container>
            <Stack direction="column" spacing={2}>
              <Box className="boxstyle">
                <img
                  src={serverPublic + "1679772425904user74.jpeg"}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    borderRadius: "2%",
                  }}
                />
              </Box>
              <Box className="boxstyle">
                <Typography variant="h6" align="center" className="nameStyle">
                  Dinitha kawshalya
                </Typography>
              </Box>
            </Stack>
            <Stack direction="column" spacing={2}>
              <Box className="boxstyle">
                <img
                  src={serverPublic + "1679772425904user74.jpeg"}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    borderRadius: "2%",
                  }}
                />
              </Box>
              <Box className="boxstyle">
                <Typography variant="h6" align="center" className="nameStyle">
                  Asanka Madushan
                </Typography>
              </Box>
            </Stack>
            <Stack direction="column" spacing={2}>
              <Box className="boxstyle">
                <img
                  src={serverPublic + "1679772425904user74.jpeg"}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    borderRadius: "2%",
                  }}
                />
              </Box>
              <Box className="boxstyle">
                <Typography variant="h6" align="center" className="nameStyle">
                  Rajitha Thilanka
                </Typography>
              </Box>
            </Stack>
            <Stack direction="column" spacing={2}>
              <Box className="boxstyle">
                <img
                  src={serverPublic + "1679772425904user74.jpeg"}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    borderRadius: "2%",
                  }}
                />
              </Box>
              <Box className="boxstyle">
                <Typography variant="h6" align="center" className="nameStyle">
                  Rusith Liyanage
                </Typography>
              </Box>
            </Stack>
            <Stack direction="column" spacing={2}>
              <Box className="boxstyle">
                <img
                  src={serverPublic + "1679772425904user74.jpeg"}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    borderRadius: "2%",
                  }}
                />
              </Box>
              <Box className="boxstyle">
                <Typography variant="h6" align="center" className="nameStyle">
                  Kisal Perera
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Grid>
      </Container>
    </>
  );
};

export default AboutUs;
