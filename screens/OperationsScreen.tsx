import React, { useState } from "react";
import { TextInput, Button, Alert, View, Text, StyleSheet } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from '../config/Config';
import { NavigationProp } from '@react-navigation/native'; 
import { StackNavigationProp } from '@react-navigation/stack'; 

type RootStackParamList = {
  Login: undefined; 
  Main: undefined;
 
};


type OperationsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface OperationsScreenProps {
  navigation: OperationsScreenNavigationProp;
}

const OperationsScreen: React.FC<OperationsScreenProps> = ({ navigation }) => {
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");


  const currentUser = auth.currentUser;

  const handleOperation = async () => {
  
    if (!currentUser) {
      Alert.alert("Error", "Debes iniciar sesión para realizar una operación.");
      navigation.navigate("Login"); 
      return;
    }

    const parsedAmount = parseFloat(amount);

  
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert("Error", "El monto debe ser un número positivo");
      return;
    }

 
    if (parsedAmount > 500) {
      Alert.alert("Confirmación", "¿Desea continuar con la transacción?", [
        { text: "Cancelar" },
        { text: "Aceptar", onPress: saveOperation },
      ]);
    } else {
      saveOperation();
    }
  };

  const saveOperation = async () => {
    try {
    
      await addDoc(collection(db, "operations"), {
        amount: parseFloat(amount),
        comment: comment,
        date: new Date(),
      });

      Alert.alert("Éxito", "Operación realizada con éxito");
      setAmount("");  
      setComment("");
    } catch (error) {
     
      console.error(error);

      Alert.alert("Error", "Hubo un problema al guardar la operación. Intenta de nuevo.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Realizar Operación</Text>
      <TextInput
        placeholder="Monto"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Comentario"
        value={comment}
        onChangeText={setComment}
        style={styles.input}
      />
      <Button title="Realizar operación" onPress={handleOperation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
});

export default OperationsScreen;
