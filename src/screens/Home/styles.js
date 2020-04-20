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
        marginTop: dimenssionHeight>600?20:5
    },

    phraseContainer: {
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop:dimenssionHeight>600?50:10,
        height: dimenssionHeight>650?200:100,
    },

    phrase: {
        paddingHorizontal: 10,
        marginRight: 10,
        fontSize:dimenssionHeight>600?21:13,
        fontFamily: Platform.OS=='ios'?'Noteworthy-Light':'' 
    },

    loading: {
        justifyContent: 'flex-end', 
        height: dimenssionHeight>650?110:60
    },

    buttonContent: {
        flex: 1,
        justifyContent: 'flex-end',
        alignContent: 'center',
        alignItems: 'center'
    },    

    phraseButton: {
        padding: 15, 
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

    phraseButtonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '500',
    },

    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10
    },

    developerBy: {
        color: '#69306f',
        fontSize: footerFontSize
    },

    contact: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },

    contactContainer: {
        marginTop: 5,
        flexDirection: 'row',
    },
    
    contactName: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },

    name: {
        color: '#000', 
        fontSize: footerFontSize,
        marginLeft: 5    
    },

    position: {
        color: '#737380', 
        fontSize: footerFontSize,
        marginLeft: 5    
    }
})