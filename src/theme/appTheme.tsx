import { StyleSheet, Dimensions } from "react-native";

const window = Dimensions.get("window");

export const styles = StyleSheet.create({
  //#region General
  flex: {
    flex: 1,
  },
  flexLayout: {
    flex: 1,
    padding: 16,
  },
  centerLayout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  redBackdrop: {
    backgroundColor: "rgba(255, 0, 0, 0.3)",
  },
  dividerColor: {
    backgroundColor: "#CC5701",
  },
  generalTextColor: {
    color: "#01847F",
  },
  rowFlexView: {
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    padding: 4,
  },
  paddingListItem: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  headerItemRowView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowView: {
    paddingVertical: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 4,
  },
  buttonRowContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  //#endregion GENERAL
  //#region MODALS
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 256,
    minWidth: window.width - 70,
    padding: 15,
    borderRadius: 10,
  },
  modalButton: {
    marginHorizontal: 5,
    width: "45%",
  },
  //#endregion MODALS

  //#region FORMS
  formikInput: {
    paddingTop: 2,
  },
  inputLabel: {
    paddingTop: 20,
  },
  errorText: {
    fontSize: 12,
    color: "red",
  },
  //#endregion FORMS

  textInput: {
    height: 40,
    width: "100%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  loginText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    paddingVertical: 10,
  },
});
