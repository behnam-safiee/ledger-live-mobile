import React from "react";
import { useTranslation } from "react-i18next";
import { Button, NumberedList } from "@ledgerhq/native-ui";

const items = [
  {
    title: "v3.onboarding.stepSetupDevice.pinCodeInstructions.bullets.0.title",
    desc: "v3.onboarding.stepSetupDevice.pinCodeInstructions.bullets.0.desc",
  },
  {
    title: "v3.onboarding.stepSetupDevice.pinCodeInstructions.bullets.1.title",
    desc: "v3.onboarding.stepSetupDevice.pinCodeInstructions.bullets.1.desc",
  },
];

const PinCodeInstructionsScene = ({ onNext }: { onNext: () => void }) => {
  const { t } = useTranslation();

  return (
    <>
      <NumberedList
        items={items.map(item => ({
          title: t(item.title),
          description: t(item.desc),
        }))}
      />
      <Button type="main" size="large" onPress={onNext}>
        {t("v3.onboarding.stepSetupDevice.pinCode.cta")}
      </Button>
    </>
  );
};

export default PinCodeInstructionsScene;
