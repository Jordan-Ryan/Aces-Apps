import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { AppCard } from '../components/AppCard';
import { AppIdea, DUMMY_APPS } from '../data/apps';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.25;

export default function AppsScreen() {
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [gridMode, setGridMode] = useState(false);
  const translateX = useSharedValue(0);
  const rotateDeg = useSharedValue(0);
  const navigation = useNavigation();

  const currentApp: AppIdea | undefined = DUMMY_APPS[index];

  const onSwiped = useCallback((_direction: 'left' | 'right') => {
    setIndex((prev) => (prev + 1) % DUMMY_APPS.length);
    translateX.value = 0;
    rotateDeg.value = 0;
  }, []);

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { startX: number }>({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      rotateDeg.value = (translateX.value / width) * 12; // degrees
    },
    onEnd: () => {
      const shouldSwipe = Math.abs(translateX.value) > SWIPE_THRESHOLD;
      if (shouldSwipe) {
        const direction: 'left' | 'right' = translateX.value > 0 ? 'right' : 'left';
        translateX.value = withSpring(Math.sign(translateX.value) * width * 1.2, {}, () => {
          runOnJS(onSwiped)(direction);
        });
      } else {
        translateX.value = withSpring(0);
        rotateDeg.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotateDeg.value}deg` },
    ],
  }));

  useEffect(() => {
    const anyNav: any = navigation;
    const sub = anyNav.addListener('tabPress', (e: any) => {
      if (anyNav.isFocused && anyNav.isFocused()) {
        e?.preventDefault?.();
        setGridMode((prev) => !prev);
      }
    });
    return sub;
  }, [navigation]);

  if (!currentApp) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No more apps</Text>
      </View>
    );
  }

  if (gridMode) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.grid}>
          {DUMMY_APPS.map((app, i) => (
            <Pressable key={app.id} style={styles.gridItem} onPress={() => { setIndex(i); setGridMode(false); }}>
              <AppCard app={app} onOpenDetails={() => { setIndex(i); setGridMode(false); }} previewUrl={app.previewUrl} isGrid />
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.cardContainerFull, animatedStyle]}>
          <AppCard
            app={currentApp}
            onOpenDetails={() => setShowModal(true)}
            fullScreen
            previewUrl={currentApp.previewUrl}
          />
        </Animated.View>
      </PanGestureHandler>

      <Modal visible={showModal} transparent animationType="slide" onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{currentApp?.name}</Text>
            <Text style={styles.modalText}>Placeholder details about this app idea.</Text>
            <Text style={styles.modalClose} onPress={() => setShowModal(false)}>
              Close
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  cardContainerFull: { flex: 1 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingTop: 10,
    gap: 10,
  },
  gridItem: {
    width: '48%',
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 16, color: '#6b7280' },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: { backgroundColor: 'white', borderRadius: 16, padding: 20, width: '100%' },
  modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  modalText: { fontSize: 15, color: '#4b5563', marginBottom: 12 },
  modalClose: { color: '#2563eb', fontWeight: '600', textAlign: 'right' },
});

