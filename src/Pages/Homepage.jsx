import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid, GridItem, HStack, Skeleton } from "@chakra-ui/react";
import Header from "../layout/Header";
import { Videos } from "./Videos/Videos";

const Homepage = () => {
  const [videos, setvideos] = useState([]);

  useEffect(() => {
    const data = axios
      .get(`${process.env.REACT_APP_API}tutorials`)
      .then((response) => {
        console.log(response);
        setvideos(response.data.tutorials);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box w="100%" h="100%">
      <Header videos={videos} setvideos={setvideos} />

      {videos ? (
        <Grid
          p="6"
          spacing="200px"
          w="100%"
          templateColumns="repeat(4, 1fr)"
          gap={6}
        >
          {videos.map((v) => {
            return (
              <GridItem key={v._id} w="100%">
                <Videos video={v} />
              </GridItem>
            );
          })}
        </Grid>
      ) : (
        <Box>WAITING</Box>
      )}
    </Box>
  );
};

export default Homepage;
