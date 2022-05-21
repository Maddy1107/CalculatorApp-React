import 
{ 
  Text,
  View,
  TouchableOpacity,
  Vibration,
} 
from 'react-native';
import { Styles } from './GlobalStyle';
import { useState } from 'react';

export default function Keyboard() {

    //List of Buttons needed for the calculator
    const buttons = ['C', 'DEL', '%','/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '=']

    //List of required functions
    const[operation, setOperation] = useState('');
    const[currentNum, setCurrenttNum] = useState('');
    const[result, setResult] = useState(0);

    //Function to perfom when any button is pressed
    function handlePress(pressedButton)
    {
        //Check if any operation is pressed
        if(pressedButton === '+' || pressedButton === '-' || pressedButton === '/' || pressedButton === '*')
        {
            setOperation(pressedButton);
            setCurrenttNum(currentNum + pressedButton); 
            return;
        }

        //Vibrate
        Vibration.vibrate(35);

        //Check and perform anything other than numbers and operations
        switch(pressedButton)
        {
        case 'C':
            setCurrenttNum('');
            setResult(0);
            setOperation('');
            return;
        case 'DEL':
            setCurrenttNum(currentNum.slice(0,-1));
            return;
        case '=':
            calculate();
            return;
        }

        //Merge pressed button with current number
        setCurrenttNum(currentNum + pressedButton); 

        //Set result same as current number
        if(operation === '')
        {
            if(result === 0)
            {
                setResult('=' + (result + pressedButton));  
            }
            else
            {
                setResult(result.toString() + pressedButton);   
            }
        }
    }

    //Function to change some styles of the result
    function resultDisplayStyle()
    {
        return result === 0 || result > 10 ? {opacity:1, fontSize: 60} : {opacity: 0.4 };
    }

    //Function to change some styles of the current number
    function numberDisplay()
    {
        if(currentNum != '')
        {
            if(result > 10)
            {
            return <Text style={[Styles.currentnum,{fontSize: 30, opacity:0.4}]}>{currentNum.toString()}</Text>; 
            }

            return <Text style={currentNum.length < 6
                ? 
                Styles.currentnum
                : 
                [Styles.currentnum,{fontSize: 40}]}>{currentNum.toString()}</Text>; 
        }
    }

    //Function to perform teh main Calculation
    function calculate()
    {
        let evaluation = eval(currentNum);
        setResult(evaluation);
    }

    //Keyboard Design
    return(
        <View>
            <View style = {Styles.result}>
                {numberDisplay()}
                <Text style= {[Styles.resulttxt, resultDisplayStyle()]}>{result}</Text>
            </View>


        <View style = { Styles.btn_container}>

            {buttons.map((button) =>

            button === '+' || button === '-' || button === '/' || button === '*' ||
             button === 'C' || button === 'DEL' || button === '%' ?

            <TouchableOpacity style = {Styles.btn} onPress = {() => handlePress(button)}>
                <Text style = {[Styles.btn_txt, { color:'#e8762e'}]}>{button}</Text>
            </TouchableOpacity>
            :
            button === 0 || button === '.'?

            <TouchableOpacity style = {[Styles.btn, {minWidth:'33%'}]} onPress = {() => handlePress(button)}>
            <Text style = {Styles.btn_txt}>{button}</Text>
            </TouchableOpacity>
            :
            button === '='?

            <TouchableOpacity style = {[Styles.btn, {backgroundColor:'#e8762e', minWidth:'13%', minHeight:'10%',
            margin:15}]} onPress = {() => handlePress(button)}>
                <Text style = {[Styles.btn_txt, { color:'white'}]}>{button}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style = {Styles.btn} onPress = {() => handlePress(button)}>
                <Text style = {Styles.btn_txt}>{button}</Text>
            </TouchableOpacity>
            )}
            
        </View>
      </View>
    )
}