import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon, IconElement, IconProps } from "@ui-kitten/components";
import {
  PRIMARY_COLOR_500,
  DANGER_COLOR_500,
  PRIMARY_COLOR_700,
} from "../../constants/shared";

export const UserIcon = (props: IconProps): IconElement => (
  <Icon {...props} name={"people-outline"} />
);

export const LockIcon = (props: IconProps): IconElement => (
  <Icon {...props} name={"lock-outline"} />
);

export const EyeIcon = (props: IconProps): IconElement => (
  <Icon {...props} name={"eye-outline"} />
);

export const EyeOffIcon = (props: IconProps): IconElement => (
  <Icon {...props} name={"eye-off"} />
);

export const HomeIcon = (props: IconProps) => (
  <Icon {...props} name="home-outline" />
);

export const ConfigIcon = (props: IconProps) => (
  <Icon {...props} name="settings-outline" />
);

export const ReloadIcon = (props: IconProps): IconElement => (
  <Icon {...props} name={"refresh-outline"} />
);

export const PeopleIcon = (props: IconProps) => (
  <Icon {...props} name="people-outline" />
);

export const ActivoIcon = (props: IconProps): IconElement => (
  <Icon
    {...props}
    height={18}
    width={18}
    fill={PRIMARY_COLOR_500}
    name={"checkmark-circle-2-outline"}
  />
);

export const InactivoIcon = (props: IconProps): IconElement => (
  <Icon
    {...props}
    height={18}
    width={18}
    fill={DANGER_COLOR_500}
    name={"close-circle-outline"}
  />
);

export const ClockIcon = (props: IconProps): IconElement => (
  <Icon {...props} name={"clock-outline"} />
);

export const SyncIcon = (props: IconProps): IconElement => (
  <Icon {...props} name={"sync-outline"} />
);

export const DeleteIcon = (props: IconProps): IconElement => (
  <TouchableOpacity>
    <Icon {...props} fill={DANGER_COLOR_500} name={"trash-outline"} />
  </TouchableOpacity>
);

export const MenuIcon = (props: IconProps): IconElement => (
  <Icon {...props} name={"more-vertical"} />
);

export const UploadIcon = (props: IconProps): IconElement => (
  <Icon {...props} name={"cloud-upload-outline"} />
);

export const UploadDisabledIcon = (props: IconProps): IconElement => (
  <Icon {...props} name={"cloud-upload-outline"} fill="#8F9BB3" />
);

export const ProductosIcon = (props: IconProps): IconElement => (
  <Icon {...props} name={"grid-outline"} />
);

export const AddIcon = (props: IconProps): IconElement => (
  <TouchableOpacity>
    <Icon {...props} fill={PRIMARY_COLOR_700} name={"plus-square-outline"} />
  </TouchableOpacity>
);
