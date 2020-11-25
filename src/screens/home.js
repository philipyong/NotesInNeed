import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Filter, Header, Home, Note } from "../components";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { firebase } from "../firebase/config";

export default function HomeScreen({ navigation, logOutUser, extraData }) {
  const db = firebase.firestore();
  const [notes, setNotes] = useState([]);
  const [showingNotes, setShowingNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [tags, setTags] = useState([]);

  async function getNotes() {
    const notesRef = db
      .collection("users")
      .doc(extraData.id)
      .collection("notes")
      .orderBy("modified_date");
    var freshNotes = [];
    var freshTags = [];
    const snapshot = await notesRef.get();
    snapshot.forEach((doc) => {
      // console.log(doc.id, "=>", doc.data());
      var newJson = doc.data();
      newJson.id = doc.id;
      const { tags } = doc.data();
      freshTags.push(...tags);
      freshNotes.push(newJson);
    });
    setTags(Array.from(new Set(freshTags)));
    setNotes(freshNotes.reverse());
    setShowingNotes(freshNotes.reverse());
  }

  useEffect(() => {
    setLoading(true);
    const unsubscribe = navigation.addListener("focus", () => {
      getNotes();
    });
    setLoading(false);
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  function bgColorLeftSelector(index) {
    if (index % 4 === 0) {
      return "#01c5c4";
    } else if (index % 4 === 1) {
      return "#b8de6f";
    } else if (index % 4 === 2) {
      return "#e6d267";
    } else if (index % 4 === 3) {
      return "#f39233";
    } else {
      return "#01c5c4";
    }
  }

  function bgColorRightSelector(index) {
    if (index % 4 === 0) {
      return "#e84674";
    } else if (index % 4 === 1) {
      return "#ff9a8c";
    } else if (index % 4 === 2) {
      return "#f2c491";
    } else if (index % 4 === 3) {
      return "#adb36e";
    } else {
      return "#e84674";
    }
  }

  function onCreateButtonPress() {}

  function onSettingsButtonPress() {
    logOutUser();
    navigation.navigate("Login");
  }

  function dateFormatter(modifiedDate) {
    if (modifiedDate !== null) {
      var nDate = modifiedDate.toDate();
      var dd = nDate.getDate();

      var mm = nDate.getMonth() + 1;
      var yyyy = nDate.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }
      return dd + "/" + mm + "/" + yyyy;
    } else {
      var nDate = new Date();
      var dd = nDate.getDate();

      var mm = nDate.getMonth() + 1;
      var yyyy = nDate.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }
      return dd + "/" + mm + "/" + yyyy;
    }
  }

  async function deleteNote(id) {
    await db
      .collection("users")
      .doc(extraData.id)
      .collection("notes")
      .doc(id)
      .delete();

    getNotes();
  }

  function filterNotes(filterValue) {
    const items = [];

    for (const [index, value] of notes.entries()) {
      value.tags.includes(filterValue) ? items.push(value) : null;
    }

    setShowingNotes(items);
  }

  return (
    <Home>
      <Header>
        <Header.Group>
          <Header.Drawer onPress={() => setShowDelete(!showDelete)}>
            <Feather name="trash-2" size={24} color="black" />
          </Header.Drawer>
          <Header.Title>My Notes</Header.Title>
        </Header.Group>
        <Header.Group>
          <Header.Search onPress={() => alert("Search not Coded yet :p")}>
            <Feather name="search" size={24} color="black" />
          </Header.Search>
          <Header.Settings onPress={() => onSettingsButtonPress()}>
            <Feather name="log-out" size={24} color="black" />
          </Header.Settings>
        </Header.Group>
      </Header>
      <View>
        <Filter horizontal={true} showsHorizontalScrollIndicator={false}>
          {tags.map((item, index) => (
            <Filter.Option key={index} onPress={() => filterNotes(item)}>
              <Filter.Label>{item}</Filter.Label>
            </Filter.Option>
          ))}
        </Filter>
      </View>
      {!loading ? (
        showingNotes.length !== 0 ? (
          <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View>
                {showingNotes
                  .filter((_, i) => i % 2 === 0)
                  .map((item, index) => (
                    <Note
                      key={index}
                      backgroundC={bgColorLeftSelector(index)}
                      onPress={() =>
                        navigation.navigate("Modify", {
                          id: item.id,
                          title: item.title,
                          tags: item.tags,
                          body: item.body,
                        })
                      }
                    >
                      {showDelete ? (
                        <Note.Delete onPress={() => deleteNote(item.id)}>
                          <Feather name="minus" size={24} color="black" />
                        </Note.Delete>
                      ) : null}
                      <Note.Title numberOfLines={2}>{item.title}</Note.Title>
                      <Note.Date>
                        {dateFormatter(item["modified_date"])}
                      </Note.Date>
                      <Note.TagContainer>
                        {item.tags.map((tag, index) => (
                          <Note.TagBox key={index}>
                            <Note.Tag>{tag}</Note.Tag>
                          </Note.TagBox>
                        ))}
                      </Note.TagContainer>
                      <Note.Body numberOfLines={6}>{item.body}</Note.Body>
                    </Note>
                  ))}
              </View>
              <View>
                {showingNotes
                  .filter((_, i) => i % 2 !== 0)
                  .map((item, index) => (
                    <Note
                      key={index}
                      backgroundC={bgColorRightSelector(index)}
                      onPress={() =>
                        navigation.navigate("Modify", {
                          id: item.id,
                          title: item.title,
                          tags: item.tags,
                          body: item.body,
                        })
                      }
                    >
                      {showDelete ? (
                        <Note.Delete onPress={() => deleteNote(item.id)}>
                          <Feather name="minus" size={24} color="black" />
                        </Note.Delete>
                      ) : null}
                      <Note.Title numberOfLines={2}>{item.title}</Note.Title>
                      <Note.Date>
                        {dateFormatter(item["modified_date"])}
                      </Note.Date>
                      <Note.TagContainer>
                        {item.tags.map((tag, index) => (
                          <Note.TagBox key={index}>
                            <Note.Tag>{tag}</Note.Tag>
                          </Note.TagBox>
                        ))}
                      </Note.TagContainer>
                      <Note.Body numberOfLines={6}>{item.body}</Note.Body>
                    </Note>
                  ))}
              </View>
            </View>
          </ScrollView>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 30 }}>No Notes Found</Text>
          </View>
        )
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 30 }}>Loading</Text>
        </View>
      )}

      <TouchableOpacity
        style={{
          position: "absolute",
          alignSelf: "flex-end",
          bottom: 0,
          margin: 20,
        }}
        onPress={() => navigation.navigate("Create")}
      >
        <AntDesign
          name="pluscircle"
          size={70}
          color="#7dd3e5"
          style={{ marginRight: 20 }}
        />
      </TouchableOpacity>
    </Home>
  );
}
