import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./src/features/auth/Login";
import WelcomePregunta from "./src/features/auth/WelcomePregunta";
import Welcome from "./src/features/auth/Welcome";
import Inicio_cliente from "./src/features/auth/Inicio_cliente";
import RegistroPaseador from "./src/features/auth/RegistroPaseador";
import RegistroUsuario from "./src/features/auth/RegistroUsuario";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomePregunta"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="WelcomePregunta" component={WelcomePregunta} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Inicio_cliente" component={Inicio_cliente} />
        <Stack.Screen name="RegistroPaseador" component={RegistroPaseador} />
        <Stack.Screen name="RegistroUsuario" component={RegistroUsuario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
