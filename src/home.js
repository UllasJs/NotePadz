import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { firebase } from "../config";
import { FlashList } from "@shopify/flash-list";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const nav = useNavigation();

  // Fetch the data from firebase

  const fetchNotes = () => {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot((querySnapshot) => {
        const newNotes = [];
        querySnapshot.forEach((doc) => {
          const { note, title } = doc.data();
          newNotes.push({ note, title, id: doc.id });
        });
        setNotes(newNotes);
      });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  //delete notes from database

  const deleteNote = (id) => {
    firebase
      .firestore()
      .collection("notes")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Note successfully deleted!");
        fetchNotes(); // Refresh the notes after deletion
      })
      .catch((error) => {
        console.error("Error deleting note: ", error);
      });
  };

  // console.log(notes);

  return (
    <View style={styles.container}>
      <FlashList
        data={notes}
        numColumns={2}
        estimatedItemSize={100}
        renderItem={({ item }) => (
          <View style={styles.notesView}>
            <Text style={styles.notetitle}>{item.title}</Text>
            <Text style={styles.noteDes}>{item.note}</Text>
            <TouchableOpacity
              style={styles.delete}
              onPress={() => deleteNote(item.id)}
            >
              <Text style={styles.dltBtn}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button title="Add Notes" onPress={() => nav.navigate("AddNote")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f5",
  },
  notesView: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "#0092ff",
    shadowOffsetL: { width: 0, height: 2 },
    borderRadius: 10,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 7,
    alignItems: "center",
  },
  notetitle: {
    fontSize: 20,
    color: "#1d2c38",
  },
  noteDes: {
    fontSize: 16,
    color: "#393939",
  },
  delete: {
    marginTop: 20,
    backgroundColor: "#0092ff",
    padding: 15,
    borderRadius: 15,
  },
});

export default Home;
