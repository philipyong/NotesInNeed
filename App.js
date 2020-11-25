import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { decode, encode } from "base-64";
import {
  CreateScreen,
  HomeScreen,
  LoginScreen,
  RegistrationScreen,
} from "./src/screens";
import { firebase } from "./src/firebase/config";
import ModifyScreen from "./src/screens/modify";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <></>;
  }

  function logOut() {
    firebase.auth().signOut();
    setUser(null);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" options={{ headerShown: false }}>
              {(props) => (
                <HomeScreen
                  {...props}
                  extraData={user}
                  logOutUser={() => logOut()}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Create" options={{ headerShown: false }}>
              {(props) => <CreateScreen {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="Modify" options={{ headerShown: false }}>
              {(props) => <ModifyScreen {...props} extraData={user} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
