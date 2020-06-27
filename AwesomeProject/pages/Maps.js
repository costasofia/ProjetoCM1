import React, { useEffect, useState, componentDidMount, useNativeDriver, useContext } from 'react';
import { View, Map, Text, Button, StyleSheet, Image, Alert, TouchableOpacity, actionButtuon, } from 'react-native';
import { StackAActions, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LocalizationContext } from './../services/localization/LocalizationContext';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from "axios";

let images = 'http://192.168.1.67:5000/'

function Maps({ route, navigation }) {
    const { translations } = useContext(LocalizationContext);
    const parametro = route.params.parametro;
    const [ponto, setPonto] = useState([]);
    const [Latitude, setLatitude] = useState('');
    const [Longitude, setLongitude] = useState('');
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    let reload = false

    function getPontos() {
        return axios.get('http://192.168.1.67:5000/ponto/getPontos')
            .then(function (response) {
                setPonto(response.data),
                    setLoading(false)
                ponto.map(ponto => {
                    console.log(ponto);
                })
            }.bind(this))
            .catch((error) => {
                console.log(error);
            });
    }

    const [initialPosition, setInitialPosition] = useState(
        {
            latitude: 0.0,
            longitude: 0.0,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
        });
    /*  const [markerPosition, setMarkerPosition] = useState(
          {
              latitude: 41.693447,
              longitude: -8.846955,
          });*/

    const handleSuccess = position => {
        var lat = parseFloat(position.coords.latitude)
        var long = parseFloat(position.coords.longitude)

        var initialRegion = {
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
        }
        setInitialPosition(initialRegion);
        setLatitude(lat);
        setLongitude(long);
        //    setMarkerPosition(initialRegion);
    };

    const handleError = error => {
        setError(error.message);
    };

    useEffect(() => {
        getPontos();
        Geolocation.getCurrentPosition(handleSuccess, handleError);
        const watchId = Geolocation.watchPosition(handleSuccess, handleError);
        return () => Geolocation.clearWatch(watchId);
    }, []);

    return (
        /*<View>
            <Text>
            {parametro}
            </Text>
        </View>*/
        <View style={styles.container}>


            <MapView
                showsUserLocation
                zoomControlEnabled
                showsScale
                showsPointsOfInterest={true}
                showsMyLocationButton

                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={initialPosition}

            >
                {ponto && ponto.map(marker =>
                    <Marker
                        key={marker.IdUtilizador}
                        coordinate={{
                            latitude: marker.Latitude,
                            longitude: marker.Longitude
                        }}>
                        <Callout>
                            <View style={styles.callout}>
                                <Image style={styles.image}
                                    source={{ uri: images + marker.Imagem }} />
                                <View style={styles.callout2}>
                                    <Text>
                                    {translations.Assunto}: {marker.Tema}
                                    </Text>
                                    <Text>
                                    {translations.Descricao}: {marker.Descricao}
                                    </Text>
                                </View>
                            </View>
                        </Callout>

                    </Marker>

                )
                }

            </MapView>

            <TouchableOpacity
                     onPress={() => navigation.dispatch(StackActions.replace('Login'))
                }
                style={styles.btnListaEsquerda}>
                <Image
                    source={require('./../imagens/saida.png')}
                    style={styles.FloatingButtonStyle}
                />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('ListagemP',{parametro})}
                style={styles.btnListaDireita}>
                <Image
                    source={require('./../imagens/registo.png')}
                    style={styles.FloatingButtonStyle}
                />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('InserirP', {
                        parametro,
                        lat: Latitude,
                        long: Longitude,
                    })
                }
                style={styles.btnPlus}>
                <Image
                    source={require('./../imagens/mais.png')}
                    style={styles.FloatingButtonStyle}
                />
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //  ...StyleSheet.absoluteFillObject,
        //  height: '100%',
    },
    map: {
        flex: 1,
    },
    callout: {
        flex: 1,
        flexDirection: 'row',
    },
    callout2: {
        flex: 1,
        flexDirection: 'column',
    },
    image: {
        flex: 1,
        height: 80,
        width: 80,
    },
    header: {
        flex: 0.095,

    },
    actionButtonIcon: {
        fontSize: 16,
        height: 16,
        color: 'white',
    },
    botao: {
        paddingLeft: 7,
    },
    btnListaDireita: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 120,
        bottom: 20,
    },
    btnPlus: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 220,
        bottom: 20,
    },
    btnListaEsquerda: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        left: 30,
        bottom: 20,
    },

    FloatingButtonStyle: {
        //backgroundColor:'gray',
        resizeMode: 'contain',
        width: 40,
        height: 40,
        //backgroundColor:'black'
    },

});
export default Maps;