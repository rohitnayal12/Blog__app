

import React, { useContext, useState } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "@chakra-ui/react";
import { AuthContext } from "../Routes/Auth_context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const {setAuthstate}=useContext(AuthContext)


  const handleLogin = async () => {
    const data = {
      email,
      password,
    };

    try {
      let res = await axios.post(
        "https://blogs-gvrb.onrender.com/api/login",
        // "localhost:3000/api/login",
        data
      );
      // console.log(res);

      const token = res.data.token;
      localStorage.setItem("token", token);
      setAuthstate({
        isAuth:true,
        token:res.data.token,
        user:res.data.user
      })

      toast({
        title: "Logged in successfully",
        description: "We've logged in your account for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Login failed",
        description: "There is some problem while login.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Grid
        width="100%"
        margin="auto"
        justifyContent="center"
        alignItems="center"
        height="100%"
        bg="teal.200"
        gap={5}
        mr={5}
        flexDirection={["column", "row"]}
        gridTemplateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
        ]}
      >
        <Image
          width={["100%", "100%", "100%"]}
          height={"100%"}
          src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?w=740&t=st=1695970146~exp=1695970746~hmac=7fa54ac4daa3d2f6f4bc2acc29ad976e2034709a01123a86270d71d806dc2ac0"
        />

        <Stack
          spacing={4}
          width={["100%", "100%", "100%"]}
          padding="20px"
          borderRadius="md"
          boxShadow="md"
          border="5px solid teal"
          mr={5}
        >
          <Heading
            color="blue"
            fontWeight="bold"
            as="h3"
            size="lg"
            mb={5}
            textAlign={["center", "left"]}
          >
            Login From Here
          </Heading>
          <Input
            type="email"
            value={email}
            placeholder="Enter your email"
            size="md"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            type="password"
            value={password}
            placeholder="Enter your password"
            size="md"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button onClick={handleLogin} colorScheme="teal">
            Login
          </Button>
          <Flex gap={5} color={"black"}>
            {" "}
            <Text>Not have an Account </Text>
            <Link textDecoration={"none"} color={"blue"} href="/">
              {" "}
              Sign In Free
            </Link>
          </Flex>
        </Stack>
      </Grid>
    </Box>
  );
};

export default Login;









