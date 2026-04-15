import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const formatNombreMascota = (text) => {
    return text
        .trim()
        .split(" ")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
};

export default function RegistroMascota({ navigation }) {
    const [usuarioId, setUsuarioId] = useState(null);
    const [nombreMascota, setNombreMascota] = useState("");
    const [tipoMascota, setTipoMascota] = useState("");
    const [raza, setRaza] = useState("");
    const [color, setColor] = useState("");
    const [sexo, setSexo] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [peso, setPeso] = useState("");
    const [esterilizado, setEsterilizado] = useState(false);
    const [miedos, setMiedos] = useState("");
    const [tieneAlergia, setTieneAlergia] = useState(false);
    const [alergias, setAlergias] = useState("");
    const [patas, setPatas] = useState(4);
    const [notasExtra, setNotasExtra] = useState("");
    const [foto, setFoto] = useState(null);

    useEffect(() => {
        const usuarioStr = localStorage.getItem("usuario");
        if (usuarioStr) {
            const usuario = JSON.parse(usuarioStr);
            setUsuarioId(usuario.usuario_id);
        }
    }, []);

    const seleccionarFoto = async () => {
        try {
            const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permiso.granted) {
                Alert.alert("Permiso denegado", "Se necesitan permisos para acceder a las fotos");
                return;
            }

            const resultado = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.7,
            });

            if (!resultado.canceled) {
                setFoto(resultado.assets[0]);
            }
        } catch (error) {
            console.log("Error al seleccionar foto:", error);
            Alert.alert("Error", "No se pudo seleccionar la foto");
        }
    };

    const validarRegistro = () => {
        const camposFaltantes = [];

        if (!tipoMascota.trim()) camposFaltantes.push("Tipo de mascota");
        if (!nombreMascota.trim()) camposFaltantes.push("Nombre de la mascota");
        if (!raza.trim()) camposFaltantes.push("Raza");
        if (!color.trim()) camposFaltantes.push("Color");
        if (!sexo.trim()) camposFaltantes.push("Sexo");
        if (!fechaNacimiento.trim()) camposFaltantes.push("Fecha de nacimiento");
        if (!peso.trim()) camposFaltantes.push("Peso");

        if (camposFaltantes.length > 0) {
            Alert.alert(
                "Datos incompletos",
                `Por favor completa los siguientes campos:\n- ${camposFaltantes.join("\n- ")}`
            );
            return false;
        }

        if (isNaN(Number(peso)) || Number(peso) <= 0) {
            Alert.alert("Peso inválido", "Ingresa un peso válido mayor a 0.");
            return false;
        }

        const fechaDate = new Date(fechaNacimiento);
        if (!(fechaDate instanceof Date) || isNaN(fechaDate.getTime())) {
            Alert.alert("Fecha inválida", "Usa el formato YYYY-MM-DD y una fecha válida.");
            return false;
        }

        if (patas < 0 || patas > 7) {
            Alert.alert("Patas inválidas", "Selecciona un valor entre 0 y 7.");
            return false;
        }

        if (tieneAlergia && !alergias.trim()) {
            Alert.alert("Alergia", "Describe la alergia.");
            return false;
        }

        return true;
    };

 const guardarRegistro = async () => {
    if (!validarRegistro()) return;

    if (!usuarioId) {
        Alert.alert("Error", "Usuario no identificado");
        return;
    }

    try {
        const formData = new FormData();

        formData.append("nombreMascota", formatNombreMascota(nombreMascota));
        formData.append("raza", raza);
        formData.append("color", color);
        formData.append("sexo", sexo);
        formData.append("fechaNacimiento", fechaNacimiento);
        formData.append("peso", peso);

        formData.append("esterilizado", esterilizado ? "Si" : "No");
        formData.append("miedos", miedos);
        formData.append("alergias", tieneAlergia ? alergias : "No");
        formData.append("patas", patas);
        formData.append("notasExtra", notasExtra);
        formData.append("usuario_id", usuarioId);

        // 📷 FOTO (FORMA CORRECTA PARA WEB)
        if (foto) {
            const responseImg = await fetch(foto.uri);
            const blob = await responseImg.blob();

            formData.append("foto", blob, "mascota.jpg");
        }

        console.log("🚀 Enviando mascota...");
        console.log("Foto incluida:", !!foto);

        const response = await fetch("http://localhost:3000/mascota", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        console.log("📡 RESPUESTA:", data);

        if (response.ok) {
            Alert.alert("Éxito", `Mascota registrada\nID: ${data.mascota_id}`);
            navigation.navigate("Inicio_cliente");
        } else {
            Alert.alert("Error", data.message || "Error al guardar");
        }

    } catch (error) {
        console.error("❌ Error frontend:", error);
        Alert.alert("Error", "No se pudo conectar con el servidor");
    }
};

    const selectedColor = "#D2B48C";
    const unselectedColor = "#fff";

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            >
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10, backgroundColor: "#f5f5f5" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 28 }}>↩</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1, padding: 20, paddingBottom: 40, backgroundColor: "#f5f5f5" }}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={true}
                scrollEnabled={true}
                nestedScrollEnabled={true}
            >
                <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>Registro de Mascota</Text>

                <View style={{
                    backgroundColor: "#99D9C1",
                    borderRadius: 20,
                    padding: 20,
                    elevation: 6,
                }}>

                    {/* 12. Foto (arriba) */}
                    <View style={{ marginBottom: 15, alignItems: "center" }}>
                        {foto ? (
                            <Image
                                source={{ uri: foto.uri }}
                                style={{ width: 140, height: 140, borderRadius: 70, borderWidth: 2, borderColor: "#7CEDA3" }}
                            />
                        ) : (
                            <View
                                style={{
                                    width: 140,
                                    height: 140,
                                    borderRadius: 70,
                                    borderWidth: 2,
                                    borderColor: "#7CEDA3",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#e9ffe8",
                                }}
                            >
                                <Text style={{ color: "#555" }}>Sin foto</Text>
                            </View>
                        )}
                        <TouchableOpacity
                            onPress={seleccionarFoto}
                            style={{ marginTop: 8, backgroundColor: "#7CEDA3", padding: 8, borderRadius: 8 }}
                        >
                            <Text style={{ color: "#fff", fontWeight: "bold" }}>{foto ? "Cambiar foto" : "Agregar foto"}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* 13. Tipo mascota (arriba) */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Tipo de mascota</Text>
                        <TextInput
                            style={{ backgroundColor: "#fff", padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#ddd" }}
                            value={tipoMascota}
                            onChangeText={(value) => setTipoMascota(value)}
                            placeholder="Ej: Perro, Gato, Ave"
                        />
                    </View>

                    {/* 1. nombre mascota */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Nombre de la mascota</Text>
                        <TextInput
                            style={{ backgroundColor: "#fff", padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#ddd" }}
                            value={nombreMascota}
                            onChangeText={(value) => setNombreMascota(formatNombreMascota(value))}
                            placeholder="Ej: Chocokrispis"
                        />
                    </View>

                    {/* 2. raza */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Raza</Text>
                        <TextInput
                            style={{ backgroundColor: "#fff", padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#ddd" }}
                            value={raza}
                            onChangeText={setRaza}
                            placeholder="Ej: Pug"
                        />
                    </View>

                    {/* 3. color */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Color</Text>
                        <TextInput
                            style={{ backgroundColor: "#fff", padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#ddd" }}
                            value={color}
                            onChangeText={setColor}
                            placeholder="Ej: Café"
                        />
                    </View>

                    {/* 4. sexo checkbox */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Sexo</Text>
                        <View style={{ flexDirection: "row", gap: 12 }}>
                            {['macho', 'hembra'].map((opc) => (
                                <TouchableOpacity
                                    key={opc}
                                    onPress={() => setSexo(opc)}
                                    style={{
                                        flex: 1,
                                        padding: 10,
                                        borderRadius: 8,
                                        borderWidth: 1,
                                        borderColor: sexo === opc ? selectedColor : '#ccc',
                                        backgroundColor: sexo === opc ? selectedColor : unselectedColor,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text>{opc.charAt(0).toUpperCase() + opc.slice(1)}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* 5. fecha de nacimiento */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Fecha de nacimiento</Text>
                        <TextInput
                            style={{ backgroundColor: "#fff", padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#ddd" }}
                            value={fechaNacimiento}
                            onChangeText={setFechaNacimiento}
                            placeholder="YYYY-MM-DD"
                        />
                    </View>

                    {/* 6. peso */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Peso (kg)</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TextInput
                                style={{ flex: 1, backgroundColor: "#fff", padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#ddd" }}
                                value={peso}
                                onChangeText={(text) => setPeso(text.replace(/[^0-9.]/g, ''))}
                                keyboardType="numeric"
                                placeholder="0.0"
                            />
                            <Text style={{ marginLeft: 8, fontWeight: "bold" }}>KG</Text>
                        </View>
                    </View>

                    {/* 7. esterilizado si/no */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Esterilizado</Text>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            {['no', 'si'].map((opc) => (
                                <TouchableOpacity
                                    key={opc}
                                    onPress={() => setEsterilizado(opc === 'si')}
                                    style={{
                                        flex: 1,
                                        padding: 10,
                                        borderRadius: 8,
                                        borderWidth: 1,
                                        borderColor: esterilizado === (opc === 'si') ? selectedColor : '#ccc',
                                        backgroundColor: esterilizado === (opc === 'si') ? selectedColor : unselectedColor,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text>{opc.toUpperCase()}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* 8. miedos */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Miedos</Text>
                        <TextInput
                            style={{ backgroundColor: "#fff", padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#ddd" }}
                            value={miedos}
                            onChangeText={setMiedos}
                            placeholder="Ej: Trueno, aspiradora"
                        />
                    </View>

                    {/* 9. alergia check si/no + campo */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ marginBottom: 5, fontWeight: "bold" }}>¿Tiene alergia?</Text>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            {['no', 'si'].map((opc) => (
                                <TouchableOpacity
                                    key={opc}
                                    onPress={() => setTieneAlergia(opc === 'si')}
                                    style={{
                                        padding: 8,
                                        borderRadius: 8,
                                        borderWidth: 1,
                                        borderColor: tieneAlergia === (opc === 'si') ? selectedColor : '#ccc',
                                        backgroundColor: tieneAlergia === (opc === 'si') ? selectedColor : unselectedColor,
                                    }}
                                >
                                    <Text>{opc.toUpperCase()}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {tieneAlergia && (
                            <TextInput
                                style={{ marginTop: 10, backgroundColor: "#fff", padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#ddd" }}
                                value={alergias}
                                onChangeText={setAlergias}
                                placeholder="Describe la alergia"
                            />
                        )}
                    </View>

                    {/* 10. patas 0-7 */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Número de patas (0-7)</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                            {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
                                <TouchableOpacity
                                    key={n}
                                    onPress={() => setPatas(n)}
                                    style={{
                                        width: 36,
                                        height: 36,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 6,
                                        borderWidth: 1,
                                        borderColor: patas === n ? '#27ae60' : '#ccc',
                                        backgroundColor: patas === n ? '#d1f7e8' : '#fff',
                                    }}
                                >
                                    <Text>{n}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* 11. notas extra */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Notas extra</Text>
                        <TextInput
                            style={{ backgroundColor: "#fff", padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#ddd", minHeight: 80 }}
                            value={notasExtra}
                            onChangeText={setNotasExtra}
                            multiline
                            placeholder="Información adicional..."
                        />
                    </View>

                </View>

                <TouchableOpacity
                    onPress={guardarRegistro}
                    style={{
                        backgroundColor: "#A67C52",
                        padding: 14,
                        borderRadius: 10,
                        alignItems: "center",
                        marginTop: 10,
                    }}
                >
                    <Text style={{ color: "#333", fontWeight: "bold", fontSize: 16 }}>Guardar mascota</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
