import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import { CenteredContainer } from "../components/CenteredContainer";

export function HomeScreen(): React.JSX.Element {
  return (
    <CenteredContainer>
      <Text style={styles.title}>Subscription Tracker MVP</Text>
      <Text style={styles.subtitle}>Expo + TypeScript baseline is ready.</Text>
      <StatusBar style="auto" />
    </CenteredContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
  },
});
