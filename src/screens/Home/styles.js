import { StyleSheet, Dimensions } from 'react-native';

const dimenssionHeight = Dimensions.get('window').height
let footerFontSize = 11

    if(dimenssionHeight>700){
        footerFontSize = 13
    }

export default StyleSheet.create({
    
    container: {
        flex: 1,
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: '#fff'
    },

    header: {
        alignItems: 'center',
        marginTop: dimenssionHeight>600? 20:5
    },

    phraseContainer: {
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop:dimenssionHeight>680?50:10,
        height: dimenssionHeight>650?250:140,
    },

    phrase: {
        paddingHorizontal: 10,
        marginRight: 10,
        fontSize:dimenssionHeight>600?24:15,
        fontFamily: Platform.OS=='ios'?'Noteworthy-Light':'' 
    },

    loading: {
        justifyContent: 'flex-end', 
        height: dimenssionHeight>650?110:60
    },  

    phraseButton: {
        borderRadius: 20, 
        width: 230, 
        height: 50, 
        alignContent: 'center', 
        alignItems: 'center', 
        justifyContent:'center' 
    },

    copyPhraseContent: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 30,
    },    
    
    copyPhrase: {
        color: 'gray'
    },

    shareText: {
        color: '#69306D', 
        fontSize: 15, 
        fontWeight: 'bold'
    },

    buttonContent: {
        flex: 1,
        justifyContent: 'flex-end',
        alignContent: 'center',
        alignItems: 'center'
    },  

    phraseButtonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '500',
    },

    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 10,
    },

    call: {
        color: '#0E103D',
        fontSize: footerFontSize,
        fontWeight: 'bold'
    },

    contact: {
        marginHorizontal: 10
    },

    contactContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    
})