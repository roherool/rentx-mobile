import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useNetInfo } from "@react-native-community/netinfo";

import { format } from "date-fns";
import { useTheme } from "styled-components";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

import { api } from "../../services/api";
import { CarDTO } from "../../dtos/Car.dto";
import { getAcessoryIcon } from "../../utils/getAcessoryIcon";
import { getPlatformDate } from "../../utils/getPlatformDate";

import * as s from "./styles";

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriodProps {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>(
    {} as RentalPeriodProps
  );

  const theme = useTheme();
  const netInfo = useNetInfo();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.price);

  async function handleConfirmRental() {
    setLoading(true);

    await api
      .post("rentals", {
        user_id: 1,
        car_id: car.id,
        start_Date: new Date(dates[0]),
        end_Date: new Date(dates[dates.length - 1]),
        total: rentTotal,
      })
      .then(() => {
        navigation.navigate("Confirmation", {
          nextScreenRoute: "Home",
          title: "Carro Alugado!",
          message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
        });
      })
      .catch(() => {
        setLoading(false);
        Alert.alert("Não foi possível confirmar o agendamento");
      });
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if (netInfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [netInfo.isConnected]);

  return (
    <s.Container>
      <s.Header>
        <BackButton onPress={handleBack} />
      </s.Header>

      <s.CarImages>
        <ImageSlider
          imagesUrl={
            !!carUpdated.photos
              ? carUpdated.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </s.CarImages>

      <s.Content>
        <s.Details>
          <s.Description>
            <s.Brand>{car.brand}</s.Brand>
            <s.Name>{car.name}</s.Name>
          </s.Description>

          <s.Rent>
            <s.Period>{car.period}</s.Period>
            <s.Price>R$ {car.price}</s.Price>
          </s.Rent>
        </s.Details>

        {carUpdated.accessories && (
          <s.Accessories>
            {carUpdated.accessories.map((accessory) => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAcessoryIcon(accessory.type)}
              />
            ))}
          </s.Accessories>
        )}

        <s.RentalPeriod>
          <s.CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </s.CalendarIcon>
          <s.DateInfo>
            <s.DateTitle>DE</s.DateTitle>
            <s.DateValue>{rentalPeriod.start}</s.DateValue>
          </s.DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(15)}
            color={theme.colors.text}
          />

          <s.DateInfo>
            <s.DateTitle>ATÉ</s.DateTitle>
            <s.DateValue>{rentalPeriod.end}</s.DateValue>
          </s.DateInfo>
        </s.RentalPeriod>

        <s.RentalPrice>
          <s.RentalPriceLabel>TOTAL</s.RentalPriceLabel>
          <s.RentalPriceDetails>
            <s.RentalPriceQuota>
              {`R$ ${car.price} x${dates.length} diárias`}
            </s.RentalPriceQuota>
            <s.RentalPriceTotal>R$ {rentTotal}</s.RentalPriceTotal>
          </s.RentalPriceDetails>
        </s.RentalPrice>
      </s.Content>

      <s.Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </s.Footer>
    </s.Container>
  );
}
