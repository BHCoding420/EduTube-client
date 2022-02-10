import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";

const LogIn = () => {
  const [UserData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error, seterror] = useState("");

  const handleChange = (e) => {
    setUserData({ ...UserData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror("");
    console.log("sub,ie");
    console.log(UserData);
    const dat = await axios
      .post("http://localhost:5000/users/login", UserData)
      .then((res) => {
        console.log(res.data);
        window.localStorage.setItem("token", JSON.stringify(res.data));
        window.location = "/";
      })
      .catch((err) => {
        console.log(err.response.data.error);
        seterror(err.response.data.error);
      });
    console.log(dat);
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          {/*<Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
  </Text>*/}
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <p>{error}</p>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={UserData.email}
                name="email"
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={UserData.password}
                name="password"
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSubmit}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LogIn;
