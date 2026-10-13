import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";

import attendanceService from "../services/attendanceService";

export default function Attendance() {
  const router = useRouter();

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const data = await attendanceService.getAttendance();
      setAttendance(data);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    router.replace("/");
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loading}>Loading Attendance...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Today's Attendance</Text>

        {message !== "" && <Text style={styles.error}>{message}</Text>}

        <ScrollView
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          {attendance.map((item) => (
            <View key={item.employee_id} style={styles.card}>
              <Text style={styles.label}>Employee Name</Text>
              <Text style={styles.value}>{item.name}</Text>

              <Text style={styles.label}>Employee ID</Text>
              <Text style={styles.value}>{item.employee_id}</Text>

              <Text style={styles.label}>Date</Text>
              <Text style={styles.value}>{item.date}</Text>

              <Text style={styles.label}>Arrival Time</Text>
              <Text style={styles.value}>{item.check_in || "Null"}</Text>

              <Text style={styles.label}>Status</Text>
              <Text style={styles.value}>{item.status || "Null"}</Text>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
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
    backgroundColor: "rgba(10,10,44,0.35)",
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0a2c",
  },

  loading: {
    fontSize: 22,
    color: "#D9D9EA",
    fontWeight: "bold",
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#D9D9EA",
    textAlign: "center",
    marginTop: 25,
    marginBottom: 25,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },

  card: {
    backgroundColor: "rgba(26,125,224,0.90)",
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    borderWidth: 2,
    borderColor: "#E0E1EB",
    elevation: 6,
  },

  label: {
    color: "#D9D9EA",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 10,
  },

  value: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 4,
    marginBottom: 4,
  },

  button: {
    backgroundColor: "#0a0a2c",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#E0E1EB",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  error: {
    color: "#ff7070",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 15,
    fontWeight: "bold",
  },
});
