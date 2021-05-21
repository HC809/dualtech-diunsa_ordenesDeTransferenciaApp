import React from "react";
import { Modal, Layout, Text, Icon } from "@ui-kitten/components";
import { View } from "react-native";
//Models
import { IModalProps } from "../../models/shared/IModalProps";
//Styles
import { styles } from "../../theme/appTheme";

export const SuccessRegisterModal = ({
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
            name="checkmark-circle-outline"
            fill="#21B000"
            width={32}
            height={32}
          />
          <Text style={{ marginHorizontal: 10 }} category="h5">
            Success Modal
          </Text>
        </View>
        <View
          style={{
            borderColor: "#21B000",
            borderWidth: 1,
            width: "100%",
            marginBottom: 10,
          }}
        />
        <Text category="s1" style={{ textAlign: "center" }}>
          Success!!!
        </Text>
      </Layout>
    </Modal>
  );
};
