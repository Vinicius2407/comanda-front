import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from '../screens/Register'
import Login from '../screens/Login'
import Home from '../screens/Home'
import ShoppingCart from '../screens/ShoppingCart'

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Register"
                component={Register}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown: false}}
            />
            
            <Stack.Screen
                name="ShoppingCart"
                component={ShoppingCart}
                options={{headerShown: false}}
            />



        </Stack.Navigator>
    )
}