import React, { Component, useState, useContext, useEffect} from 'react';
import { StyleSheet, Platform, View, Button, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, ListView,Dimensions, } from 'react-native';
import axios from "axios";
import ImagePicker from 'react-native-image-crop-picker';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LocalizationContext } from './../services/localization/LocalizationContext';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

function InserirP({route, navigation}){

    const { translations } = useContext(LocalizationContext);
    const parametro = route.params.parametro;
    const lat = route.params.lat;
    const long = route.params.long;

    const [dimensions, setDimensions] = useState({window, screen});

    const [img, setImagem] = useState([]);
    const [imgb64, setImgb64] = useState('');
    const [Tema, setTema] = useState('');
    const [Descricao, setDescricao]= useState('');


    const onChange = ({window, screen}) => {
        setDimensions({window, screen});
      };
    
      useEffect(() => {
        Dimensions.addEventListener('change', onChange);
        return () => {
          Dimensions.removeEventListener('change', onChange);
        };
      });

      
    function addPonto() {
        if (Tema.trim() === '' || Descricao.trim() === '' || img === '') {
          Alert.alert('Preencha todos os campos!');
        } else {
          adicionaPonto();
        }
      }

    function pickPhoto() {
        //Alert.alert('Tirar foto!');
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
          includeBase64: true,
        }).then((image) => {
          setImagem(image);
          setImgb64(image.data);
          console.log('erro');
        });
      }

      function adicionaPonto(){
        return axios.post('http://192.168.1.67:5000/ponto/criarPonto',{
            Tema: Tema,
            Descricao: Descricao,
            Imagem: img,
            Latitude: lat,
            Longitude:long,
            IdUtilizador: parametro
        }).then(response =>{
            console.log(response.data);
           navigation.navigate('Maps')
           // navigation.dispach(StackActions.replace('Mapa', {IdPonto: IdPonto, IdUtilizador:IdUtilizador, Tema:Tema, Descricao:Descricao}))
        }).catch(error=>{
            console.log(error);
        });
        
    }
    return (
        <View style={styles.MainContainer}>
          <TextInput
            placeholder={translations.Assunto}
            style={styles.TextInputStyleTitulo}
            underlineColorAndroid="transparent"
            onChangeText={(text) => setTema(text)}
          />
          <TextInput
            placeholder={translations.Descricao}
            style={
              dimensions.window.height > dimensions.window.width
                ? styles.TextInputStyleDesc
                : styles.TextInputStyleDescLand
            }
            multiline={true}
            underlineColorAndroid="transparent"
            onChangeText={(text) => setDescricao(text)}
          />
          <View
            style={
              dimensions.window.height > dimensions.window.width
                ? styles.containerVazio
                : styles.containerLand
            }>
            <View style={styles.containerImg}>
              <Image
                style={
                  dimensions.window.height > dimensions.window.width
                    ? styles.imagemStyle
                    : styles.imagemStyleLand
                }
                source={{uri: `data:${img.mime};base64,${img.data}`}}
              />
            </View>
            <View
              style={
                dimensions.window.height > dimensions.window.width
                  ? styles.containerBtns
                  : styles.containerBtnsLand
              }>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={pickPhoto}>
                <Text style={styles.text}>{translations.Foto}</Text>
              </TouchableOpacity>
    
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={addPonto}>
                <Text style={styles.text}>{translations.BotaoPonto}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      MainContainer: {
        flex: 1,
        backgroundColor: '#fff',
      },
      containerBtns: {
       flexDirection: 'row',
        justifyContent: 'center',
      },
      containerBtnsLand: {
           // justifyContent: 'center',
        marginRight: 135,
        flexDirection: 'row',
      },
      button: {
        width: 150,
        padding: 10,
        borderRadius: 2,
        margin: 12,
        marginTop: 0,
        backgroundColor: '#ffbf00',
      },
      text: {
        color: '#000',
        fontSize: 15,
        textAlign: 'center',
      },
      TextInputStyleTitulo: {
        borderWidth: 1,
        margin: 10,
        borderColor: '#000',
        height: 40,
        borderRadius: 2,
        marginBottom: 15,
        textAlign: 'left',
        marginLeft: 10,
        marginTop: 20,
      },
      TextInputStyleDesc: {
        height: 50,
        borderWidth: 1,
        margin: 10,
        borderColor: '#000',
        borderRadius: 2,
        marginBottom: 10,
        textAlignVertical: 'top',
      },
      TextInputStyleDescLand: {
        height: 50,
        borderWidth: 1,
        margin: 10,
        borderColor: '#000',
        borderRadius: 2,
        marginBottom: 0,
        textAlignVertical: 'top',
      },
      containerImg: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
      imagemStyle: {
        width: 200,
        height: 150,
        marginTop: 0,
        marginBottom: 10,
      },
      imagemStyleLand: {
        width: 150,
        height: 110,
      },
      containerVazio: {},
      containerLand: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });

export default InserirP;