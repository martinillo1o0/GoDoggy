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

export default function RegistroPaseador({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={{ padding: 20, marginTop: 40, zIndex: 10 }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: "#2ECC71", fontWeight: "bold" }}>← Regresar</Text>
      </TouchableOpacity>

      <View style={styles.header}></View>

      <Image
        source={require("../../../assets/logo.png")}
        style={styles.backgroundImage}
      />

      <View
        style={[
          styles.loginCard,
          { backgroundColor: "#D1F2EB", marginTop: 20 },
        ]}
      >
        {["Nombre", "Biografía", "Dirección", "Teléfono", "Contraseña"].map(
          (label) => (
            <View key={label} style={styles.inputGroup}>
              <Text style={styles.label}>{label}:</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={label === "Contraseña"}
              />
            </View>
          ),
        )}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text style={styles.label}>Añadir Foto: </Text>
          <View
            style={{
              backgroundColor: "#bbb",
              width: 60,
              height: 50,
              marginLeft: 10,
              borderRadius: 5,
            }}
          />
        </View>

        <TouchableOpacity
          style={[styles.loginButton, { backgroundColor: "#2ECC71" }]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Crear Usuario</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
