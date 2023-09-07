import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";

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

const getMemberships = async () => {
  const url = `${API_BASE_URL}/users/123/memberships`;
  const response = await fetch(url);
  console.log("@@@@", response);
  const json = await response.json();
  console.log("@@@@", json);
  return json.memberships;
};

const getThreads = async (groupId) => {
  const url = `${API_BASE_URL}/groups/${groupId}/threads`;
  const response = await fetch(url);
  console.log("@@@@", response);
  const json = await response.json();
  console.log("@@@@", json);
  return json.threads;
};

const GroupItem = ({ title, groupId, changeGroup }) => {
  
  const log = useCallback(() => {
    changeGroup(groupId);
  }, [groupId]);

  return (
    <Pressable onPress={log}>
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
    );
}

const ThreadItem = ({ title, threadId, changeThread }) => {
  
  const log = useCallback(() => {
    changeThread(threadId);
  }, [threadId]);

  return (
    <Pressable onPress={log}>
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
    );
}

export default function App() {
  const [users, setUsers] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [threadId, setThreadId] = useState(null);
  console.log('Hello ', groupId);

  // move???
  useEffect(() => {
    getMemberships().then(setUsers);
  }, [setUsers]);

  if (users === null) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else if(groupId === null) {
    return (<GroupList users={users} changeGroup={setGroupId}/>);
  }

  // then what?
  useEffect(() => {
    getThreads(groupId).then(setUsers);
  }, [setUsers]);

  return (<ThreadList users={users} changeThread={setThreadId}/>);
}

// TODO: rename users
function ThreadList({users, changeThread}) {

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <ThreadItem title={item.title} threadId={item.thread_id} changeThread={changeThread}/>}
        keyExtractor={(item) => item.thread_id}
      />
      <StatusBar style="auto" />
    </View>
  );
}

// TODO: rename users
function GroupList({users, changeGroup}) {

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <GroupItem title={item.group_name} groupId={item.group_id} changeGroup={changeGroup}/>}
        keyExtractor={(item) => item.membership_id}
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
    alignItems: "center",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
