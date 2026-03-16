import React from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { loginStyles as styles } from "./LoginStyles";

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      {/* BOTÓN VOLVER */}
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 50,
          left: 20,
          zIndex: 10,
          padding: 10,
        }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ fontSize: 16, color: "#333", fontWeight: "bold" }}>
          ← Volver
        </Text>
      </TouchableOpacity>

      <View style={styles.header}></View>

      <Image
        source={require("../../../assets/logo.png")}
        style={styles.backgroundImage}
      />

      <View style={styles.loginCard}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre:</Text>
          <TextInput style={styles.input} placeholder="Tu nombre" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contraseña:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="******"
          />
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Inicio_cliente")}
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
