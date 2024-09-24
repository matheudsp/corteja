import { Text, View, ScrollView} from "react-native";
import Constants from 'expo-constants'

import { Header } from "../components/header";
import { Banner } from "../components/banner";
import { Search } from "../components/search";
import { Section } from "../components/section";
import { EstablishmentVerticalList } from "../components/list";



const statusBarHeight = Constants.statusBarHeight;

export default function Index() {
  return (
    <ScrollView 
      style={{ flex: 1 }} 
      className="bg-slate-200" 
      showsVerticalScrollIndicator={false}
    >
      <View className="w-full px-4" style={{ marginTop: statusBarHeight + 8 }}>
        <Header/>

        <Banner/>

        <Search />        
      </View>
      <Section
        name="Último agendamento"
        label=""
        action={ () => console.log("CLICOU NO VEJA MAIS")}
        size="text-2xl"
      />

      <Section
        name="Próximos a você"
        label=""
        action={ () => console.log("CLICOU NO VEJA MAIS")}
        size="text-2xl"
      />
  
      <EstablishmentVerticalList/>

    </ScrollView>
  );
}