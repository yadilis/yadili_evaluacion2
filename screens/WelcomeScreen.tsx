import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
export default function WelcomeScreen({navigation} : any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate("Registro")}
        >
          <Text style={styles.buttonText}>Registrarse </Text>

          <Text style={styles.buttonText}>Desarrollado por:Yadira Palomo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5", 
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333", 
  },
  subtitle: {
    fontSize: 18,
    color: "#666", 
    marginBottom: 40,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  loginButton: {
    width: "80%",
    padding: 15,
    backgroundColor: "#007BFF", 
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  registerButton: {
    width: "80%",
    padding: 15,
    backgroundColor: "#28A745", 
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", 
    fontSize: 18,
    fontWeight: "bold",
  },
});