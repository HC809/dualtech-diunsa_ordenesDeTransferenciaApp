import React from "react";
import { Layout, Modal, Button, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { styles } from "../../theme/appTheme";
import { DANGER_COLOR_500 } from "../../constants/shared";

interface ModalProps {
  setVisibleModal: (v: boolean) => any;
  visibleModal: boolean;
  title: string;
  text: string;
  itemName: string;
  loading: boolean;
  handleDelete: () => any;
}

export const DeleteModal = React.memo(
  ({
    visibleModal,
    setVisibleModal,
    title,
    text,
    itemName,
    loading,
    handleDelete,
  }: ModalProps) => {
    return (
      <Modal
        backdropStyle={styles.redBackdrop}
        onBackdropPress={() => {
          setVisibleModal(false);
        }}
        visible={visibleModal}
      >
        <Layout level="2" style={styles.modalContainer}>
          <Text category="h5">{title}</Text>
          <View
            style={{
              borderColor: DANGER_COLOR_500,
              borderWidth: 1,
              width: "100%",
              marginBottom: 10,
            }}
          />
          <Text style={{ textAlign: "center" }} category="s1">
            ¿{text}
            <Text style={{ fontWeight: "bold" }}>{itemName}</Text>?
          </Text>

          <View style={styles.buttonRowContainer}>
            <Button
              status="basic"
              style={styles.modalButton}
              onPress={() => {
                setVisibleModal(false);
              }}
              size="medium"
              appearance="outline"
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              status="danger"
              onPress={handleDelete}
              style={styles.modalButton}
              size="medium"
              disabled={loading}
            >
              Eliminar
            </Button>
          </View>
        </Layout>
      </Modal>
    );
  }
);
