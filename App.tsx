import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.eyebrow}>Minha Saude Feminina</Text>
      <Text style={styles.title}>Migracao mobile em preparacao</Text>
      <Text style={styles.description}>
        A estrutura Expo ja esta pronta para receber a navegacao e as telas
        migradas.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
    backgroundColor: '#fff7fb',
  },
  eyebrow: {
    color: '#9d174d',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    color: '#3f1232',
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  description: {
    color: '#6b4f5f',
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 320,
    textAlign: 'center',
  },
});
