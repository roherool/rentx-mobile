import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNetInfo } from "@react-native-community/netinfo";
import { synchronize } from "@nozbe/watermelondb/sync";

import { RootStackParamList } from "../../routes/app.stack.routes";
import { CarDTO } from "../../dtos/Car.dto";

import { api } from "../../services/api";
import { database } from "../../database";
import { Car as CarModel } from "../../database/model/Car";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { LoadAnimation } from "../../components/LoadAnimation";

import * as s from "./styles";

export function Home() {
  const [cars, setCars] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();
  const navigation = useNavigation<RootStackParamList>();

  function handleCarDetails(car: CarModel) {
    navigation.navigate("CarDetails", { car });
  }

  async function offLineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );

        const { changes, latestVersion } = data;
        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        if (user.updated.length > 0) {
          await api.post("/users/sync", user);
        }
      },
    });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const carCollection = database.get<CarModel>("cars");
        const cars = await carCollection.query().fetch();

        if (isMounted) {
          setCars(cars);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offLineSynchronize();
    }
  }, [netInfo.isConnected]);

  return (
    <s.Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <s.Header>
        <s.HeaderContent>
          <Logo height={RFValue(12)} width={RFValue(108)} />
          {!loading && <s.TotalCars>Total de {cars.length} carros</s.TotalCars>}
        </s.HeaderContent>
      </s.Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <s.CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </s.Container>
  );
}
