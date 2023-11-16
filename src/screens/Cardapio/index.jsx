import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import api from '../../services/api';

const ItemCardapioComponent = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        /*ABAIXO: PLANO B
            fetch('https://60a1-2001-1284-f033-a5bc-5555-3ae2-7c9d-f714.ngrok-free.app/cardapios');
            .then((res)=>res.json())
            .then(resJson=>{
                console.log('items',resJson)
                setItems(resJson);
            }).catch(e=>{console.log(e)})
        }
        */
        try { 
            //ABAIXO: PLANO C 
            //const response = await axios.get('https://60a1-2001-1284-f033-a5bc-5555-3ae2-7c9d-f714.ngrok-free.app/cardapios');
            const response = await api.get('/cardapios');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching menu items: ', error);
        }
    };

return (
    <View>
        <Text>Itens do cardápio:</Text>
        <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <View>
                <View>
                    <Text>Nome: {item.nome}</Text>
                    <Text>categoria: {item.categoria}</Text>
                    <Text>Preço: R$ {item.valor}</Text>
                </View>
                <TouchableOpacity style={styles.btnEditar}>
                    <Text>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnRemover}>
                    <Text>Remover</Text>
                </TouchableOpacity>
            </View>
            )}
        />
    </View>
  );
};

const styles=StyleSheet.create({
    btnRemover:{
        backgroundColor: '#ffb4a8',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnEditar:{
        backgroundColor: '#a39795',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default ItemCardapioComponent;
