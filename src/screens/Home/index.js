import React, { useState, useEffect, useRef} from 'react';
import { View, Image, Text, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator, 
        Dimensions, Share, Linking, TouchableWithoutFeedback} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Feather} from '@expo/vector-icons'
import ActionTip from 'react-native-action-tips';
import { AppLoading } from 'expo';

import api from '../../services/api'

import { useTheme } from 'react-native-paper'

import logo from '../../assets/logo.png'
import headerRegular from '../../assets/headerRegular.png'
import headerSmall from '../../assets/headerSmall.png'
import aspas from '../../assets/aspas.png'

import {
    AdMobBanner,
    setTestDeviceIDAsync
  } from 'expo-ads-admob';

import styles from './styles'

import { 
    useFonts,
    Lemonada_300Light,
    Lemonada_600SemiBold,
} from '@expo-google-fonts/lemonada'
import { Platform } from 'react-native';

export default function Home() {

    let [fontsLoaded] = useFonts({
        Lemonada_300Light,
        Lemonada_600SemiBold,
    });

    const { colors } = useTheme()

    const [phrase, setPhrase] = useState('')
    const [autor, setAutor] = useState('')
    const [loading, setLoading] = useState(false)
    const [publi, setPubli] = useState(false)

    const actionTipRef = useRef(null);

    const dimenssionHeight = Dimensions.get('window').height

    function pastePhrase(){
        getPhrase()
    }

    useEffect(() => {
        setPlatformPubli()
        getPhrase()
    }, [])


    async function setPlatformPubli(){
        if(Platform.OS == 'ios') {
            setPubli('ca-app-pub-7656347766469977/2675710827')
        } else {
            setPubli('ca-app-pub-7656347766469977/3153281022')
        }
    }

    async function getPhrase(){
        setLoading(true)
        const response = await api.get('/prhases/phrase')
        
        var fraseCompleta = response.data[0].phrase
        fraseCompleta = fraseCompleta.split('.')

        var autor = fraseCompleta[(fraseCompleta.length) - 1]
        
        var autorFormated = autor.replace(' ', '')

        fraseCompleta[(fraseCompleta.length)-1] =  ''
       
        var frase = ''

        for (let index = 0; index < fraseCompleta.length; index++) {
            frase = frase + fraseCompleta[index]+ '. '
        }

        frase = frase.slice(0, -2) 
        
        console.log(autor)
        console.log(frase)

        setAutor(autorFormated)
        setPhrase(frase)
        // setPhrase(response.data[0].phrase)
        setLoading(false)
    }

    async function shareMessage() {
        Share.share({ message: `${phrase}${autor} \n\nPara se inspirar acesse @lifeupapp no Instagram e baixe o app!!!`})
    }

    function instagramLifeUp() {
        Linking.openURL('instagram://user?username=lifeupapp')
    }

    if (!fontsLoaded) {
        return <AppLoading />;
      } else {
 return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>

        <ActionTip ref={actionTipRef} position={{ top: 40 }} useNativeDriver={false}/>
        <TouchableWithoutFeedback onPress={pastePhrase}>
            <View style={styles.header}>
                <Image source={logo} style={{tintColor: colors.accent}} />
                {/* <Image source={dimenssionHeight>680?headerRegular:headerSmall} /> */}
                <Image source={headerSmall} />
            </View>
            </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={pastePhrase}>
            <View style={{alignContent: 'center', alignItems: 'center', justifyContent: 'center', marginRight: 20, marginTop: 10}}>
                <Text style={{color: colors.accent}}>Toque para nova frase</Text>
            </View>
        </TouchableWithoutFeedback>

        <View style={styles.phraseContainer} >
            <Image source={aspas} style={{tintColor: colors.accent}} />

            <ScrollView showsVerticalScrollIndicator={false} >
                
                {loading &&
                    <View style={[styles.loading, { marginLeft: -30}]}> 
                        <ActivityIndicator size="large" color={colors.primary} />
                    </View>
                }

                {!loading &&
                    <View>
                        <Text multiline editable={false} style={[styles.phrase, {color: colors.primary, fontFamily: "Lemonada_300Light"}]}>
                            {phrase}
                            <Text multiline editable={false} style={[styles.phrase, {color: colors.primary, fontFamily: "Lemonada_600SemiBold"}]}>
                                {autor}
                            </Text>
                        </Text>
                    </View>
                }
            </ScrollView>
            
        </View>
        
        <View style={styles.buttonContent} >
           
            <TouchableOpacity onPress={shareMessage}>
                <LinearGradient start={{x: 0, y: 0.50}} end={{x: 1, y: 0.50}} colors={['#69306D', '#0E103D']}
                    style={styles.phraseButton}>
                    <Feather name="share" size={20} color={colors.text} style={{marginHorizontal: 10}} />
                    <Text style={styles.phraseButtonText}>Compartilhar</Text>
                </LinearGradient>
            </TouchableOpacity>

        </View>

        <View style={styles.footer} >
            <View style={styles.contactContainer}>
                <Text style={[styles.call, {color: colors.surface}]}>Fale conosco pelo 
                    <Text style={[{color: colors.accent}]} onPress={instagramLifeUp}> Instagram</Text>
                </Text>
            </View>
        </View>

        <AdMobBanner
            bannerSize="banner"
            adUnitID={publi}
            setTestDeviceIDAsync
            servePersonalizedAds={true}
            onDidFailToReceiveAdWithError={(error) => console.log(error)}
        />
        
    </SafeAreaView>
  )};
}