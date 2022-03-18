import React, { useState } from "react";
import { StatusBar } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { format } from "date-fns";
import { useTheme } from "styled-components";

import { Button } from "../../components/Button";
import { BackButton } from "../../components/BackButton";
import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDateProps,
} from "../../components/Calendar";

import { CarDTO } from "../../dtos/Car.dto";
import { Car as CarModel } from "../../database/model/Car";
import { getPlatformDate } from "../../utils/getPlatformDate";

import ArrowSvg from "../../assets/arrow.svg";

import * as s from "./styles";

interface RentalPeriodProps {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarModel;
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>(
    {} as RentalPeriodProps
  );

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRentalPeriod() {
    navigation.navigate("SchedulingDetails", {
      car,
      dates: Object.keys(markedDates),
    });
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const startDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(
        getPlatformDate(new Date(startDate)),
        "dd/MM/yyyy"
      ),
      endFormatted: format(getPlatformDate(new Date(endDate)), "dd/MM/yyyy"),
    });
  }

  return (
    <s.Container>
      <s.Header>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <BackButton onPress={handleBack} color={theme.colors.shape} />

        <s.Title>
          Escolha uma data {"\n"}de início e fim {"\n"}do aluguel
        </s.Title>

        <s.RentalPeriod>
          <s.DateInfo>
            <s.DateTitle>DE</s.DateTitle>
            <s.DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </s.DateValue>
          </s.DateInfo>

          <ArrowSvg />

          <s.DateInfo>
            <s.DateTitle>ATÉ</s.DateTitle>
            <s.DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </s.DateValue>
          </s.DateInfo>
        </s.RentalPeriod>
      </s.Header>

      <s.Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </s.Content>

      <s.Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRentalPeriod}
          enabled={!!rentalPeriod.startFormatted}
        />
      </s.Footer>
    </s.Container>
  );
}
