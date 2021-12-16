import React, { useCallback } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Trans } from "react-i18next";
import styled from "styled-components/native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { getOperationAmountNumber } from "@ledgerhq/live-common/lib/operation";
import {
  getMainAccount,
  getAccountCurrency,
  getAccountName,
  getAccountUnit,
} from "@ledgerhq/live-common/lib/account";

import {
  Account,
  Operation,
  AccountLike,
} from "@ledgerhq/live-common/lib/types";

import {Box, Flex, Text} from "@ledgerhq/native-ui";

import debounce from "lodash/debounce";
import LText from "./LText";
import CurrencyUnitValue from "./CurrencyUnitValue";
import CounterValue from "./CounterValue";

import OperationIcon from "./OperationIcon";
import { ScreenName } from "../const";
import OperationRowDate from "./OperationRowDate";
import LiveLogo from "../icons/LiveLogoIcon";
import Spinning from "./Spinning";

import perFamilyOperationDetails from "../generated/operationDetails";

const ContainerTouchable = styled(Flex).attrs((p) => ({
  height: "64px",
  flexDirection: "row",
  alignItems: "center",
  marginBottom: p.isLast ? "24px" : "0px",
  px: 0,
  py: 6,
}))``;

const Wrapper = styled(Flex).attrs(p => ({
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginLeft: 4,
  marginRight: 0,
  opacity: p.isOptimistic ? 0.5 : 1,
}))``;

type Props = {
  operation: Operation;
  parentAccount: Account | undefined | null;
  account: AccountLike;
  multipleAccounts?: boolean;
  isLast: boolean;
  isSubOperation?: boolean;
};

const placeholderProps = {
  width: 40,
  containerHeight: 20,
};

export default function OperationRow({
  account,
  parentAccount,
  operation,
  isSubOperation,
  multipleAccounts,
  isLast,
}: Props) {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const goToOperationDetails = debounce(() => {
    const params = [
      ScreenName.OperationDetails,
      {
        accountId: account.id,
        parentId: parentAccount && parentAccount.id,
        operation, // FIXME we should pass a operationId instead because data can changes over time.
        isSubOperation,
        key: operation.id,
      },
    ];

    /** if suboperation push to stack navigation else we simply navigate */
    if (isSubOperation) navigation.push(...params);
    else navigation.navigate(...params);
  }, 300);

  const renderAmountCellExtra = useCallback(() => {
    const mainAccount = getMainAccount(account, parentAccount);
    const currency = getAccountCurrency(account);
    const unit = getAccountUnit(account);
    const specific = mainAccount.currency.family
      ? perFamilyOperationDetails[mainAccount.currency.family]
      : null;

    const SpecificAmountCell =
      specific && specific.amountCell
        ? specific.amountCell[operation.type]
        : null;

    return SpecificAmountCell ? (
      <SpecificAmountCell
        operation={operation}
        unit={unit}
        currency={currency}
      />
    ) : null;
  }, [account, parentAccount, operation]);

  const amount = getOperationAmountNumber(operation);
  const valueColor = amount.isNegative() ? "neutral.c100" : "success.c100";
  const currency = getAccountCurrency(account);
  const unit = getAccountUnit(account);

  const text = <Trans i18nKey={`operations.types.${operation.type}`} />;
  const isOptimistic = operation.blockHeight === null;
  const spinner = (
    <View style={styles.spinner}>
      <Spinning>
        <LiveLogo color={colors.grey} size={10} />
      </Spinning>
    </View>
  );

  return (
    <ContainerTouchable as={TouchableOpacity} isLast={isLast} onPress={goToOperationDetails}>
      <View style={isOptimistic ? styles.optimistic : null}>
        <OperationIcon
          size={40}
          operation={operation}
          account={account}
          parentAccount={parentAccount}
        />
      </View>

      <Wrapper isOptimistic={isOptimistic}>
        <View style={styles.bodyLeft}>
          <Text
            variant="body"
            fontWeight="semiBold"
            color="neutral.c100"
            numberOfLines={1}
          >
            {multipleAccounts ? getAccountName(account) : text}
          </Text>

          {isOptimistic ? (
            <View style={styles.optimisticRow}>
              {spinner}
              <Text
                numberOfLines={1}
                variant="paragraph"
                fontWeight="medium"
                color="neutral.c70"
              >
                <Trans
                  i18nKey={
                    amount.isNegative()
                      ? "operationDetails.sending"
                      : "operationDetails.receiving"
                  }
                />
              </Text>
            </View>
          ) : (
            <Text numberOfLines={1} color="neutral.c70" variant="paragraph" fontWeight="medium">
              {text} <OperationRowDate date={operation.date} />
            </Text>
          )}
        </View>

        <View style={styles.bodyRight}>{renderAmountCellExtra()}</View>

        {amount.isZero() ? null : (
          <View style={styles.bodyRight}>
            <Text
              numberOfLines={1}
              color={valueColor}
              variant="body"
              fontWeight="semiBold"
            >
              <CurrencyUnitValue
                showCode
                unit={unit}
                value={amount}
                alwaysShowSign
              />
            </Text>
            <Text variant="paragraph" fontWeight="medium" color="neutral.c70"> 
              <CounterValue
                showCode
                date={operation.date}
                currency={currency}
                value={amount}
                alwaysShowSign
                withPlaceholder
                placeholderProps={placeholderProps}
              />
            </Text>
          </View>
        )}
      </Wrapper>
    </ContainerTouchable>
  );
}

const styles = StyleSheet.create({
  last: {
    borderBottomWidth: 0,
  },
  body: {
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1,
  },
  topRow: {
    fontSize: 14,
    flex: 1,
  },
  bottomRow: {
    fontSize: 14,
    flex: 1,
  },
  optimisticRow: { flexDirection: "row", alignItems: "center" },
  bodyLeft: {
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "flex-start",
    flexGrow: 1,
    flexShrink: 1,
  },
  bodyRight: {
    alignItems: "flex-end",
    flexDirection: "column",
    justifyContent: "flex-start",
    flexShrink: 0,
    paddingLeft: 6,
  },
  spinner: {
    height: 14,
    marginRight: 4,
    justifyContent: "center",
  },
});
