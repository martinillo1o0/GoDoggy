import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { styles } from "./EditarPerfilUsuarioStyles";

export default function EditarPerfilUsuario({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 28 }}>↩</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Editar perfil</Text>
      <View style={styles.formCard}>
        <TouchableOpacity style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text>FOTO</Text>
          </View>
          <Text style={{ fontWeight: "bold", marginTop: 5 }}>Añadir foto</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Apellido:</Text>
            <TextInput style={styles.input} />
          </View>
        </View>
        <View style={styles.fullInputGroup}>
          <Text style={styles.label}>Correo:</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.fullInputGroup}>
          <Text style={styles.label}>Direccion:</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contraseña:</Text>
            <TextInput style={styles.input} secureTextEntry />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Telefono:</Text>
            <TextInput style={styles.input} keyboardType="phone-pad" />
          </View>
        </View>
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
