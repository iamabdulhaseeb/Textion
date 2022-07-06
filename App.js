import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default App = props => {
  const [isloading, setIsLoading] = useState(false);
  const [currentMood, setCurrentMode] = useState(null);
  const [input, setInput] = useState('')
  const COLORS = {
    'Happy': "#F2D57E",
    'Sad': "#7EE7F2",
    "Angry": "#F27E93",
    "Surprise":"#FC0FC0",
    "Fear":"#eedd82",
    "dark": "#262626",
    "white": '#FFFFFF'
  }
  const QUOTES = {
    'Happy':"You glow differently when you're actually happy.",
    'Sad':"Be so happy that when others look at you they also become happy.",
    'Angry':'Anger doesnt solve anything but it makes things worse',
    'Surprise':'The best things happen unexpectedely',
    'Fear':'Extreme fear can neither fight nor fly'
  }
  const ICONS = {
    'Sad':<FontAwesome5 name='sad-tear' color='black' size={100} style={{margin:20}}/>,
    'Happy':<Entypo name='emoji-happy' color={COLORS['dark']} size={100} style={{margin:20}}/>,
    'Angry':<FontAwesome5 name='angry' color={COLORS['dark']} size={100} style={{margin:20}}/>,
    'Surprise':<FontAwesome5 name='surprise' color={COLORS['dark']} size={100} style={{marginTop:20}}/>,
    'Fear':<Ionicons name='sad-sharp' color={COLORS['dark']} style={{marginTop:20}} size={100}/>
     
  }
  const fetchEmotion = async () => {
    try {
      // setIsLoading(true);
      let arr = [];
    
     
      fetch('https://api.apilayer.com/text_to_emotion', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
          'apikey': 'qxjegucaHR42go0S9JcabuTlL5iFFHIg'
        },
        redirect: 'follow'
      }).then(res => res.json()).then(res => {
        if(res?.message) {
        alert(res?.message);  
        return;
        }
        const values = {
          "Angry":res?.Angry,
          "Fear": res?.Fear,
          "Happy": res?.Happy,
          "Sad": res?.Sad,
          "Surprise": res?.Surprise
        }
        console.log(values);
        let response = Object.values(values);
        console.log(response);
        let max = Math.max.apply(null,response);
        console.log(max);
        const indexOfMax = response?.indexOf(max);
        setCurrentMode(Object.keys(values)[indexOfMax]);
      }).catch(e => {
        console.log(e)
      })
      // const apiCall = await axios.post(`https://api.apilayer.com/text_to_emotion/?body=${input}`,input,{
      //   headers:{
      //     'apikey':'l8XL6MsymghyqK7MYQM4isGH1igCKbxR'
      //   },
      // });
      setIsLoading(false);
      // if (apiCall?.status == 200) {
      //   setCurrentMode(apiCall?.data);
      // } else {
      //   alert('something wrong');
      // }
    } catch (e) {
      setIsLoading(false);
      console.log(e)
      alert('something went wrong');
    }
  } 
  if(currentMood) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS[currentMood], justifyContent: 'center', alignItems: 'center' }}>
     {ICONS[currentMood]}
     <Text style={{ color: COLORS['dark'], fontSize: 35, fontWeight: 'bold' }}>{currentMood}</Text>
     <Text style={{ color: COLORS['dark'], fontSize: 15, fontWeight: '300',width:'80%',alignSelf:'center',textAlign:'center',marginVertical:20 }}>{QUOTES[currentMood]}</Text>

      
      <TouchableOpacity
        onPress={() => setCurrentMode(null)}
        style={{
          backgroundColor: '#0096FF',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          alignSelf: 'center',
          width: '85%',
          height: 50,
          marginVertical:20
        }}>
        {
          isloading ?
            <ActivityIndicator
              size={'small'}
              color={COLORS['white']}
            />
            :
            <Text style={{ color: COLORS['white'], fontSize: 19, fontWeight: 'bold' }}>Textion again</Text>
        }
      </TouchableOpacity>
    </View>
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS['dark'], justifyContent: 'center', alignItems: 'center' }}>
      <Image
      source={{uri:'https://i.pinimg.com/originals/93/76/f4/9376f4bc2cf659688e4fe9887adddc4a.png'}}
      style={{
        width:100,
        height:100,
        marginVertical:30
      }}
      />
      <Text style={{ color: COLORS['white'], fontSize: 35, fontWeight: 'bold' }}>Textion</Text>
      <Text style={{ color: COLORS['white'], fontSize: 15, marginTop: 10, fontWeight: '300', width: 300, alignSelf: 'center', textAlign: 'center' }}>Textion will detect your mood from the text your write.</Text>
      <View style={{
        width: '90%',
        height: 100,
        backgroundColor: COLORS['white'],
        alignSelf: 'center',
        marginVertical: 20,
        borderRadius: 10,
        alignItems: 'flex-start'
      }}>
        <TextInput
          value={input}
          onChangeText={inp => setInput(inp)}
          placeholder='Tap to write'
          placeholderTextColor={'black'}
          style={{
            alignSelf: 'flex-start',
            padding: 20

          }}
        />
      </View>
      <TouchableOpacity
        onPress={fetchEmotion}
        style={{
          backgroundColor: '#0096FF',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          alignSelf: 'center',
          width: '90%',
          height: 50,
        }}>
        {
          isloading ?
            <ActivityIndicator
              size={'small'}
              color={COLORS['white']}
            />
            :
            <Text style={{ color: COLORS['white'], fontSize: 19, fontWeight: 'bold' }}>Submit</Text>
        }
      </TouchableOpacity>
    </View>
  )
}