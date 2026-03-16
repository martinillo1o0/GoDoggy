import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./Inicio_clienteStyles"; // Asegúrate de crear este archivo

export default function Inicio_cliente({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("PerfilUsuario")}>
          <Text style={styles.navIcon}>☰</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.navIcon}>↩</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.titleText}>Mis mascotas</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.petCard}>
          <Image
            source={require("../../../assets/perro1.jpg")}
            style={styles.petImage}
          />
          <View style={styles.petInfo}>
            <Text style={styles.petName}>Chocokrispis</Text>
            <Text style={styles.petDetails}>Tipo: Perro 3.9/5</Text>
          </View>
        </View>

        <View style={styles.petCard}>
          <Image
            source={require("../../../assets/gato1.jpg")}
            style={styles.petImage}
          />
          <View style={styles.petInfo}>
            <Text style={styles.petName}>Garfield</Text>
            <Text style={styles.petDetails}>Tipo: Gato 1/5</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.searchCircle}>
          <Text style={styles.searchText}>Buscar paseador</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Barra Inferior */}
      <View style={styles.bottomTab}>
        <Image
          source={require("../../../assets/casa.png")}
          style={styles.tabIconImg}
        />
        <Image
          source={require("../../../assets/puntos.png")}
          style={styles.tabIconImg}
        />
        <Image
          source={require("../../../assets/maps.png")}
          style={styles.tabIconImg}
        />
        <Image
          source={require("../../../assets/Notificaciones.png")}
          style={styles.tabIconImg}
        />
      </View>
    </View>
  );
}
