import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import { AppProvider, useApp } from './context/AppContext';
import PokemonScreen from './screens/PokemonScreen';
import DetalhesScreen from './screens/DetalhesScreen';
import FavoritosScreen from './screens/FavoritosScreen';
import ConfiguracoesScreen from './screens/ConfiguracoesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Stack: lista de Pokémon -> detalhes
function PokemonStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Lista" component={PokemonScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Detalhes" component={DetalhesScreen} />
    </Stack.Navigator>
  );
}

// Tabs: Pokémon e Favoritos
function Abas() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="PokemonTab"
        component={PokemonStack}
        options={{
          title: 'Pokémon',
          tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritosScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

// Drawer: Início (abas) e Configurações
function Rotas() {
  const { temaEscuro } = useApp();

  return (
    <NavigationContainer theme={temaEscuro ? DarkTheme : DefaultTheme}>
      <StatusBar style={temaEscuro ? 'light' : 'dark'} />
      <Drawer.Navigator>
        <Drawer.Screen name="Pokédex" component={Abas} />
        <Drawer.Screen name="Configurações" component={ConfiguracoesScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <Rotas />
      </AppProvider>
    </SafeAreaProvider>
  );
}
