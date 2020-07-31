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
        alignItems: 'center'
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
        marginTop:dimenssionHeight>680?50:20,
        height: dimenssionHeight>650?260:190,
    },

    phrase: {
        paddingHorizontal: 10,
        marginRight: 10,
        fontSize:dimenssionHeight>600?19:15,
    },

    loading: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: dimenssionHeight>650?110:60
    },  

    phraseButton: {
        borderRadius: 20, 
        width: 230, 
        height: 50, 
        alignContent: 'center', 
        alignItems: 'center', 
        justifyContent:'center',
        flexDirection: 'row',
    },

    copyPhraseContent: {
        // flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        // marginRight: 30,
    },    
    
    copyPhrase: {
        color: 'gray'
    },

    shareText: {
        fontSize: 15, 
        fontWeight: 'bold'
    },

    buttonContent: {
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
    },

    call: {
        fontSize: footerFontSize,
        fontWeight: 'bold',
        color: '#fff',
    },

    contact: {
        marginHorizontal: 10,
    },

    contactContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 10
    },
    
})