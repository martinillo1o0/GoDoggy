import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./Inicio_clienteStyles";

export default function Inicio_cliente({ route, navigation }) {

  // ========================
  // ESTADOS
  // ========================
  const [mascotas, setMascotas] = useState([]);

  // ========================
  // FUNCIONES
  // ========================
  const irPerfil = () => navigation.navigate("PerfilUsuario");
  const regresar = () => navigation.goBack();
  const irRegistroMascota = () => navigation.navigate("RegistroMascota");

  useEffect(() => {
    if (route?.params?.mascota) {
      setMascotas((prev) => [...prev, route.params.mascota]);
      navigation.setParams({ mascota: null });
    }
  }, [route?.params?.mascota]);

  // ========================
  // UI
  // ========================
  return (
    <View style={styles.container}>

      {/* NAVBAR */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={irPerfil}>
          <Text style={styles.navIcon}>☰</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={regresar}>
          <Text style={styles.navIcon}>↩</Text>
        </TouchableOpacity>
      </View>

      {/* TÍTULO */}
      <Text style={styles.titleText}>Mis mascotas</Text>

      {/* CONTENIDO */}
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {mascotas.length === 0 ? (
          <View style={{ padding: 30, alignItems: "center" }}>
            <Text style={{ color: "#555" }}>No tienes mascotas registradas aún.</Text>
            <Text style={{ color: "#555" }}>Usa + para crear una nueva.</Text>
          </View>
        ) : (
          mascotas.map((mascota, index) => (
            <View key={`${mascota.nombre}-${index}`} style={styles.petCard}>
              <Image
                source={mascota.foto ? { uri: mascota.foto } : require("../../../assets/perro1.jpg")}
                style={styles.petImage}
              />
              <View style={styles.petInfo}>
                <Text style={styles.petName}>{mascota.nombre}</Text>
                <Text style={styles.petDetails}>Tipo: {mascota.tipo}</Text>
                <Text style={styles.petDetails}>Raza: {mascota.raza}</Text>
                <Text style={styles.petDetails}>Color: {mascota.color}</Text>
              </View>
            </View>
          ))
        )}

        {/* BOTÓN BUSCAR */}
        <TouchableOpacity style={styles.searchCircle}>
          <Text style={styles.searchText}>Buscar paseador</Text>
        </TouchableOpacity>

        {/* BOTÓN AGREGAR */}
        <TouchableOpacity style={styles.addButton} onPress={irRegistroMascota}>
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* BARRA INFERIOR */}
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