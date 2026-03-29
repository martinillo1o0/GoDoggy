import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./PerfilUsuarioStyles";

export default function PerfilUsuario({ navigation }) {
  const opciones = [
    {
      id: 1,
      nombre: "Editar perfil",
      icon: "👤",
      screen: "EditarPerfilUsuario",
    },
    { id: 2, nombre: "Editar mascota", icon: "🐾", screen: "EditarMascota" },
    { id: 3, nombre: "Calificaciones", icon: "📋", screen: "Calificaciones" },
    { id: 4, nombre: "Billetera", icon: "💼", screen: "BilleteraUsuario" },
    { id: 5, nombre: "Seguridad", icon: "🛡️", screen: "SeguridadUsuario" },
    { id: 6, nombre: "Ayuda", icon: "❓", screen: "AyudaUsuario" },
    {
      id: 7,
      nombre: "Configuraciones",
      icon: "⚙️",
      screen: "ConfiguracionUsuario",
    },
    { id: 8, nombre: "Legal", icon: "⚖️", screen: "LegalUsuario" },
    { id: 9, nombre: "Cerrar sesion", icon: "🚪", screen: "Login" },
  ];

  const handlePress = (opcion) => {
    if (opcion.screen) {
      if (opcion.id === 9) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      } else {
        navigation.navigate(opcion.screen);
      }
    } else {
      console.log(`La pantalla para ${opcion.nombre} aún no está definida.`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>↩</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Cabecera del Perfil */}
        <View style={styles.profileSection}>
          <View style={styles.userNameContainer}>
            <Text style={styles.userNameText}>User3692</Text>
          </View>
          <Image
            source={require("../../../assets/perfil.png")}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.optionsList}>
          {opciones.map((opcion) => (
            <TouchableOpacity
              key={opcion.id}
              style={styles.optionItem}
              onPress={() => handlePress(opcion)} // Disparador del clic
            >
              <Text style={{ fontSize: 24, marginRight: 20 }}>
                {opcion.icon}
              </Text>
              <Text style={styles.optionText}>{opcion.nombre}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomTab}>
        <TouchableOpacity onPress={() => navigation.navigate("Inicio_cliente")}>
          <Image
            source={require("../../../assets/casa.png")}
            style={styles.tabIconImg}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../../assets/puntos.png")}
            style={styles.tabIconImg}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../../assets/maps.png")}
            style={styles.tabIconImg}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../../assets/Notificaciones.png")}
            style={styles.tabIconImg}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
