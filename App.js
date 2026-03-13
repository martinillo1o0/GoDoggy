import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Importaciones con nombres exactos
import WelcomePregunta from "./vistas/WelcomePregunta";
import Login from "./vistas/Login";
import Inicio_cliente from "./vistas/Inicio_cliente";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Welcome" component={WelcomePregunta} />
        <Stack.Screen name="Inicio" component={Inicio_cliente} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
