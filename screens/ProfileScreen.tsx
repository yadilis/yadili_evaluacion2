import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { getAuth, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../config/Config";
import { NavigationProp } from '@react-navigation/native';

interface ProfileScreenProps {
  navigation: NavigationProp<any, any>; 
}

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const [user, setUser] = useState<User | null>(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); 
      } else {
        setUser(null); 
      }
      setLoading(false); 
    });

   
    return () => unsubscribe();
  }, []);


  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Welcome"); 
      })
      .catch((error) => {
        Alert.alert("Error", "Hubo un problema al cerrar sesión: " + error.message);
      });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando información.......</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      {user ? (
        <>
          <Text style={styles.info}>Correo electrónico:{user.email}</Text>
      
          <Button title="Cerrar sesión" onPress={handleSignOut} />
        </>
      ) : (
        <Text style={styles.info}>No hay usuario logueado</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ProfileScreen;
