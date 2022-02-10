import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
  Spacer,
  Button,
  Avatar,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Image,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, log_out } from "../services/getCurrentUser";
import logo from "../logo.png";
import Addtutorial from "./AddTutorial/Addtutorial";

const Header = ({ videos, setvideos }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(getCurrentUser());
    console.log("niohodi");
    console.log(videos);
    //console.log(getCurrentUser());
  }, []);
  const history = useNavigate();
  return (
    <Flex style={{ cursor: "pointer" }} p={2} display="flex" bg="blue.300">
      <Box ml={30} onClick={() => history("/")}>
        <Image h="50px" src={logo}></Image>
      </Box>
      <Spacer />
      <Box>
        <InputGroup>
          <InputLeftAddon children="Search" />
          <Input width="500px" placeholder="enter search here..." />
        </InputGroup>
      </Box>
      <Spacer />
      {user ? (
        <Box display="flex">
          <Addtutorial videos={videos} setvideos={setvideos} />

          <Menu>
            <MenuButton as={Button} colorScheme="rgb(0,0,0,0)">
              <Avatar name={user.username} src={user.pic} />
            </MenuButton>

            <MenuList>
              <MenuItem>{user.username}</MenuItem>
              <MenuItem onClick={log_out}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      ) : (
        <Box display="flex">
          <Link to="register">
            <Button colorScheme="teal" variant="ghost">
              Sign Up
            </Button>
          </Link>
          <Link to="login">
            <Button colorScheme="teal" variant="ghost">
              Log in
            </Button>
          </Link>
        </Box>
      )}
    </Flex>
  );
};

export default Header;
