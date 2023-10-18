import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { AuthContext } from "./Auth_context";

const Navbar = () => {
  const { Authstate, setAuthstate } = useContext(AuthContext);
  // console.log(Authstate);

  return (
    <Box
      backgroundColor="blue.500"
      color="white"
      padding="1rem"
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Button size="md">
        <Link to="/dashboard">Dashboard</Link>
      </Button>
      <Button size="md">
        <Link to="/">Sign Up</Link>
      </Button>
      {Authstate.isAuth ? (
        <Button
          onClick={() => {
            setAuthstate({
              isAuth: false,
              token: null,
              user: null,
            });
          }}
        >
          Log Out
        </Button>
      ) : (
        <Button size="md">
          <Link to="/login">Log In</Link>
        </Button>
      )}
    </Box>
  );
};

export default Navbar;
