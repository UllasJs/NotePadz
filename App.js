import "react-native-gesture-handler";
import Home from "./src/home";
import Addnote from "./src/addnote";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "./src/header";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Home}
          name="Home"
          options={{
            headerTitle: () => <Header name="Notes" />,
            headerStyle: {
              backgroundColor: "#1d2c38",
              height: 120,
            },
          }}
        />
        <Stack.Screen
          component={Addnote}
          name="AddNote"
          options={{
            headerTitle: () => <Header name="Notes" />,
            headerStyle: {
              backgroundColor: "#1d2c38",
              height: 120,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
