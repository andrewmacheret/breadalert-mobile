import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";

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
};

export default function GroupList({ memberships, changeGroup }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={memberships}
        renderItem={({ item }) => (
          <GroupItem
            title={item.group_name}
            groupId={item.group_id}
            changeGroup={changeGroup}
          />
        )}
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
