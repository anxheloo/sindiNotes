import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Dimensions,
  Keyboard,
  Platform,
} from "react-native";
import Note from "./Note";
import { TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import NoteInput from "./NoteInput";
import { TouchableNativeFeedback } from "react-native";
import fetchNotes from "./hooks/fetchNotes";
import { ActivityIndicator } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function App() {
  // const { notes, isLoading, error, refetch } = fetchNotes();

  const [modalIsVisible, setModalIsVisible] = useState(false);

  const [notes, setNotes] = useState([
    {
      id: 0,
      text: "ca bone si ke qen",
    },
    {
      id: 1,
      text: "ca bone si ke qen",
    },
    {
      id: 2,
      text: "ca bone si ke qen",
    },
    {
      id: 3,
      text: "ca bone si ke qen",
    },
    {
      id: 4,
      text: "ca bone si ke qen",
    },
  ]);

  const addNote = (enteredText) => {
    const newNote = {
      id: notes.length, // Use the length of the current notes array as the new ID
      text: enteredText, // You can set the initial text here
    };
    setNotes([...notes, newNote]); // Add the new note to the notes array
    closeModal();
  };

  const openModal = () => {
    setModalIsVisible(true);
  };

  const closeModal = () => {
    setModalIsVisible(false);
  };

  const deleteNote = (id) => {
    const afterDelete = notes.filter((element) => element.id !== id);
    setNotes(afterDelete);
  };

  const saveChanges = async (id, updatedText) => {
    console.log(`Note with id: ${id} and text: ${updatedText} is Saved!`);

    // await axios
    //   .put(`http://your-api-endpoint/notes/${id}`, { text: updatedText })
    //   .then((response) => {
    //     // The note has been successfully updated
    //     console.log(`Note with id ${id} has been updated.`);
    //   })
    //   .catch((error) => {
    //     // Handle errors, e.g., display an error message
    //     console.error("Error updating the note:", error);
    //   });

    //  refetch()
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          {Platform.OS === "ios" ? (
            <StatusBar barStyle="light-content" style="light"></StatusBar>
          ) : (
            <StatusBar backgroundColor="transparent" style="light"></StatusBar>
          )}

          <View style={styles.titleContainer}>
            <Text style={styles.title}>My notes</Text>

            <TouchableOpacity onPress={openModal}>
              <Entypo name="add-to-list" size={25} color="white" />
            </TouchableOpacity>
          </View>

          <NoteInput
            addNote={addNote}
            visible={modalIsVisible}
            closeModal={closeModal}
          ></NoteInput>

          {/* <FlatList
          // onRefresh={()=>refetch()}
          data={notes}
          renderItem={({ item }) => (
            <View style={{ alignItems: "center" }}>
              <Note
                id={item.id}
                text={item.text}
                deleteNote={deleteNote}
                saveChanges={saveChanges}
              ></Note>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingVertical: 30,
            gap: 25,
            flexGrow: 1,
            width: windowWidth,
          }}
        /> */}

          <ScrollView
            // onRefresh={()=>refetch()}
            // style={{ flex: 1 }}
            contentContainerStyle={{
              flexGrow: 1,
              paddingVertical: 30,
              gap: 25,
              width: windowWidth,
              // justifyContent: isLoading ? "center" : {},
            }}
          >
            {notes.map((item, index) => (
              <View style={{ alignItems: "center" }} key={index}>
                <Note
                  id={item.id}
                  text={item.text}
                  deleteNote={deleteNote}
                  saveChanges={saveChanges}
                ></Note>
              </View>
            ))}
          </ScrollView>
        </View>
      </TouchableNativeFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: getStatusBarHeight(),
    flex: 1,
    backgroundColor: "#311b6b",
    // backgroundColor: "white",
  },

  titleContainer: {
    backgroundColor: "#f31282",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: getStatusBarHeight(),
    paddingBottom: 10,
  },

  title: {
    // paddingTop: getStatusBarHeight(),
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    // paddingVertical: 10,
    backgroundColor: "#f31282",
  },
});
