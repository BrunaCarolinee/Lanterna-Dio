import React, {useState,useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import imagemX from './assets/icons/preta.png';
import imagemY from './assets/icons/colorida.png';
import logoY from './assets/icons/logo-dio-white.png';
import logoX from './assets/icons/logo-dio.png'
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
  const [toggle, setToggle] = useState(false);
  const handleChangeToggle = () => setToggle(oldtoggle => !oldtoggle);

  useEffect(() => {
  // liga flash do celular 
    Torch.switchState(toggle)
  }, [toggle]);

  useEffect(() => {
    //Celular chacoalhado, mudarenos o toggle 
    const subscription = RNShake.addListener(() => {
      setToggle(oldtoggle => !oldtoggle)
    });
    // será chamada quando componente for desmontada 
    return () => subscription.remove();
  }, []);

  return (
    <View style={toggle ? style.container : style.containerLight}>
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image
          style={toggle ? style.lOff : style.lOn}
          source={toggle ? imagemX : imagemY}
        />

        <Image
          style={toggle ? style.dioLogo : style.dioLogo}
          source={toggle ? logoY : logoX}
        />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});
