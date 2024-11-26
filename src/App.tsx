import React, { useEffect, useMemo, useCallback } from "react";
import { StatusBar, TouchableOpacity, ActivityIndicator, Platform, View } from "react-native";
import { AccountScreen, MemoizedListings, Messages, CreateListing, Home, ListingDetails } from "./screens";
import Register from "./screens/auth/Register";
import Login from "./screens/auth/Login";

import SystemNavigationBar from "react-native-system-navigation-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconMI from "react-native-vector-icons/MaterialIcons";
import { useAuth } from "./context/auth";
import { useNetInfo } from "@react-native-community/netinfo";

const App = () => {
  const Stack = useMemo(() => createNativeStackNavigator(), []);
  const Tab = useMemo(() => createBottomTabNavigator(), []);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const { user, loading } = useAuth();

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    SystemNavigationBar.setNavigationColor("white");
  }, []);

  const AuthStack = React.memo(() => (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerStyle: { backgroundColor: "transparent" },
        headerBlurEffect: "light",
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  ));

  const ListingStack = React.memo(() => (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerStyle: { backgroundColor: "transparent" },
        headerTitle: "",
      }}
      initialRouteName="Listing"
    >
      <Stack.Screen
        name="Listing"
        component={MemoizedListings}
        options={{
          headerShown: !netInfo.isConnected && !netInfo.isInternetReachable,
          headerTitle: "No Internet Connection",
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 15 },
          headerStyle: { backgroundColor: "red" },
          statusBarBackgroundColor: "black",
        }}
      />
      <Stack.Screen
        name="ListingDetails"
        component={ListingDetails}
        options={({ route }) => ({
          presentation: "containedModal",
          animation: "slide_from_right",
          headerTitle: route?.params?.item?.title || "Details",
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "#ff4135",
        })}
      />
    </Stack.Navigator>
  ));

  const AccountStack = React.memo(() => (
    <Stack.Navigator
      screenOptions={{
        animation: "fade",
        headerTransparent: true,
        headerStyle: { backgroundColor: "transparent" },
        headerTitle: "",
      }}
      initialRouteName="AccountScreen"
    >
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{
          headerBlurEffect: "regular",
          headerLeft: ({ canGoBack }) =>
            Platform.OS === "android" &&
            canGoBack && (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#ffffffc8",
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "grey",
                    borderWidth: 0.2,
                  }}
                >
                  <IconMI name="arrow-back" size={20} style={{ width: 20 }} />
                </View>
              </TouchableOpacity>
            ),
        }}
      />
    </Stack.Navigator>
  ));

  const MainTabNavigator = React.memo(() => (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        animation: "shift",
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          width: "100%",
          backgroundColor: "white",
          height: 50 + insets.bottom,
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "#707070",
      }}
    >
      <Tab.Screen
        name="Feed"
        component={ListingStack}
        options={{
          tabBarIcon: ({ size, color }) => <Icon name="store" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="CreateListing"
        component={CreateListing}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              style={{
                bottom: 10,
                width: 60,
                height: 60,
                backgroundColor: focused ? "#ff4135" : "#ccc",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
                borderWidth: 5,
                borderColor: "#eee",
              }}
              onPress={() => navigation.navigate("CreateListing")}
            >
              <IconMI name="add-circle" size={30} color={"white"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AccountStack}
        options={{
          tabBarIcon: ({ size, color }) => <Icon name="account" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  ));

  const LoadingScreen = () => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );

  const AuthNavigator = React.memo(() => (
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  ));

  const MainNavigator = React.memo(() => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainTabNavigator} />
    </Stack.Navigator>
  ));

  return loading ? <LoadingScreen /> : !user ? <AuthNavigator /> : <MainNavigator />;
};

export default App;
