import React from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { loginStyles as styles } from "./LoginStyles";

export default function Login({ route, navigation }) {
  const { tipo } = route.params || { tipo: "cliente" };

  return (
    <View style={styles.container}>
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
          onPress={() => {
            if (tipo === "cliente") {
              navigation.navigate("Inicio_cliente");
            } else {
              navigation.navigate("Inicio_paseador");
            }
          }}
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
