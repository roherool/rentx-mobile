import React, { useEffect, useState } from "react";
import { StatusBar, FlatList } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";

import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";
import { LoadAnimation } from "../../components/LoadAnimation";

import { Car as CarModel } from "../../database/model/Car";
import { api } from "../../services/api";

import * as s from "./styles";

interface DataProps {
  id: string;
  car: CarModel;
  start_date: string;
  end_date: string;
}

export function MyCars() {
  const [cars, setCars] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const screenIsFocus = useIsFocused();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/rentals");
        const dataFormatted = response.data.map((data: DataProps) => {
          return {
            id: data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date), "dd/MM/yyyy"),
            end_date: format(parseISO(data.end_date), "dd/MM/yyyy"),
          };
        });
        setCars(dataFormatted);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [screenIsFocus]);

  return (
    <s.Container>
      <s.Header>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <BackButton onPress={handleBack} color={theme.colors.shape} />

        <s.Title>Seus agendamentos, {"\n"}estão aqui.</s.Title>

        <s.SubTitle>Conforto, segurança e praticidade</s.SubTitle>
      </s.Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <s.Content>
          <s.Appointments>
            <s.AppointmentsTitle>Meus agendamentos</s.AppointmentsTitle>
            <s.AppointmentsQuantity>{cars.length}</s.AppointmentsQuantity>
          </s.Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <s.CarWrapper>
                <Car data={item.car} />
                <s.CarFooter>
                  <s.CarFooterTitle>Período</s.CarFooterTitle>
                  <s.CarFooterPeriod>
                    <s.CarFooterDate>{item.start_date}</s.CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <s.CarFooterDate>{item.end_date}</s.CarFooterDate>
                  </s.CarFooterPeriod>
                </s.CarFooter>
              </s.CarWrapper>
            )}
          />
        </s.Content>
      )}
    </s.Container>
  );
}
