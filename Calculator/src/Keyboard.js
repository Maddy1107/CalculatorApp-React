import 
{ 
  Text,
  View,
  TouchableOpacity,
  Vibration,
} 
from 'react-native';
import { Styles } from './GlobalStyle';
import { useState, useEffect } from 'react';
import { PressabilityDebugView } from 'react-native/Libraries/Pressability/PressabilityDebug';
import { isAsyncDebugging } from 'react-native/Libraries/Utilities/DebugEnvironment';


export default function Keyboard() {

    //List of Buttons needed for the calculator
    //const buttons = ['C', 'DEL','/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '=']

    const buttons = [
        {
            'name':'C',
            'type': 'C',
            'key' : 1
        },
        {
            'name':'DEL',
            'type':'DEL',
            'key' : 2
        },
        {
            'name':'/',
            'type': 'op',
            'key' : 3
        },
        {
            'name':'7',
            'type': 'num',
            'key' : 4
        },
        {
            'name':'8',
            'type': 'num',
            'key' : 5
        },
        {
            'name':'9',
            'type': 'num',
            'key' : 6
        },
        {
            'name':'*',
            'type': 'op',
            'key' : 7
        },
        {
            'name':'4',
            'type': 'num',
            'key' : 8
        },
        {
            'name':'5',
            'type': 'num',
            'key' : 9
        },
        {
            'name':'6',
            'type': 'num',
            'key' : 10
        },
        {
            'name':'-',
            'type': 'op',
            'key' : 11
        },
        {
            'name':'1',
            'type': 'num',
            'key' : 12
        },
        {
            'name':'2',
            'type': 'num',
            'key' : 13
        },
        {
            'name':'3',
            'type': 'num',
            'key' : 14
        },
        {
            'name':'+',
            'type': 'op',
            'key' : 15
        },
        {
            'name':'0',
            'type': 'num',
            'key' : 16
        },
        {
            'name':'.',
            'type': 'decimal',
            'key' : 17
        },
        {
            'name':'=',
            'type': 'equal',
            'key' : 18
        },        
    ]

    //List of required functions
    const[operation, setOperation] = useState('');
    const[currentNum, setCurrenttNum] = useState('');
    const[lastnum, setLasttNum] = useState('');
    const[expression, setexpression] = useState('');
    const[result, setResult] = useState(0);
    const[isEqual, setIsEqual] = useState(false);

    useEffect(() => {
        currentNum && lastnum && calculate();
    }, [currentNum])

    const handlePress = async (pressedButton) =>
    {
        Vibration.vibrate(35);

        if(pressedButton.type === 'C')
        {
            setexpression('')
            setCurrenttNum('')
            setOperation('')
            setLasttNum('')
            setResult(0)
            setIsEqual(false);
            return;
        }

        if(pressedButton.type === 'equal')
        {
            setIsEqual(true);
            return;
        }

        if(pressedButton.type === 'DEL')
        {
            setexpression(expression.slice(0,-1));
            await setCurrenttNum(currentNum.slice(0,-1));
            return;
        }

        if(pressedButton.name !== '=')
            setexpression(expression + pressedButton.name);

        if(pressedButton.type === 'op')
        {
            await setOperation(pressedButton.name);
            await setLasttNum(currentNum);
            await setCurrenttNum('');
        }

        else if(pressedButton.type = 'num')
        {
            await setCurrenttNum(currentNum.toString() + pressedButton.name);

            if(result === 0)
                await setResult('=' + pressedButton.name);
            else
                await setResult(result.toString() + pressedButton.name);
        }

        console.log('L ' + lastnum)
        console.log('C '+ currentNum)
        console.log('O ' + operation)
        console.log('R ' + result)
    }

    const calculate = async () =>
    {
        switch (operation) {
            case '+':
                await setResult('=' + ((parseFloat(lastnum) + parseFloat(currentNum))* 100)/100)
                break;
            case '-':
                await setResult('=' + ((parseFloat(lastnum) - parseFloat(currentNum))* 100)/100)
                break;
            case '/':
                await setResult('=' + ((parseFloat(lastnum) / parseFloat(currentNum))* 100)/100)
                break;
            case '*':
                await setResult('=' + ((parseFloat(lastnum) * parseFloat(currentNum))* 100)/100)
                break;
            default:
                break;
        }
    }

    //Keyboard Design
    return(
        <View>
            <View style = {Styles.result}>
                <Text style= {!isEqual ? Styles.currentnum : Styles.resulttxt_notEqual}>{expression}</Text>
                <Text style= {result === 0 || isEqual ? Styles.resulttxt : Styles.resulttxt_notEqual}>{result}</Text>
            </View>


        <View style = { Styles.btn_container}>

            {buttons.map((button) =>

            button.name === '+' || button.name === '-' || button.name === '/' || button.name === '*' ?

            <TouchableOpacity style = {Styles.btn} onPress = {() => handlePress(button)}>
                <Text style = {[Styles.btn_txt, { color:'#e8762e'}]}>{button.name}</Text>
            </TouchableOpacity>
            :
            button.name === 'C' || button.name === 'DEL' ?

            <TouchableOpacity style = {[Styles.btn, {minWidth:'33%'}]} onPress = {() => handlePress(button)}>
                <Text style = {[Styles.btn_txt, { color:'#e8762e'}]}>{button.name}</Text>
            </TouchableOpacity>
            :
            button.name === '0' || button.name === '.'?

            <TouchableOpacity style = {[Styles.btn, {minWidth:'33%'}]} onPress = {() => handlePress(button)}>
            <Text style = {Styles.btn_txt}>{button.name}</Text>
            </TouchableOpacity>
            :
            button.name === '='?

            <TouchableOpacity style = {[Styles.btn, {backgroundColor:'#e8762e', minWidth:'13%', minHeight:'10%',
            margin:15}]} onPress = {() => handlePress(button)}>
                <Text style = {[Styles.btn_txt, { color:'white'}]}>{button.name}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style = {Styles.btn} onPress = {() => handlePress(button)}>
                <Text style = {Styles.btn_txt}>{button.name}</Text>
            </TouchableOpacity>
            )}
            
        </View>
      </View>
    )
}