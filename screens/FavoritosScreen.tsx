import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useApp } from '../context/AppContext';

export default function FavoritosScreen() {
  const { colors } = useTheme();
  const { favoritos, alternarFavorito } = useApp();

  if (favoritos.length === 0) {
    return (
      <View style={styles.vazio}>
        <Text style={{ color: colors.text }}>Nenhum Pokémon favoritado ainda.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favoritos}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.lista}
      renderItem={({ item }) => (
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Image source={{ uri: item.imagem }} style={styles.imagem} />
          <Text style={[styles.nome, { color: colors.text }]}>{item.nome}</Text>
          <TouchableOpacity onPress={() => alternarFavorito(item)}>
            <Text style={styles.remover}>Remover</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  vazio: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  lista: { padding: 16, gap: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  imagem: { width: 60, height: 60, marginRight: 12 },
  nome: { flex: 1, fontSize: 18, fontWeight: 'bold', textTransform: 'capitalize' },
  remover: { color: '#e53935', fontWeight: 'bold' },
});
