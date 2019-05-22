import React, { Component } from 'react';
import {
  View,
  Animated,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  Easing,
} from 'react-native';
import {
  Container,
  Content,
  Toast,
  Item,
  Icon,
  Input,
  Text,
} from 'native-base';
import { storeData } from '../utils/storage';
import { withClient } from '../utils/graphql';
import login from '../queries/login';

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.buttonAnimation = new Animated.Value(0);
    this.animation = new Animated.Value(0);
    this.state = {
      isLoading: false,
      email: this.props.email || '',
      password: '',
      pendingRequest: false,
      errorMessage: '',
      jwt: '',
      showToast: false,
    };
  }

  handleLogin = async () => {
    const { client, navigation } = this.props;
    const { email, password } = this.state;
    this.setState({ isLoading: true });
    this.startLoading();
    try {
      const { data: { login: { token } } } = await client.mutate(login({ email, password }));
      await storeData('auth', token);
      navigation.navigate('Home');
    } catch(err) {
      const { message = 'Não foi possível se autenticar' } = err;
      Toast.show({ text: message, type: 'danger' });
    } finally {
      this.stopLoading();
      this.setState({ isLoading: false });
    }
  }

  async handleSubmit(email, password) {
    if (!email || !password) {
      Toast.show({
        text: 'Usuário/Senha não informado!',
        position: 'bottom',
        buttonText: 'Okay',
        duration: 2000,
      });
      return;
    }
    this.handleLogin();
  }

  register() {
    return;
  }

  startLoading() {
    Animated.timing(this.buttonAnimation, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
    }).start();
  }

  stopLoading() {
    Animated.timing(this.buttonAnimation, {
      toValue: 0,
      duration: 150,
      easing: Easing.linear,
    }).start();
  }

  render() {
    const width = this.buttonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['100%', '15%']
    });
    const opacity = this.buttonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });
    const color = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#000', '#659DEC'],
    });
    return (
      <Container>
        <Content style={{ backgroundColor: 'white' }} padder>
          <SafeAreaView>
            <Animated.Text style={[{
              flex: 1,
              alignSelf: 'center',
              backgroundColor: 'transparent',
              fontWeight: 'bold',
              fontSize: 40,
              margin: 50,
              color,
            }]}>
              SPACE STORE
            </Animated.Text>
            <View>
              <Item style={{ marginBottom: 5 }} rounded>
                <Icon
                  active
                  style={{ marginLeft: 5 }}
                  type="FontAwesome"
                  name="user"
                />
                <Input
                  placeholder={'e-mail'}
                  value={this.state.email}
                  onChangeText={email => this.setState({ email })}
                />
              </Item>
              <Item style={{ marginBottom: 10 }} rounded>
                <Icon
                  style={{ marginLeft: 5 }}
                  active
                  type="FontAwesome"
                  name="lock"
                />
                <Input
                  secureTextEntry
                  placeholder="password"
                  onChangeText={password => this.setState({ password })}
                />
              </Item>
              <TouchableWithoutFeedback
                onPress={() => this.handleSubmit(this.state.email, this.state.password)}
              >
              <Animated.View
                style={[
                  {
                    flex: 1,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    backgroundColor: '#659DEC',
                    padding: 10,
                    borderRadius: 100,
                  },
                  {
                    width,
                  },
                ]}
              >
              { this.state.isLoading
                ? <ActivityIndicator color="blue" />
                : (
                  <Animated.Text style={{
                    fontWeight: 'bold',
                  }}>
                    Entrar
                  </Animated.Text>
                )
              }
              </Animated.View>
              </TouchableWithoutFeedback>
              <TouchableOpacity
                onPress={() => this.register(this.state.email, this.state.password)}
              >
              <Animated.View
                style={[
                  {
                    flex: 1,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    backgroundColor: '#DDD',
                    marginTop: 5,
                    padding: 10,
                    borderRadius: 100,
                    width: '100%',
                  },
                  { opacity }
                ]}
              >
                <Animated.Text style={{
                  fontWeight: 'bold',
                }}>
                  Criar conta
                </Animated.Text>
              </Animated.View>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Content>
      </Container>
    );
  }
}

export default withClient(Login);
