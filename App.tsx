import 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import type { ComponentProps } from 'react';

import { AppProvider } from './src/context/AppContext';
import { AnonymousQuestionPage } from './src/pages/AnonymousQuestionPage';
import { ContentDetailPage } from './src/pages/ContentDetailPage';
import { ContentsPage } from './src/pages/ContentsPage';
import { CyclePage } from './src/pages/CyclePage';
import { LifeStagesPage } from './src/pages/LifeStagesPage';
import { NotFoundPage } from './src/pages/NotFoundPage';
import { ProfilePage } from './src/pages/ProfilePage';
import { RemindersPage } from './src/pages/RemindersPage';
import { SupportPage } from './src/pages/SupportPage';
import { SymptomsPage } from './src/pages/SymptomsPage';
import { TodayPage } from './src/pages/TodayPage';
import type {
  MainTabParamList,
  RootStackParamList,
} from './src/utils/navigationTypes';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const screenTitles: Record<keyof MainTabParamList, string> = {
  Today: 'Hoje',
  Cycle: 'Ciclo',
  Contents: 'Conteudos',
  Profile: 'Perfil',
};

const tabIcons: Record<
  keyof MainTabParamList,
  ComponentProps<typeof Ionicons>['name']
> = {
  Today: 'home',
  Cycle: 'calendar',
  Contents: 'book',
  Profile: 'person',
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#be185d',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#f9a8d4',
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons color={color} name={tabIcons[route.name]} size={size} />
        ),
      })}
    >
      <Tab.Screen
        component={TodayPage}
        name="Today"
        options={{ title: screenTitles.Today }}
      />
      <Tab.Screen
        component={CyclePage}
        name="Cycle"
        options={{ title: screenTitles.Cycle }}
      />
      <Tab.Screen
        component={ContentsPage}
        name="Contents"
        options={{ title: screenTitles.Contents }}
      />
      <Tab.Screen
        component={ProfilePage}
        name="Profile"
        options={{ title: screenTitles.Profile }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="MainTabs"
          screenOptions={{
            contentStyle: { backgroundColor: '#fff7fb' },
            headerShown: false,
          }}
        >
          <Stack.Screen component={MainTabs} name="MainTabs" />
          <Stack.Screen component={ContentDetailPage} name="ContentDetail" />
          <Stack.Screen
            component={AnonymousQuestionPage}
            name="AnonymousQuestion"
          />
          <Stack.Screen component={SymptomsPage} name="Symptoms" />
          <Stack.Screen component={RemindersPage} name="Reminders" />
          <Stack.Screen component={SupportPage} name="Support" />
          <Stack.Screen component={LifeStagesPage} name="LifeStages" />
          <Stack.Screen component={NotFoundPage} name="NotFound" />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
