import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useApp } from '../context/AppContext';

export default function ConfiguracoesScreen() {
  const { colors } = useTheme();
  const { temaEscuro, alternarTema } = useApp();

  return (
    <View style={styles.container}>
      <View style={[styles.linha, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.texto, { color: colors.text }]}>Tema escuro</Text>
        <Switch value={temaEscuro} onValueChange={alternarTema} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  texto: { fontSize: 18 },
});
