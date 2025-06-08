import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Authentication({ handleClose }) {
  const [isRegistration, setIsRegistration] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { signup, login } = useAuth();

  function Error({ errorMessage }) {
    return (
      <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "#de4e4e" }}>
        <i className="fa-solid fa-circle-exclamation"></i>
        <p> {errorMessage}</p>
      </span>
    );
  }

  async function handleAuthenticate() {
    // if (!email || !email.includes("@") || !password || password.length < 6 || isAuthenticating) {
    //   return;
    // }
    if (!email.includes("@") || !email.includes(".com")) {
      setAuthError(false);
      setEmailError(true);
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      setAuthError(false);
      setEmailError(false);
      setPasswordError(true);
      setErrorMessage("Please enter valid password");
      return;
    }
    try {
      setIsAuthenticating(true);
      setEmailError(false);
      setPasswordError(false);
      setAuthError(false);
      setErrorMessage("");
      if (isRegistration) {
        // register a user
        await signup(email, password);
      } else {
        // login a user
        await login(email, password);
      }
      handleClose();
    } catch (err) {
      console.log(err);
      if (err.code === "auth/invalid-email") {
        setEmailError(true);
        setErrorMessage("Please enter a valid email address.");
      } else if (err.code === "auth/invalid-credential") {
        setAuthError(true);
        setErrorMessage("User does not exist/ incorrect email or password");
      } else if (err.code === "auth/email-already-in-use") {
        setAuthError(true);
        setErrorMessage("User already exists. Please sign in instead.");
      } else {
        setError(true);
        setErrorMessage("There was an unexpected error, try again later");
      }
    } finally {
      setIsAuthenticating(false);
    }
  }

  return (
    <>
      <h2 className="sign-up-text">{isRegistration ? "Sign Up" : "Login"}</h2>
      <p>{isRegistration ? "Sign up" : "Login in"} to your account !</p>

      <div>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {emailError && <Error errorMessage={errorMessage} />}
      </div>

      <div>
        <input
          placeholder="*******"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {passwordError && <Error errorMessage={errorMessage} />}
      </div>
      {authError && <Error errorMessage={errorMessage} />}

      <button onClick={handleAuthenticate} disabled={isAuthenticating || password.length <= 0}>
        <p>{isAuthenticating ? "Authenticating..." : "Submit"}</p>
      </button>
      <hr />
      <div className="register-content">
        <p>{isRegistration ? "Already have an account?" : "Don't have an account?"}</p>
        <button
          onClick={() => {
            setIsRegistration(!isRegistration);
          }}
        >
          <p>{!isRegistration ? "Sign Up" : "Login"}</p>
        </button>
      </div>
    </>
  );
}
