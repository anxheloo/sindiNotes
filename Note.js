import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Alert } from "react-native";
import { KeyboardAvoidingView } from "react-native";

const Note = ({ id, text, deleteNote, saveChanges }) => {
  const [myText, setMyText] = useState(text);
  const [editable, setEditable] = useState(false);
  const textInputRef = useRef(null);

  const handleEdit = () => {
    setEditable(true); // Set editable to true first
  };

  useEffect(() => {
    if (editable) {
      textInputRef.current.focus(); // Then focus on the text input
    }
  }, [editable]);

  const onBlurFunction = () => {
    console.log("onBlurFunction called");
    setEditable(false);

    if (text !== myText) {
      // Text has changed, show an alert to confirm saving changes
      Alert.alert(
        "Save Changes",
        "Do you want to save the changes?",
        [
          {
            text: "Cancel",
            onPress: () => {
              // User canceled, reset the text to its original value
              console.log("cancel pressed");
              setMyText(text);
            },
            style: "cancel",
          },
          {
            text: "Save",
            onPress: () => {
              saveChanges(id, myText);
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.idCircular}>
        <Text style={styles.baseText}>{id}</Text>
      </View>

      <TextInput
        editable={editable}
        onBlur={onBlurFunction}
        ref={textInputRef}
        value={myText}
        onChangeText={(e) => setMyText(e)}
        style={styles.textInput}
      ></TextInput>

      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={handleEdit} style={styles.btnCircular}>
          <Entypo name="edit" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => deleteNote(id)}
          style={styles.btnCircular}
        >
          <Entypo name="trash" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Note;

const styles = StyleSheet.create({
  mainContainer: {
    width: "90%",
    alignItems: "center",
    borderRadius: 100,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#b180f0",

    //For IOS
    shadowColor: "white",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    //For Android
    elevation: 5,
  },

  idCircular: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 100,
  },

  baseText: {
    fontWeight: "bold",
    color: "white",
  },

  textInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 17,
    height: "100%",
    color: "white",
  },

  btnContainer: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
  },

  btnCircular: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
