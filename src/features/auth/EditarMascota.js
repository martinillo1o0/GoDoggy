import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { styles } from "./EditarMascotaStyles";

export default function EditarMascota({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 28 }}>↩</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Editar mascota</Text>

      <View style={styles.formCard}>
        <TouchableOpacity style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Image
              source={require("../../../assets/perro1.jpg")}
              style={styles.petImage}
            />
          </View>
          <Text style={{ fontWeight: "bold", marginTop: 5 }}>Cambiar foto</Text>
        </TouchableOpacity>

        <View style={styles.fullInputGroup}>
          <Text style={styles.label}>Nombre de la mascota:</Text>
          <TextInput style={styles.input} defaultValue="Chocokrispis" />
        </View>

        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Especie:</Text>
            <TextInput style={styles.input} defaultValue="Perro" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Raza:</Text>
            <TextInput style={styles.input} defaultValue="Pug" />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Edad:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              defaultValue="3"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Peso (kg):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              defaultValue="8"
            />
          </View>
        </View>

        <View style={styles.fullInputGroup}>
          <Text style={styles.label}>Notas especiales:</Text>
          <TextInput
            style={[
              styles.input,
              { height: 80, textAlignVertical: "top", paddingTop: 10 },
            ]}
            multiline
            defaultValue="Es muy amigable pero se asusta con los truenos."
          />
        </View>

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.saveBtnText}>Actualizar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
