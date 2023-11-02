import React, { useReducer, useState, useRef, useEffect } from "react";
import {
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
} from "react-native";
import { TouchableOpacity } from "react-native";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Modal,
  Image,
  Text,
  Keyboard,
} from "react-native";

export default function NoteInput({ closeModal, visible, addNote }) {
  const [initialValue, setInitialValue] = useState("");
  const textInputRef2 = useRef();

  const addNoteHandler = () => {
    addNote(initialValue);
    setInitialValue("");
  };

  // useEffect(() => {
  //   // if (visible) {
  //   textInputRef2.current?.focus();
  //   // }
  // }, []);

  return (
    <Modal visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.image}
            source={require("./assets/note.png")}
          ></Image>

          <TextInput
            autoFocus={true}
            ref={textInputRef2}
            placeholder="Your new note!"
            style={styles.textInput}
            value={initialValue}
            onChangeText={(text) => setInitialValue(text)}
          ></TextInput>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              title="Add Note"
              onPress={addNoteHandler}
              color={"#b180f0"}
            >
              <Text style={styles.btnText}>Add Note</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              title="Cancel"
              onPress={closeModal}
            >
              <Text style={styles.btnText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#311b6b",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    // backgroundColor: "red",
  },

  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    color: "#120438",
    borderRadius: 6,
    width: "90%",
    padding: 16,
  },

  button: {
    width: "30%",
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f31282",
    height: 50,
    borderRadius: 5,
  },

  btnText: {
    fontSize: 20,
    color: "white",
  },

  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
});
