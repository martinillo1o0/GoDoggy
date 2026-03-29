import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomePregunta from "./src/features/auth/WelcomePregunta";
import Welcome from "./src/features/auth/Welcome";
import Login from "./src/features/auth/Login";
import RegistroUsuario from "./src/features/auth/RegistroUsuario";
import RegistroPaseador from "./src/features/auth/RegistroPaseador";
import Inicio_cliente from "./src/features/auth/Inicio_cliente";
import PerfilUsuario from "./src/features/auth/PerfilUsuario";
import EditarPerfilUsuario from "./src/features/auth/EditarPerfilUsuario";
import EditarMascota from "./src/features/auth/EditarMascota";
import RegistroMascota from "./src/features/auth/RegistroMascota";
import CalificacionesUsuario from "./src/features/auth/CalificacionesUsuario";
import ConfiguracionUsuario from "./src/features/auth/ConfiguracionUsuario";
import LegalUsuario from "./src/features/auth/LegalUsuario";
import SeguridadUsuario from "./src/features/auth/SeguridadUsuario";

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
        <Stack.Screen name="RegistroUsuario" component={RegistroUsuario} />
        <Stack.Screen name="RegistroPaseador" component={RegistroPaseador} />
        <Stack.Screen name="Inicio_cliente" component={Inicio_cliente} />
        <Stack.Screen name="PerfilUsuario" component={PerfilUsuario} />
        <Stack.Screen
          name="EditarPerfilUsuario"
          component={EditarPerfilUsuario}
        />
        <Stack.Screen name="EditarMascota" component={EditarMascota} />
        <Stack.Screen name="RegistroMascota" component={RegistroMascota} />
        <Stack.Screen name="Calificaciones" component={CalificacionesUsuario} />
        <Stack.Screen
          name="ConfiguracionUsuario"
          component={ConfiguracionUsuario}
        />
        <Stack.Screen name="LegalUsuario" component={LegalUsuario} />
        <Stack.Screen name="SeguridadUsuario" component={SeguridadUsuario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
