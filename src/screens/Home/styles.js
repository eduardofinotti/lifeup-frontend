import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    
    container: {
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center',
        backgroundColor: '#fff'
    },

    header: {
        alignItems: 'center',
        marginTop: 20
    },

    phraseContainer: {
        paddingLeft: 10,
        flexDirection: 'row',
        width: '100%',
        height: 230,
    },

    phrase: {
        padding: 10,
        fontSize: 20,
        marginRight: 10
    },

    buttonContent: {
        flex: 1,
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        marginBottom: 20
    },    

    phraseButton: {
        padding: 15, 
        alignItems: 'center', 
        borderRadius: 25, 
        width: 250, 
        height: 55, 
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
        fontSize: 22,
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

    position: {
        color: '#737380', 
        fontSize: 12,
        marginLeft: 5    
    }
})