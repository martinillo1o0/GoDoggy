import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

const PetCard = ({ name, type, rating, imageUri }) => (
  <TouchableOpacity style={styles.card}>
    <Image source={{ uri: imageUri }} style={styles.petImage} />
    <View style={styles.cardInfo}>
      <Text style={styles.petName}>{name}</Text>
      <View style={styles.cardDetails}>
        <Text style={styles.petType}>Tipo: {type}</Text>
        <Text style={styles.petRating}>{rating}/5</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default function MyPetsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="list-outline" size={30} color="#007AFF" style={styles.headerIconBox} />
        <Ionicons name="return-up-back" size={30} color="black" />
      </View>

      <Text style={styles.title}>Mis mascotas</Text>

      <ScrollView contentContainerStyle={styles.listContainer}>
        <PetCard 
          name="Chocokrispis" 
          type="Perro" 
          rating="3.9" 
          imageUri="https://placedog.net/200/200" // Reemplazar con tu imagen
        />
        <PetCard 
          name="Garfield" 
          type="Gato" 
          rating="1" 
          imageUri="https://placekitten.com/200/200" 
        />

        {/* Botón Circular "Buscar paseador" */}
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Buscar paseador</Text>
        </TouchableOpacity>

        {/* Botón Añadir (+) */}
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={30} color="black" />
        </TouchableOpacity>
      </ScrollView>

      {/* Navbar Inferior */}
      <View style={styles.navBar}>
        <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/609/609803.png'}} style={styles.navIcon} />
        <MaterialCommunityIcons name="grid" size={30} color="black" />
        <Ionicons name="location-outline" size={30} color="red" />
        <Ionicons name="notifications-outline" size={30} color="red" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0EE', // Color crema de fondo
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  headerIconBox: {
    borderWidth: 2,
    borderColor: '#007AFF',
    padding: 2,
  },
  title: {
    fontSize: 32,
    fontFamily: 'serif', // O la fuente que prefieras
    textAlign: 'center',
    marginVertical: 20,
  },
  listContainer: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#D9D9D9',
    width: '90%',
    borderRadius: 50,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 15,
  },
  petName: {
    fontSize: 22,
    fontFamily: 'serif',
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
    marginTop: 5,
  },
  petType: {
    fontSize: 14,
    color: '#333',
  },
  petRating: {
    fontSize: 14,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#E5B5B5',
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  searchButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'serif',
  },
  addButton: {
    backgroundColor: '#E5B5B5',
    width: 80,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#98D8C1',
    height: 70,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navIcon: {
    width: 40,
    height: 40,
  }
});