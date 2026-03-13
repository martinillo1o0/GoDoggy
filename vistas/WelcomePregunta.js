import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";

// IMPORTA EL ESTILO AQUÍ
import { welcomeStyles as styles } from "../styles/WelcomeStyles";

export default function WelcomePregunta({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>GO DOGGY</Text>
        <Text style={styles.subtitle}>dog walking</Text>
        <Image
          source={require("../assets/splash-icon.png")}
          style={styles.mainImage}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.questionText}>¿Para que deceas tu cuenta?</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: "#57B48C" }]}
          >
            <Text style={styles.cardText}>Prestador de Servicio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, { backgroundColor: "#8B2232" }]}
          >
            <Text style={styles.cardText}>Usuario de Normal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
