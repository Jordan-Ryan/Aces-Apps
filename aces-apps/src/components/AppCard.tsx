import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { WebsitePreview } from './WebsitePreview';
import { AppIdea, AppStatus } from '../data/apps';

const statusToColor: Record<AppStatus, string> = {
  Idea: '#7c3aed',
  MVP: '#2563eb',
  Development: '#ea580c',
  Complete: '#16a34a',
};

type Props = {
  app: AppIdea;
  onOpenDetails: () => void;
  fullScreen?: boolean;
  previewUrl?: string;
  isGrid?: boolean;
};

export function AppCard({ app, onOpenDetails, fullScreen = false, previewUrl, isGrid = false }: Props) {
  return (
    <View style={[styles.card, fullScreen && styles.cardFullScreen, isGrid && styles.cardGrid]}>
      {fullScreen ? (
        <View style={styles.headerRow}>
          <Text style={[styles.title, styles.titleFull]}>{app.name}</Text>
          <View style={[styles.badge, { backgroundColor: statusToColor[app.status] }]}>
            <Text style={styles.badgeText}>{app.status}</Text>
          </View>
        </View>
      ) : (
        <>
          <Text style={[styles.title, styles.titleGrid]} numberOfLines={2}>
            {app.name}
          </Text>
          <View style={styles.badgeRow}>
            <View style={[styles.badge, { backgroundColor: statusToColor[app.status] }]}>
              <Text style={styles.badgeText}>{app.status}</Text>
            </View>
          </View>
        </>
      )}
      <Text style={[styles.description, fullScreen && styles.descriptionFull]} numberOfLines={isGrid ? 2 : 3}>
        {app.description}
      </Text>
      {fullScreen && (
        <View style={styles.homePreview}>
          {previewUrl ? (
            <WebsitePreview url={previewUrl} />
          ) : null}
        </View>
      )}
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${app.progress}%` }]} />
      </View>
      <Pressable onPress={onOpenDetails} style={({ pressed }) => [styles.detailsBtn, pressed && { opacity: 0.8 }]}>
        <Text style={styles.detailsBtnText}>Details</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '92%',
    alignSelf: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  cardFullScreen: {
    width: '100%',
    flex: 1,
    borderRadius: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  cardGrid: {
    width: '100%',
    alignSelf: 'auto',
    padding: 12,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  title: { fontSize: 22, fontWeight: '700', color: '#111827' },
  titleFull: { fontSize: 28 },
  titleGrid: { fontSize: 18, alignSelf: 'flex-start' },
  description: { fontSize: 15, color: '#4b5563', marginBottom: 12, alignSelf: 'flex-start' },
  descriptionFull: { fontSize: 16 },
  badgeRow: { marginTop: 6, marginBottom: 6, alignItems: 'flex-start' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, alignSelf: 'flex-start' },
  badgeText: { color: 'white', fontSize: 12, fontWeight: '600' },
  progressBarBg: { height: 8, backgroundColor: '#e5e7eb', borderRadius: 999, overflow: 'hidden', marginBottom: 12 },
  progressBarFill: { height: '100%', backgroundColor: '#22c55e' },
  homePreview: {
    flex: 1,
    marginTop: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  detailsBtn: { marginTop: 6, alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, backgroundColor: '#111827' },
  detailsBtnText: { color: 'white', fontWeight: '600' },
});
