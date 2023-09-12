import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";

import ThreadList from "./ThreadList";
import GroupList from "./GroupList";
import MessageList from "./MessageList";

const API_BASE_URL =
  "https://223nwk5397.execute-api.us-west-1.amazonaws.com/dev/api";

const getMemberships = (userId) => {
  return getFromApi(
    `${API_BASE_URL}/users/${userId}/memberships`,
    "memberships"
  );
};

const getThreads = (groupId) => {
  return getFromApi(`${API_BASE_URL}/groups/${groupId}/threads`, "threads");
};

const getMessages = (threadId) => {
  return getFromApi(`${API_BASE_URL}/threads/${threadId}/messages`, "messages");
};

const getFromApi = async (url, field) => {
  const response = await fetch(url);
  const json = await response.json();
  return json[field];
};

export default function App() {
  const [memberships, setMemberships] = useState(null);
  const [threads, setThreads] = useState(null);
  const [messages, setMessages] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [threadId, setThreadId] = useState(null);

  console.log("@@@@ App rendered!", {
    memberships,
    threads,
    groupId,
    threadId,
  });

  const userId = 123;

  useEffect(() => {
    getMemberships(userId).then(setMemberships);
  }, []);

  useEffect(() => {
    if (groupId !== null) {
      getThreads(groupId).then(setThreads);
    }
  }, [groupId]);

  useEffect(() => {
    if (threadId !== null) {
      getMessages(threadId).then(setMessages);
    }
  }, [threadId]);

  if (memberships === null) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  if (groupId === null) {
    return <GroupList memberships={memberships} changeGroup={setGroupId} />;
  }

  if (threadId === null) {
    return <ThreadList threads={threads} changeThread={setThreadId} />;
  }

  return <MessageList messages={messages} />;
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
