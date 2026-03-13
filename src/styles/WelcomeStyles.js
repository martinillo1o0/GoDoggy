import { StyleSheet } from "react-native";

export const welcomeStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F0" },
  header: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  title: { fontSize: 45, fontWeight: "bold", color: "#000", letterSpacing: 2 },
  subtitle: { fontSize: 22, marginTop: -10, marginBottom: 20 },
  mainImage: { width: "85%", height: "70%", resizeMode: "contain" },
  footer: {
    flex: 1,
    backgroundColor: "#E9F5D8",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 30,
    alignItems: "center",
  },
  questionText: { fontSize: 20, marginBottom: 25, fontWeight: "500" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  card: {
    width: "47%",
    height: 140,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  cardText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
