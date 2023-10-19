import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import TotalComponent from "../../components/TotalComponent";
import Icon from "react-native-vector-icons/Ionicons";

const Cardapio = () => {
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  const dispatch = useDispatch();

  const {
    containerStyle,
    lastItemStyle,
    imageStyle,
    textStyle,
    counterStyle,
    priceStyle,
  } = styles;

  const data = [
    {
      id: 1,
      name: "Orange",
      price: 10,
      amountTaken: 3,
    },
    {
      id: 2,
      name: "Tomato",
      price: 5,
    },
    {
      id: 3,
      name: "Salmon fillet",
      price: 16,
    },
    {
      id: 4,
      name: "Greens",
      price: 3,
    },
    {
      id: 5,
      name: "Rye Bread",
      price: 20,
    },
  ];

  const increaseQuantity = (item) => {
    dispatch(increaseQuantity(item));
  };
  const decreaseQuantity = (item) => {
    dispatch(decreaseQuantity(item));
  };

  return (
    <ScrollView>
      <Header />
      <Text style={{ textAlign: "center", fontSize: 16 }}>Redux Cart</Text>
      {data.map((item) => (
        <Pressable
          key={item.id}
          style={{ flexDirection: "row", alignIItems: "center" }}
        >
          <View>
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>

            <Pressable>
              <Text
                style={{
                  borderColor: "gray",
                  borderWidth: 1,
                }}
              >
                ADD TO CART
              </Text>
            </Pressable>
            <View style={counterStyle}>
              <Icon.Button
                onPress={alert("ola")}
                name="ios-remove"
                size={25}
                color="#fff"
                backgroundColor="#fff"
                style={{
                  borderRadius: 15,
                  backgroundColor: "#bbb",
                  height: 30,
                  width: 30,
                }}
                iconStyle={{ marginRight: 0 }}
              />

              <Text>{item.quantity}</Text>

              <Icon.Button
                onPress={console.log("tchau")}
                name="ios-add"
                size={25}
                color="#fff"
                backgroundColor="#fff"
                style={{
                  borderRadius: 15,
                  backgroundColor: "#bbb",
                  height: 30,
                  width: 30,
                }}
                iconStyle={{ marginRight: 0 }}
              />
            </View>
          </View>
        </Pressable>
      ))}

      <Footer />
    </ScrollView>
  );
};

const styles = {
  containerStyle: {
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  lastItemStyle: {
    flexDirection: "row",
    flex: 1,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  imageStyle: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  textStyle: {
    flex: 2,
    justifyContent: "center",
  },
  priceStyle: {
    backgroundColor: "#ddd",
    width: 40,
    alignItems: "center",
    marginTop: 3,
    borderRadius: 3,
  },
  counterStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
};

export default Cardapio;
