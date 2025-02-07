import { Tabs } from 'expo-router';
import React, { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabLayout() {
  const screenOptions = useMemo(() => ({
    tabBarActiveTintColor: '#FFFFFF',
    tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
    headerShown: false,
    tabBarButton: HapticTab,
    tabBarStyle: {
      backgroundColor: '#4285F4',
      height: 80,
      paddingBottom: 20,
      paddingTop: 10,
      borderTopWidth: 0,
        position: 'absolute' as ViewStyle['position'],
      bottom: 0,
      left: 0,
      right: 0,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    tabBarLabelStyle: {
      fontSize: 14,
        fontWeight: '500' as const,
    }
  }), []);

  return (
    <Tabs screenOptions={screenOptions}>


        <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
        />
        <Tabs.Screen
        name="booking"
        options={{
          title: 'Appointments',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar" color={color} />,
        }}
        />
        <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="message.fill" color={color} />,
        }}
        />
        <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
        />
    </Tabs>
  );
}
