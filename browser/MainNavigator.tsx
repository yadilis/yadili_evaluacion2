import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegistroScreen from "../screens/RegistroScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import OperationsScreen from "../screens/OperationsScreen";
import HistoryScreen from "../screens/HistoryScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack= createStackNavigator()
const Tab = createBottomTabNavigator()

function MyStack(){
    return (
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Login" component={ LoginScreen} 
            options={()=> ({headerShown: false})}/>
            <Stack.Screen name="Registro" component={ RegistroScreen} />
            <Stack.Screen name="Welcome" component={ MyTab} />
        </Stack.Navigator>
    )
} 

function MyTab(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Welcome" component={ WelcomeScreen}/>
            <Tab.Screen name='Operaciones' component={ OperationsScreen}/>
            <Tab.Screen name= 'Historia' component={ HistoryScreen}/>
            <Tab.Screen name= 'Perfil' component={ ProfileScreen}/>
        </Tab.Navigator> )
        
    
}

export default function Navegador(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}