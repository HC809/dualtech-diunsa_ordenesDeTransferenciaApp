import React from "react";
import { Modal, Layout, Text, Icon } from "@ui-kitten/components";
import { View } from "react-native";
//Models
import { IModalProps } from "../../models/shared/IModalProps";
//Styles
import { styles } from "../../theme/appTheme";

export const ErrorRegisterModal = ({
  visibleModal,
  setVisibleModal,
}: IModalProps) => {
  return (
    <Modal
      backdropStyle={styles.backdrop}
      onBackdropPress={() => {
        setVisibleModal(false);
      }}
      visible={visibleModal}
    >
      <Layout level="2" style={styles.modalContainer}>
        <View style={styles.rowFlexView}>
          <Icon
            name="close-circle-outline"
            fill="#F40707"
            width={32}
            height={32}
          />
          <Text style={{ marginHorizontal: 10 }} category="h5">
            Error Modal
          </Text>
        </View>
        <View
          style={{
            borderColor: "#F40707",
            borderWidth: 1,
            width: "100%",
            marginBottom: 10,
          }}
        />
        <Text category="s1" style={{ textAlign: "center" }}>
          Error!!!
        </Text>
      </Layout>
    </Modal>
  );
};
