import { StyleSheet, Text, View } from 'react-native';

type PlaceholderPageProps = {
  title: string;
  description?: string;
};

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Migracao em andamento</Text>
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
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
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
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
