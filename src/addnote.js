import {
  View,
  Text,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { firebase } from "../config";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Addnote = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const nav = useNavigation();

  const handleAdd = () => {
    firebase
      .firestore()
      .collection("notes")
      .add({
        title,
        note,
      })
      .then(() => {
        setTitle("");
        setNote("");
        Keyboard.dismiss();
        nav.navigate("Home");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.inputTitle}
      />
      <TextInput
        placeholder="Note"
        value={note}
        onChangeText={(text) => setNote(text)}
        style={styles.inputNote}
      />
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Addnote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f3f4f5",
    margin: 15,
    gap: 20,
  },
  inputTitle: {
    width: "100%",
    padding: 20,
    // textAlign: "center",
    fontSize: 18,
    backgroundColor: "#fff",
    color: "#1d2c38",
    borderRadius: 10,
  },
  inputNote: {
    width: "100%",
    padding: 20,
    height: 400,
    backgroundColor: "#fff",
    color: "#1d2c38",
    fontSize: 14,
    borderRadius: 10,
  },
  button: {
    width: "100%",
    padding: 25,
    backgroundColor: "#0092ff",
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
  },
});
