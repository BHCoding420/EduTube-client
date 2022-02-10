import React from "react";

import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Videos = ({ video }) => {
  let vid_link = `view/${video._id}`;
  return (
    <Box
      maxW={"400px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"md"}
      p={6}
      overflow={"hidden"}
    >
      <Link to={vid_link}>
        <Box
          h={"210px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <Image h={"100%"} w={"100%"} src={video.thumbnail} layout={"fill"} />
        </Box>
        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
            mt={6}
          >
            {video.file_type.split("/")[0]}
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"l"}
            minHeight="50px"
            fontFamily={"body"}
          >
            {video.title}
          </Heading>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Avatar src={video.creator.pic} alt={"Author"} />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{video.creator.userName}</Text>
            <Text color={"gray.500"}>{video.UploadedAt}</Text>
          </Stack>
        </Stack>
      </Link>
    </Box>
  );
};
