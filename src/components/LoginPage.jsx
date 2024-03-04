import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
const DEFAULT_FORM_STATE = {
  username: "",
  password: "",
};
function LoginPage() {
  const { user, login } = useContext(AuthContext);

  const navigate = useNavigate();

  const [formState, setFormState] = useState({ ...DEFAULT_FORM_STATE });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const changeForm = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const onLoginRequested = (e) => {
    e.preventDefault();

    console.log("loggin");

    setIsLoggingIn(true);

    // we wait for 1.2 seconds to simulate sending an API request
    // when the time is done, we simulate having received a response from the server that
    // contains the user + authtoken
    setTimeout(() => {
      // login success
      const payload = {
        user: formState,
        authToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      };
      // pass user + authToken to login
      login(payload.user, payload.authToken);
      // reset form (redundant, because login redirects...)
      setFormState({ ...DEFAULT_FORM_STATE });
    }, 1200);
  };

  // redirect to homepage if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Stack h={300} bg="var(--mantine-color-body)" align="center" gap="md">
      <form>
        <TextInput
          placeholder="username"
          name="username"
          required
          autoComplete="off"
          onChange={changeForm}
          value={formState.username}
        />
        <PasswordInput
          placeholder="password"
          name="password"
          required
          onChange={changeForm}
          value={formState.password}
        />
        <Button
          onClick={onLoginRequested}
          loading={isLoggingIn}
          loaderProps={{ type: "dots" }}
        >
          Log In
        </Button>
      </form>
    </Stack>
  );
}

export default LoginPage;
