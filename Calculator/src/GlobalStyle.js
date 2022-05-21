import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    result:{
      height : '40%',
      backgroundColor: 'white',
      alignItems: 'flex-end',
      justifyContent:'flex-end'
    },
    resulttxt:{
      fontSize:50,
      margin: 15,
      opacity:1,
    },
    resulttxt_notEqual:{
      fontSize:30,
      margin: 15,
      opacity:0.4,
    },
    currentnum:{
      fontSize:60,
      margin: 15,
    },
    btn_container:{
      height : '60%',
      flexDirection: 'row',
      flexWrap:'wrap',
      paddingLeft:15,
    },
    btn:{
      margin:5,
      borderRadius:500,
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: '21%',
      minHeight: '17%',
    },
    btn_txt:{
      fontSize:40,
      color:'black',
    },
  })