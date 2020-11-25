import React, { useState } from "react";
import { firebase } from "../firebase/config";
import { Feather } from "@expo/vector-icons";
import { Header, Home, Workspace } from "../components";

export default function CreateScreen({ navigation, extraData }) {
  const db = firebase.firestore();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState(["NEW TAG"]);
  const [body, setBody] = useState("");

  function onAddButtonPress() {
    if (title === "") {
      alert("Title is Empty");
    } else if (tags.length === 0) {
      alert("Please add a Tag");
    } else if (body === "") {
      alert("Body is Empty");
    } else {
      db.collection("users").doc(extraData.id).collection("notes").add({
        title: title,
        tags: tags,
        body: body,
        modified_date: firebase.firestore.FieldValue.serverTimestamp(),
      });

      navigation.navigate("Home");
    }
  }

  function onAddTagButtonPress() {
    setTags(["NEW TAG", ...tags]);
  }

  function onModifyTag(text, index) {
    var newIndex = tags.slice();
    newIndex[index] = text;
    setTags(newIndex);
  }

  function checkRemoveTag(index) {
    var newIndex = tags.slice();
    newIndex[index] = newIndex[index].toUpperCase();
    newIndex = newIndex.filter((item) => item !== "");
    setTags(newIndex);
  }

  return (
    <Home>
      <Header>
        <Header.Group>
          <Header.Drawer onPress={() => navigation.navigate("Home")}>
            <Feather name="arrow-left" size={24} color="black" />
          </Header.Drawer>
          <Header.Title>Create A Note</Header.Title>
        </Header.Group>
        <Header.Group>
          <Header.Search onPress={() => onAddButtonPress()}>
            <Feather name="save" size={24} color="black" />
          </Header.Search>
        </Header.Group>
      </Header>
      <Workspace style={{ flex: 1, width: "100%" }}>
        <Workspace.InputTitle
          placeholder="Add a Title"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setTitle(text)}
          value={title}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Workspace.TagContainer
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <Workspace.AddTag onPress={() => onAddTagButtonPress()}>
            <Feather name="plus" size={20} color="black" />
          </Workspace.AddTag>
          {tags.length > 0
            ? tags.map((item, index) => (
                <Workspace.TagBox key={index}>
                  <Workspace.Tag
                    onChangeText={(text) => onModifyTag(text, index)}
                    value={item}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onEndEditing={() => checkRemoveTag(index)}
                  />
                </Workspace.TagBox>
              ))
            : null}
        </Workspace.TagContainer>
        <Workspace.BodyContainer>
          <Workspace.InputBody
            multiline
            placeholder="Start Writing!"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setBody(text)}
            value={body}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </Workspace.BodyContainer>
      </Workspace>
    </Home>
  );
}
