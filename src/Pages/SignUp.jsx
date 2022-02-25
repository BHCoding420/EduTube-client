import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Image,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
//import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";

const SignUp = () => {
  const [UserData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
    pic: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setpreview] = useState("");

  const [id, setid] = useState("");
  const [email, setemail] = useState("");

  const toast = useToast();

  const [file, setfile] = useState(null);
  var reader = new FileReader();

  const sendEmail = async (id, email) => {
    const res = await axios.get(
      `${process.env.REACT_APP_API}users/${id}/${email}`
    );
    console.log(res.data);
    if (res.data.success) {
      toast({
        title: "Resent email",
        description: `Email sent at ${email} ,click the link in the mail to verify your account of id ${id}`,
        status: "success",
        duration: 900000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error Occured",
        description: `Please try again`,
        status: "success",
        duration: 900000,
        isClosable: true,
      });
    }
  };
  const handleChange = (e) => {
    setUserData({ ...UserData, [e.target.name]: e.target.value });
  };

  const handlePic = (e) => {
    const pic = e.target.files[0];
    setfile(pic);

    reader.onload = function () {
      setpreview(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);

    //setUserData({ ...UserData, pic: pic });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newUserData = UserData;
    //cloudinary stuff
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "bucvnm5ghbjhbj");
      await fetch("https://api.cloudinary.com/v1_1/dtgghkfz3/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.secure_url);
          setUserData({ ...UserData, pic: res.secure_url });
          newUserData.pic = res.secure_url;
        });
    }
    //cloudinary stuff
    console.log(newUserData);
    const dat = await axios
      .post(`${process.env.REACT_APP_API}users`, newUserData)
      .then((res) => {
        console.log(res.data);
        toast({
          title: "Account created.",
          description: `Email sent at ${res.data.email} ,click the link in the mail to verify your account`,
          status: "success",
          duration: 900000,
          isClosable: true,
        });
        setid(res.data._id);
        setemail(res.data.email);
      })
      .catch((err) => console.log(err));
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
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to start learning ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="lastName">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="userName"
                value={UserData.userName}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={UserData.email}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={UserData.password}
                  onChange={(e) => handleChange(e)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? (
                      <i className="fas fa-eye"></i>
                    ) : (
                      <i className="fas fa-eye-slash"></i>
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Profile picture</FormLabel>
              <input type="file" onChange={handlePic} />
              {preview && (
                <Image boxSize="150px" objectFit="cover" src={preview} />
              )}
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                onClick={handleSubmit}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link to="/login" color={"blue.400"}>
                  Login
                </Link>
              </Text>
              {id && email && (
                <Button color={"blue.800"} onClick={() => sendEmail(id, email)}>
                  Resend email
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;
