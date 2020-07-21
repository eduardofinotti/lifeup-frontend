import React, { useState, useEffect, useRef} from 'react';
import { View, Image, Text, TouchableOpacity, SafeAreaView, 
        ScrollView, Clipboard, ActivityIndicator, 
        Dimensions, Share, Linking} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Feather} from '@expo/vector-icons'
import ActionTip from 'react-native-action-tips';
import { AppLoading } from 'expo';

import * as MailComposer from 'expo-mail-composer'
import api from '../../services/api'

import { useTheme } from 'react-native-paper'

import logo from '../../assets/logo.png'
import headerRegular from '../../assets/headerRegular.png'
import headerSmall from '../../assets/headerSmall.png'
import aspas from '../../assets/aspas.png'
import email from '../../assets/email.png'
import instagram from '../../assets/instagram.png'

import styles from './styles'

import { 
    useFonts,
    Lemonada_300Light,
    Lemonada_400Regular,
    Lemonada_500Medium,
    Lemonada_600SemiBold,
    Lemonada_700Bold 
  } from '@expo-google-fonts/lemonada'

export default function Home() {

    let [fontsLoaded] = useFonts({
        Lemonada_300Light,
        Lemonada_400Regular,
        Lemonada_500Medium,
        Lemonada_600SemiBold,
        Lemonada_700Bold 
      });

    const { colors } = useTheme()

    const [phrase, setPhrase] = useState('')
    const [autor, setAutor] = useState('')
    const [loading, setLoading] = useState(false)

    const actionTipRef = useRef(null);

    const dimenssionHeight = Dimensions.get('window').height

    function sendMail() {
        MailComposer.composeAsync({
          subject: 'Contato - LifeUp',
          recipients: ['ajudalifeup@gmail.com'],
          body: 'Olá! \n\nUsei o APP Live Up e gostaria de tirar uma dúvida! :) '
        })
    }

    function copyToClipboard(){
        Clipboard.setString(phrase)
        actionTipRef.current.show("Mensagem copiada! :)");
    }
    
    function pastePhrase(){
        getPhrase()
    }

    useEffect(() => {
        getPhrase()
    }, [])

    async function getPhrase(){
        setLoading(true)
        const response = await api.get('/prhases/phrase')
        
        var fraseCompleta = response.data[0].phrase
        fraseCompleta = fraseCompleta.split('.')

        var autor = fraseCompleta[(fraseCompleta.length) - 1]
        console.log(autor)
        fraseCompleta[(fraseCompleta.length) - 1] =  ''
       
        var frase = ''

        for (let index = 0; index < fraseCompleta.length; index++) {
            frase = frase + fraseCompleta[index]+ ' '
        }

        frase = frase.slice(0, -2) 

        console.log(frase)

        setAutor(autor)
        setPhrase(frase)
        // setPhrase(response.data[0].phrase)
        setLoading(false)
    }

    async function shareMessage() {
        Share.share({ message: `${phrase} \n\nPara se inspirar acesse: @lifeup no Instagram e baixe no app!!!` })
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
       
       <View style={styles.header}>
           <Image source={logo} style={{tintColor: colors.accent}} />
           <Image source={dimenssionHeight>680?headerRegular:headerSmall} />
       </View>

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
                            {phrase}.
                            <Text multiline editable={false} style={[styles.phrase, {color: colors.primary, fontFamily: "Lemonada_600SemiBold"}]}>
                                {autor}
                            </Text>
                        </Text>
                    </View>
                }

                {!loading &&
                    <View style={styles.copyPhraseContent} >
                        <TouchableOpacity onPress={copyToClipboard}>
                            <Feather name="copy" size={20} color={colors.primary}  />
                        </TouchableOpacity>
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

            <TouchableOpacity onPress={ pastePhrase} style={{margin: 20}}>
                <Text style={[styles.shareText, {color: colors.accent}]}>Nova Mensagem</Text>
            </TouchableOpacity> 

        </View>

        <View style={styles.footer} >
            <View style={styles.contactContainer}>
                <Text style={[styles.call, {color: colors.surface}]}>Fale conosco!</Text>
                <View style={styles.contact}>
                    <TouchableOpacity onPress={sendMail}>
                        <Image source={email} />
                    </TouchableOpacity>
                </View>
                <View style={styles.contact}>
                    <TouchableOpacity onPress={instagramLifeUp}>
                        <Image source={instagram} />
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    </SafeAreaView>
  )};
}