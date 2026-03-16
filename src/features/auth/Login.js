import React from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { loginStyles as styles } from "./LoginStyles";

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>

      <Image
        source={require("../assets/logo.png")}
        style={styles.backgroundImage}
      />

      <View style={styles.loginCard}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre:</Text>
          <TextInput
            style={styles.input}
            placeholder="Tu nombre"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contraseña:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="******"
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
