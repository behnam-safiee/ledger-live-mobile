import React from "react";
import { useTranslation } from "react-i18next";
import { Flex, Button, IconBoxList, Icons } from "@ledgerhq/native-ui";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const content = [
  "v3.onboarding.stepSetupDevice.pinCodeSetup.infoModal.bullets.0",
  "v3.onboarding.stepSetupDevice.pinCodeSetup.infoModal.bullets.1",
  "v3.onboarding.stepSetupDevice.pinCodeSetup.infoModal.bullets.2",
  "v3.onboarding.stepSetupDevice.pinCodeSetup.infoModal.bullets.3",
  "v3.onboarding.stepSetupDevice.pinCodeSetup.infoModal.bullets.4",
  "v3.onboarding.stepSetupDevice.pinCodeSetup.infoModal.bullets.5",
  "v3.onboarding.stepSetupDevice.pinCodeSetup.infoModal.bullets.6",
  "v3.onboarding.stepSetupDevice.pinCodeSetup.infoModal.bullets.7",
];

const OnboardingSetupDeviceInformation = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <Flex
      flex={1}
      justifyContent="space-between"
      backgroundColor="background.main"
    >
      <View>
        <IconBoxList
          items={[...content].slice(0, 4).map(item => ({
            title: t(item),
            Icon: () => <Icons.CheckAloneMedium color="success.c100" />,
          }))}
        />
        <Flex
          my={8}
          style={{ borderBottomColor: "black", borderBottomWidth: 1 }}
        />
        <IconBoxList
          items={[...content].slice(4, 8).map(item => ({
            title: t(item),
            Icon: () => <Icons.CloseMedium color="error.c100" />,
          }))}
        />
      </View>
      <Button type="main" size="large" onPress={navigation.goBack}>
        {t("v3.onboarding.stepSetupDevice.pinCodeSetup.cta")}
      </Button>
    </Flex>
  );
};

export default OnboardingSetupDeviceInformation;
