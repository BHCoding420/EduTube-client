import React, { useState, useEffect } from "react";
import { Box, Tag, TagLabel, Grid, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../layout/Header";
const ViewVid = () => {
  const { fileId } = useParams();
  const [file, setfile] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/tutorials/view/${fileId}`)
      .then((res) => {
        console.log(res);
        setfile(res.data.tutorials[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box>
      <Header />
      {file && (
        <Box w={"50%"} mx="auto" bg="red.200">
          <video
            id="my-video"
            class="video-js"
            controls
            preload="auto"
            width="100%"
            height="104"
            poster="MY_VIDEO_POSTER.jpg"
            data-setup="{}"
          >
            <source src={file.file} type="video/mp4" />

            <p class="vjs-no-js">
              To view this video please enable JavaScript, and consider
              upgrading to a web browser that
              <a
                href="https://videojs.com/html5-video-support/"
                target="_blank"
              >
                supports HTML5 video
              </a>
            </p>
          </video>
          <Grid w="100%" templateColumns="repeat(8, 1fr)" gap={3}>
            {file.tags.map((tag) => {
              return (
                <Box
                  style={{ textAlign: "center" }}
                  borderRadius="20px"
                  m={1}
                  p={2}
                  key={tag}
                >
                  <Tag
                    size="lg"
                    key="lg"
                    borderRadius="full"
                    variant="solid"
                    colorScheme="blue"
                    value={tag}
                  >
                    <TagLabel>{tag}</TagLabel>
                  </Tag>
                </Box>
              );
            })}
          </Grid>
          <Text fontSize={"xl"} color={"blue.600"}>
            Description:
          </Text>
          <Text fontSize={"lg"} color={"blue.600"}>
            {file.description}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ViewVid;
