import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router";
import "../../index.css";
import "firebase/auth";
import { Container, Title } from "./Login.style";
import { ui, uiConfig } from "../../auth/firebaseAuth";
import { UserContext } from "../../components/login/AuthProvider";

const Login = () => {
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", uiConfig);

    if (user != null) {
      history.push("/");
    }
  }, [user]);

  return (
    <>
      <Container>
        <Title>로그인</Title>
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
      </Container>
    </>
  );
};

export default Login;
