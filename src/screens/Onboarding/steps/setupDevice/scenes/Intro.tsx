import React from "react";
import { useTranslation } from "react-i18next";
import { Flex, Text, Button, IconBoxList, Icons } from "@ledgerhq/native-ui";

const items = [
  {
    title: "v3.onboarding.stepSetupDevice.start.bullets.0.label",
    Icon: Icons.ClockMedium,
  },
  {
    title: "v3.onboarding.stepSetupDevice.start.bullets.1.label",
    Icon: Icons.PenMedium,
  },
  {
    title: "v3.onboarding.stepSetupDevice.start.bullets.2.label",
    Icon: Icons.CoffeeMedium,
  },
];

const setupDeviceIntroScene = ({ onNext }: { onNext: () => void }) => {
  const { t } = useTranslation();

  return (
    <>
      <Flex>
        <Text variant="h2" mb={10} style={{ textTransform: "uppercase" }}>
          {t("v3.onboarding.stepSetupDevice.start.title")}
        </Text>
        <IconBoxList
          items={items.map(item => ({ ...item, title: t(item.title) }))}
        />
      </Flex>
      <Button type="main" size="large" onPress={onNext}>
        {t("v3.onboarding.stepSetupDevice.start.cta")}
      </Button>
    </>
  );
};

export default setupDeviceIntroScene;
