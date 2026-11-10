import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useApp } from '../context/AppContext';

type Detalhes = {
  id: number;
  nome: string;
  imagem: string;
  tipos: string[];
  altura: number;
  peso: number;
};

export default function DetalhesScreen({ route, navigation }: any) {
  const { id } = route.params;
  const { colors } = useTheme();
  const { ehFavorito, alternarFavorito } = useApp();
  const [pokemon, setPokemon] = useState<Detalhes | null>(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((resposta) => resposta.json())
      .then((p) => {
        setPokemon({
          id: p.id,
          nome: p.name,
          imagem: p.sprites.other['official-artwork'].front_default,
          tipos: p.types.map((t: any) => t.type.name),
          altura: p.height / 10, // a API retorna em decímetros
          peso: p.weight / 10, // a API retorna em hectogramas
        });
        navigation.setOptions({ title: p.name });
      })
      .catch((erro) => console.log('Erro ao buscar detalhes:', erro));
  }, [id]);

  if (!pokemon) {
    return <ActivityIndicator size="large" style={styles.centro} />;
  }

  const favorito = ehFavorito(pokemon.id);

  return (
    <View style={styles.container}>
      <Image source={{ uri: pokemon.imagem }} style={styles.imagem} />
      <Text style={[styles.nome, { color: colors.text }]}>{pokemon.nome}</Text>
      <Text style={[styles.info, { color: colors.text }]}>Tipo: {pokemon.tipos.join(', ')}</Text>
      <Text style={[styles.info, { color: colors.text }]}>Altura: {pokemon.altura} m</Text>
      <Text style={[styles.info, { color: colors.text }]}>Peso: {pokemon.peso} kg</Text>

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: favorito ? '#888' : '#e53935' }]}
        onPress={() =>
          alternarFavorito({ id: pokemon.id, nome: pokemon.nome, imagem: pokemon.imagem })
        }
      >
        <Text style={styles.textoBotao}>
          {favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Text style={{ color: colors.primary }}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1 },
  container: { flex: 1, alignItems: 'center', padding: 16 },
  imagem: { width: 200, height: 200 },
  nome: { fontSize: 28, fontWeight: 'bold', textTransform: 'capitalize', marginBottom: 12 },
  info: { fontSize: 18, marginBottom: 6, textTransform: 'capitalize' },
  botao: { marginTop: 20, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  textoBotao: { color: '#fff', fontWeight: 'bold' },
  voltar: { marginTop: 16 },
});
