import { StyleSheet } from 'react-native';


const styleNutList = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,

    },
    title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    },
    nutText:{
    color:'white',
    marginLeft: 8,
    marginRight:10,
    },
    calText:{
    color:'white',
    fontWeight:'bold',
    marginLeft: 8,
    marginRight:10,
    },
    nutItem: {
    width: '100%',

    // borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, height: 4 },
    // shadowRadius: 4,
    elevation: 2,
    },
    nutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: 8,
    color: 'white',
    },
    progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: 8,
    color: '#23e859',
    },
    error: {
    color: 'red',
    fontSize: 16,
    },
    buttonRow: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'flex-end',
    marginRight: 8,
    },
    editButton: {
    backgroundColor: '#6cc6e8',
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
    marginBottom:8,
    },
    deleteButton: {
    backgroundColor: '#e86c6c',
    padding: 8,
    borderRadius: 4,
    marginBottom:8,
    },
    buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    },
    background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    },
    button: { backgroundColor: '#7904a4', padding: 10, marginVertical: 5, borderRadius: 5, alignItems: "center", },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        color: 'black',
      },
});

export { styleNutList };

