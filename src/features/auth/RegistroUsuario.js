import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { loginStyles as styles } from "./LoginStyles";

export default function RegistroUsuario({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={{ padding: 20, marginTop: 40, zIndex: 10 }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: "#E95295", fontWeight: "bold" }}>← Regresar</Text>
      </TouchableOpacity>

      <View style={styles.header}></View>

      <Image
        source={require("../../../assets/logo.png")}
        style={styles.backgroundImage}
      />

      <View
        style={[
          styles.loginCard,
          { backgroundColor: "#F2EBD1", marginTop: 20 },
        ]}
      >
        {[
          "Nombre",
          "Fecha de Nacimiento",
          "Dirección",
          "Teléfono",
          "Contraseña",
          "Correo",
        ].map((label) => (
          <View key={label} style={styles.inputGroup}>
            <Text style={styles.label}>{label}:</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={label === "Contraseña"}
            />
          </View>
        ))}

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Crear Usuario</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
