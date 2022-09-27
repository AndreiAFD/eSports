import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

import LogoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";
import { styles } from "./styles";
import { GameParams } from "../../@types/navigation";
import { THEME } from "../../theme";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { useEffect, useState } from "react";

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const route = useRoute();
  const game = route.params as GameParams;
  const navgation = useNavigation();

  function handleGoBack() {
    navgation.goBack();
  }

  console.log(game);

  useEffect(() => {
    fetch(`http://192.168.1.2:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((resp) => setDuos(resp));
  }, []);
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={LogoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>
        <Image source={{ uri: game.bannerURL }} style={styles.cover} />
        <Heading
          title={game.title}
          subtitle="Conecte-se para começar a jogar!"
        />
        <FlatList
          data={duos}
          renderItem={({ item }) => (
            <DuoCard data={{ ...item }} key={item.id} onConnect={() => {}} />
          )}
          keyExtractor={({ id }) => id}
          horizontal
          style={[styles.containerList]}
          contentContainerStyle={[
            styles.contentsList,
            duos.length === 0 && styles.emptyListContainer,
          ]}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}
