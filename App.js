import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

const API_BASE_URL =
  "https://223nwk5397.execute-api.us-west-1.amazonaws.com/dev/api";

const getUsers = async () => {
  const url = `${API_BASE_URL}/users`;
  const response = await fetch(url);
  console.log("@@@@", response);
  const json = await response.json();
  console.log("@@@@", json);
  return json.users;
};

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function App() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  if (users === null) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <Item title={item.name} />}
        keyExtractor={(item) => item.user_id}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
