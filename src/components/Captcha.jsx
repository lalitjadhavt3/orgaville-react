// Captcha.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const Captcha = ({onVerify}) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState('+');
  const [answer, setAnswer] = useState('');
  const [expectedAnswer, setExpectedAnswer] = useState(null);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    const op = Math.random() > 0.5 ? '+' : '*';

    setNum1(n1);
    setNum2(n2);
    setOperator(op);
    setExpectedAnswer(op === '+' ? n1 + n2 : n1 * n2);
    setAnswer('');
  };

  const handleChangeText = text => {
    setAnswer(text);
  };

  const handleVerify = () => {
    if (parseInt(answer) === expectedAnswer) {
      onVerify(true);
    } else {
      onVerify(false);
      generateCaptcha();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {num1} {operator} {num2} = ?
      </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={answer}
        onChangeText={handleChangeText}
      />
      <TouchableOpacity onPress={handleVerify} style={styles.verifyButton}>
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={generateCaptcha} style={styles.reloadButton}>
        <Svg
          height="24"
          width="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <Path d="M23 4v6h-6"></Path>
          <Path d="M1 20v-6h6"></Path>
          <Path d="M3.51 9a9 9 0 0115.46-5L23 10"></Path>
          <Path d="M20.49 15a9 9 0 01-15.46 5L1 14"></Path>
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: 100,
    textAlign: 'center',
    marginBottom: 10,
  },
  verifyButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  verifyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  reloadButton: {
    padding: 10,
  },
});

export default Captcha;
