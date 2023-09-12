import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";

const MessageItem = ({ created, sender, message }) => {
  const createdDate = new Date(created * 1000);

  return (
    <View style={styles.item}>
      <Text style={styles.created}>Created: {createdDate.toISOString()}</Text>
      <Text style={styles.sender}>Sender: {sender}</Text>
      <Text style={styles.message}>Message: {message}</Text>
    </View>
  );
};

export default function MessageList({ messages }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageItem
            created={item.time_created}
            sender={item.sender_name}
            message={item.message_text}
          />
        )}
        keyExtractor={(item) => item.message_id}
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
