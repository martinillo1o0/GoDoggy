import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styles } from "./RegistroUsuarioStyles";

export default function RegistroUsuario({ navigation }) {
  const campos = [
    "Nombre",
    "Fecha de Nacimiento",
    "Dirección",
    "Teléfono",
    "Contraseña",
    "Correo",
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../../../assets/logo.png")}
        style={styles.headerImage}
      />

      <View style={styles.formCard}>
        {campos.map((campo) => (
          <View key={campo} style={styles.inputContainer}>
            <Text style={styles.label}>{campo}:</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={campo === "Contraseña"}
              keyboardType={
                campo === "Correo"
                  ? "email-address"
                  : campo === "Teléfono"
                    ? "phone-pad"
                    : "default"
              }
            />
          </View>
        ))}

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.submitBtnText}>Crear Usuario</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
