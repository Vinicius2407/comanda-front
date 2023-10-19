import React, { Component, useState } from "react";
import { Text, View, FlatList, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../../CartReducer";

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
    amountTaken: 4,
  },
  {
    id: 3,
    name: "Salmon fillet",
    price: 16,
    amountTaken: 2,
  },
  {
    id: 4,
    name: "Greens",
    price: 3,
    amountTaken: 3,
  },
  {
    id: 5,
    name: "Rye Bread",
    price: 20,
    amountTaken: 1,
  },
];

class Item extends Component {
  _renderItem({ item, index }) {
    const {
      containerStyle,
      lastItemStyle,
      imageStyle,
      textStyle,
      counterStyle,
      priceStyle,
    } = styles;

    const addItemToCart = (item) => {
      dispatch(addToCart(item));
    };

    const removeItemFromCart = (item) => {
      dispatch(removeFromCart(item));
    };

    const increaseQuantity = (item) => {
      dispatch(incrementQuantity(item));
    };

    const cart = useSelector((state) => state.cart.cart);
    console.log(cart);

    return (
      <View style={index + 1 === data.length ? lastItemStyle : containerStyle}>
        <View style={textStyle}>
          <Text style={{ color: "#2e2f30" }}>{item.name}</Text>
          <View style={priceStyle}>
            <Text style={{ color: "#2e2f30", fontSize: 12 }}>
              ${item.price}
            </Text>
          </View>
        </View>

        <View style={counterStyle}>
          <Icon.Button
            /*onPress={() => decreaseQuantity(item)}*/
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

          <Text>{item.amountTaken}</Text>

          <Icon.Button
            onPress={() => increaseQuantity(item)}
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
    );
  }

  render() {
    return (
      <FlatList
        data={data}
        renderItem={this._renderItem}
        keyExtractor={(item) => item.id}
      />
    );
  }
}

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

export default Item;
