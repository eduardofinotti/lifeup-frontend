import React, { useState, useEffect, useRef} from 'react';
import { View, Image, Text, TouchableOpacity, SafeAreaView, 
    StatusBar, ScrollView, Clipboard, ActivityIndicator, Alert, 
    AsyncStorage, Dimensions, Share, Linking} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Feather} from '@expo/vector-icons'
import ActionTip from 'react-native-action-tips';

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import * as MailComposer from 'expo-mail-composer'
import api from '../../services/api'

import logo from '../../assets/logo.png'
import headerRegular from '../../assets/headerRegular.png'
import headerSmall from '../../assets/headerSmall.png'
import aspas from '../../assets/aspas.png'
import email from '../../assets/email.png'
import instagram from '../../assets/instagram.png'

import styles from './styles'

export default function Home() {

    const [phrase, setPhrase] = useState('')
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

    async function getPermitions(){
        const  {status}  = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        
        if(status !== 'granted' ) {
            Alert.alert("Atenção!", "Você não permitiu o envio de notificações, ou deve ir nas configurações do celular para permitir notificações! :)");
            return;
        }

        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('default', {
              name: 'default',
              sound: true,
              priority: 'max',
              vibrate: [0, 250, 250, 250],
            });
          }

        let notification = Notifications.addListener(handlePush);
    }

    const handlePush = notification => {
        console.log(">>>>>>>", notification);
    }

    const schedule = async () => {
        var date = new Date();
        console.log('Scheduling... to: ' + date)

        date.setDate(date.getDate() + 1)
        date.setHours(8, 0, 0)

        const data = await Notifications.scheduleLocalNotificationAsync({
            title: "LifeUp - Frases Motivacionais",
            body: "Acesse o LifeUp e se inspire hoje! :)",
            channelId: "default",
            data: { some: { data: "mensagem recebida" } }
        }, {
            time: (date.getTime() + 5000),
            repeat: 'day'
        });
    }

    useEffect(() => {
        getPermitions()
        getPhrase()

        setScheduler()
        
        async function setScheduler() {
            var myScheduler = await AsyncStorage.getItem('@scheduler')

            if(!myScheduler) {
                console.log('Vai agendar')
                Notifications.cancelAllScheduledNotificationsAsync()
                schedule()
                await AsyncStorage.setItem('@scheduler', 'scheduled')
            } else {
                console.log('Já agendou')
            }
        }
    }, [])

    async function getPhrase(){
        setLoading(true)
        const response = await api.get('/prhases/phrase')
        
        console.log(response.data[0].phrase)

        setPhrase(response.data[0].phrase)
        setLoading(false)
    }

    async function shareMessage() {
        Share.share({ message: `${phrase} \n\nPara se inspirar acesse: @lifeup no Instagram e baixe no app!!!` })
    }

    function instagramLifeUp() {
        Linking.openURL('instagram://user?username=lifeupapp')
    }
    
 return (
   <SafeAreaView style={styles.container}>
       <StatusBar barStyle="dark-content"  backgroundColor={'transparent'}/>

       <ActionTip ref={actionTipRef} position={{ top: 40 }} />
       
       <View style={styles.header}>
           <Image source={logo} />
           <Image source={dimenssionHeight>680?headerRegular:headerSmall} />
       </View>

        <View style={styles.phraseContainer} >
            <Image source={aspas} />
            <ScrollView showsVerticalScrollIndicator={false} >
                {loading &&
                    <View style={styles.loading}> 
                        <ActivityIndicator size="large" color="#0E103D" />
                    </View>
                }

                {!loading &&
                    <Text multiline editable={false} style={styles.phrase}>
                        {phrase}
                    </Text>
                }

            {!loading &&
                <View style={styles.copyPhraseContent} >
                    <TouchableOpacity onPress={copyToClipboard}>
                        <Feather name="copy" size={20} color="gray"  />
                    </TouchableOpacity>
                </View>
            }
                
            </ScrollView>
        </View>
       
        <View style={styles.buttonContent} >
            
            <TouchableOpacity onPress={shareMessage} style={{margin: 20}}>
                <Text style={styles.shareText}>Compartilhar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={pastePhrase}>
                <LinearGradient start={{x: 0, y: 0.50}} end={{x: 1, y: 0.50}} colors={['#69306D', '#0E103D']}
                    style={styles.phraseButton}>
                    <Text style={styles.phraseButtonText}>Nova Mensagem</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>

        <View style={styles.footer} >
            <View style={styles.contactContainer}>
                <Text style={styles.call}>Fale conosco!</Text>  
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
  );
}