import React, { useState, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../config/Config";  


interface Operation {
  amount: number;
  comment: string;
  date: any; 
}

const HistoryScreen = () => {
  const [operations, setOperations] = useState<Operation[]>([]); 

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "operations"));
        const operationsList: Operation[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            amount: data.amount,
            comment: data.comment,
            date: data.date, 
          };
        });
        setOperations(operationsList);
      } catch (error) {
        console.error("Error fetching operations:", error);
      }
    };

    fetchOperations();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={operations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
            <Text>Monto: {item.amount}</Text>
            <Text>Comentario: {item.comment}</Text>
         
            <Text>
              Fecha: {item.date?.toDate().toLocaleString() || "Fecha no disponible"}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default HistoryScreen;
