/* @flow */
import React, { useCallback, useContext } from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import type {
  Account,
  AccountLikeArray,
} from "@ledgerhq/live-common/lib/types";
import { TrackScreen } from "../../../analytics";
import { ScreenName } from "../../../const";

import type { SwapRouteParams } from "..";
import SendRowsFee from "../../../components/SendRowsFee";
import NavigationScrollView from "../../../components/NavigationScrollView";
import { SwapDataContext } from "../SwapDataProvider";

type Props = {
  accounts: Account[],
  allAccounts: AccountLikeArray,
  navigation: any,
  route: { params: SwapRouteParams },
};

export default function SelectFees({ navigation, route }: Props) {
  const { transaction } = route.params;
  const { swapData: { swap } = {} } = useContext(SwapDataContext);
  const { provider } = route.params;
  const { from: { account, parentAccount } = {} } = swap || {};

  const onSetTransaction = useCallback(
    updatedTransaction => {
      navigation.navigate(ScreenName.SwapForm, {
        ...route.params,
        transaction: updatedTransaction,
      });
    },
    [navigation, route.params],
  );

  return (
    <SafeAreaView style={[styles.root]}>
      <TrackScreen category="Swap Form" name="Edit Fees" provider={provider} />
      <NavigationScrollView>
        {account && (
          <SendRowsFee
            setTransaction={onSetTransaction}
            account={account}
            parentAccount={parentAccount}
            transaction={transaction}
            navigation={navigation}
            route={{
              ...route,
              params: {
                ...route.params,
                accountId: account.id,
                parentAccountId: parentAccount?.id,
                currentNavigation: ScreenName.SwapForm,
              },
            }}
          />
        )}
      </NavigationScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
  },
});