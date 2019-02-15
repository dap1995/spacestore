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

  static navigationOptions = {
    header: null,
  }

  async handleSubmit(email, password) {
    this.setState({ isLoading: true });
    this.startLoading();
    if (!email || !password) {
      Toast.show({
        text: 'Usuário/Senha não informado!',
        position: 'bottom',
        buttonText: 'Okay',
      });
      this.setState({ isLoading: false });
      this.stopLoading();
      return;
    }
    sleep(2000).then(() => {
      this.stopLoading();
      this.setState({ isLoading: false });
      this.finished();
    });
    
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

  finished() {
    this.props.navigation.navigate('Home');
  }

  renderIndicator() {
    return <ActivityIndicator color="blue" />;
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
                ? this.renderIndicator()
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

export default Login;
