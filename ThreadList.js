import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";

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
};

export default function ThreadList({ threads, changeThread }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={threads}
        renderItem={({ item }) => (
          <ThreadItem
            title={item.title}
            threadId={item.thread_id}
            changeThread={changeThread}
          />
        )}
        keyExtractor={(item) => item.thread_id}
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
