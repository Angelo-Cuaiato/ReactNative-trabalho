import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { PokemonResumo } from '../context/AppContext';

const IDS = [1, 4, 7]; // Bulbasaur, Charmander e Squirtle

export default function PokemonScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [pokemons, setPokemons] = useState<PokemonResumo[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarPokemons() {
      try {
        const respostas = await Promise.all(
          IDS.map((id) => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((r) => r.json()))
        );
        setPokemons(
          respostas.map((p) => ({
            id: p.id,
            nome: p.name,
            imagem: p.sprites.other['official-artwork'].front_default,
          }))
        );
      } catch (erro) {
        console.log('Erro ao buscar Pokémon:', erro);
      } finally {
        setCarregando(false);
      }
    }
    buscarPokemons();
  }, []);

  if (carregando) {
    return <ActivityIndicator size="large" style={styles.centro} />;
  }

  return (
    <View style={styles.container}>
      {pokemons.map((pokemon) => (
        <TouchableOpacity
          key={pokemon.id}
          style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => navigation.navigate('Detalhes', { id: pokemon.id })}
        >
          <Image source={{ uri: pokemon.imagem }} style={styles.imagem} />
          <Text style={[styles.nome, { color: colors.text }]}>{pokemon.nome}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1 },
  container: { flex: 1, padding: 16, gap: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  imagem: { width: 80, height: 80, marginRight: 16 },
  nome: { fontSize: 20, fontWeight: 'bold', textTransform: 'capitalize' },
});
