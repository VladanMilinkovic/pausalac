import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

type CenteredContainerProps = PropsWithChildren;

export function CenteredContainer({ children }: CenteredContainerProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
