import React from "react";
import { Layout, Text, Modal } from "@ui-kitten/components";
import { StyleSheet, View, Dimensions } from "react-native";
import { usePromiseTracker } from "react-promise-tracker";
// import { UIActivityIndicator } from 'react-native-indicators';

const window = Dimensions.get("window");

const spinners = () => (
  <Layout style={styles.layoutContainer} level="1">
    {/* <UIActivityIndicator color='#09427A' size={50} /> */}
  </Layout>
);

export const LoadingIndicator = React.memo((props: any) => {
  const { promiseInProgress } = usePromiseTracker({ area: props.area });

  return (
    <View>
      {promiseInProgress === true ? (
        <Modal
          backdropStyle={styles.backdrop}
          onBackdropPress={() => {}}
          visible={true}
        >
          <Layout level="1" style={styles.modalContainer}>
            <Text>Cargando...</Text>
            {spinners()}
          </Layout>
        </Modal>
      ) : (
        <></>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  layoutContainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 256,
    minWidth: window.width - 70,
    padding: 16,
    borderRadius: 5,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
});
