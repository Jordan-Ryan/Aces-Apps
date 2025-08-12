import React, { useMemo, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, Theme, createNavigationContainerRef } from '@react-navigation/native';
import AppsScreen from '../screens/AppsScreen';
import PlaceholderScreen from '../screens/PlaceholderScreen';
import { Ionicons } from '@expo/vector-icons';
import { enableScreens } from 'react-native-screens';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

enableScreens();

const Tab = createBottomTabNavigator();

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f8fafc',
  },
};

export default function RootNavigator() {
  const navigationRef = useMemo(() => createNavigationContainerRef(), []);
  const [currentRoute, setCurrentRoute] = useState<string | undefined>();
  const [showCreate, setShowCreate] = useState(false);

  return (
    <NavigationContainer
      theme={theme}
      ref={navigationRef}
      onReady={() => setCurrentRoute(navigationRef.getCurrentRoute()?.name)}
      onStateChange={() => setCurrentRoute(navigationRef.getCurrentRoute()?.name)}
    >
      <Tab.Navigator
        initialRouteName="Apps"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#111827',
          tabBarInactiveTintColor: '#9ca3af',
          tabBarStyle: { height: 64, paddingBottom: 10 },
          tabBarIcon: ({ color }) => {
            const nameMap: Record<string, keyof typeof Ionicons.glyphMap> = {
              Apps: 'albums',
              Components: 'grid-outline',
              Ideas: 'bulb-outline',
              Settings: 'settings-outline',
            };
            const iconName = nameMap[route.name] ?? 'albums';
            return <Ionicons name={iconName} size={22} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Apps" component={AppsScreen} />
        <Tab.Screen name="Components" children={() => <PlaceholderScreen title="Components" />} />
        <Tab.Screen name="Ideas" children={() => <PlaceholderScreen title="Ideas" />} />
        <Tab.Screen name="Settings" children={() => <PlaceholderScreen title="Settings" />} />
      </Tab.Navigator>

      {currentRoute !== 'Settings' && (
        <TouchableOpacity
          onPress={() => setShowCreate(true)}
          activeOpacity={0.85}
          style={styles.fab}
          accessibilityLabel="Create new"
        >
          <View style={styles.fabInner}> 
            <Ionicons name="add" size={28} color="#ffffff" />
          </View>
        </TouchableOpacity>
      )}

      <Modal
        visible={showCreate}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCreate(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Create</Text>
            <TouchableOpacity style={styles.modalBtn} onPress={() => setShowCreate(false)}>
              <Text style={styles.modalBtnText}>New App Idea</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBtn} onPress={() => setShowCreate(false)}>
              <Text style={styles.modalBtnText}>New Component</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBtn} onPress={() => setShowCreate(false)}>
              <Text style={styles.modalBtnText}>New Idea</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowCreate(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 18,
    alignSelf: 'center',
    zIndex: 50,
  },
  fabInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    borderWidth: 4,
    borderColor: '#f8fafc',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 18,
  },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10, color: '#111827' },
  modalBtn: {
    paddingVertical: 12,
  },
  modalBtnText: { fontSize: 16, color: '#111827' },
  modalCancel: { textAlign: 'right', color: '#2563eb', fontWeight: '600', marginTop: 8 },
});

