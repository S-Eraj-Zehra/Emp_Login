import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";

import { useRouter } from "expo-router";
import authService from "./services/authService";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleLogin = async () => {
    setMessage("");

    if (username.trim() === "" || password.trim() === "") {
      setMessage("Please enter username and password");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      await authService.login(username, password);

      setMessage("Login Successful!");
      setMessageType("success");

      setTimeout(() => {
        router.replace("/attendance");
      }, 1000);
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Employee Login</Text>

          <TextInput
            placeholder="Username"
            placeholderTextColor="#666"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#666"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          {message !== "" && (
            <Text
              style={[
                styles.message,
                messageType === "success"
                  ? styles.successMessage
                  : styles.errorMessage,
              ]}
            >
              {message}
            </Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Logging In..." : "Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "88%",
    backgroundColor: "rgba(26, 125, 224, 0.9)",
    padding: 25,
    borderRadius: 20,
  },

  title: {
    fontSize: 34,
    color: "#d9d9ea",
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 30,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },

  input: {
    backgroundColor: "#e0e1eb",
    borderRadius: 10,
    padding: 15,
    marginBottom: 18,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#0a0a2c",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },

  message: {
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "bold",
  },

  successMessage: {
    color: "green",
  },

  errorMessage: {
    color: "red",
  },
});
