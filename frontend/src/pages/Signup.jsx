
import React, { useState } from "react";
import axios from "axios";
import {
  Flex,
  Grid,
  Heading,
  Img,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignup = async () => {
    const data = {
      username,
      avatar,
      email,
      password,
    };

    try {
      let res = await axios.post(
        "https://blogs-gvrb.onrender.com/api/register",
        data
      );
      console.log(res);

      toast({
        title: "User registered successfully",
        description: "We've registered your account for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/login");
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Registration failed",
        description: "There is some problem while Signup.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Grid
      width="100%"
      justifyContent="center"
      alignItems="center"
      height="100%"
      bg="teal.200"
      gap={5}
      flexDirection={["column", "row"]}
      gridTemplateColumns={[
        "repeat(1, 1fr)",
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
      ]}
    >
      <Img
        mt={1}
        width={["100%", "100%", "100%"]}
        height={"100%"}
        src="https://img.freepik.com/free-photo/sign-up-form-button-graphic-concept_53876-133556.jpg?w=996&t=st=1695967287~exp=1695967887~hmac=3be5523acfd8bb3f90298291c476f1178b9733d6d1494dfe5fe5d72a4cfe6484"
      />

      <Stack
        spacing={4}
        width={["100%", "100%", "100%"]}
        padding="20px"
        borderRadius="md"
        boxShadow="md"
        border="5px solid teal"
      >
        <Heading
          color="blue"
          fontWeight="bold"
          as="h3"
          size="lg"
          mb={5}
          textAlign={["center", "left"]}
        >
          Signup From Here
        </Heading>
        <Input
          type="text"
          value={username}
          placeholder="Enter your username"
          size="md"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          mb={2}
        />
        <Input
          type="text"
          value={avatar}
          placeholder="Enter your Avatar"
          size="md"
          onChange={(e) => {
            setAvatar(e.target.value);
          }}
          mb={2}
        />
        <Input
          type="email"
          value={email}
          placeholder="Enter your email"
          size="md"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          mb={2}
        />
        <Input
          type="password"
          value={password}
          placeholder="Enter your password"
          size="md"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          mb={2}
        />
        <Button onClick={handleSignup} colorScheme="teal" mt={2}>
          Signup
        </Button>
        <Flex gap={5} color={"black"}>
          {" "}
          <Text>Already have an Account </Text>
          <Link textDecoration={"none"} color={"blue"} href="/login">
            {" "}
            LogIn to Your account
          </Link>
        </Flex>
      </Stack>
    </Grid>
  );
};

export default Signup;