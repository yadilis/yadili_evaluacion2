import React, { useState, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { collection, getDocs } from "firebase/firestore"; // Asegúrate de usar el SDK v9+ para Firestore
import { db } from "../config/Config";  // Asegúrate de que esté importado correctamente

// Definir un tipo para las operaciones
interface Operation {
  amount: number;
  comment: string;
  date: any; // Para Firestore Timestamp
}

const HistoryScreen = () => {
  const [operations, setOperations] = useState<Operation[]>([]); // Tipar el estado de operaciones

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "operations"));
        const operationsList: Operation[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            amount: data.amount,
            comment: data.comment,
            date: data.date, // Firestore Timestamp
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
            {/* Verificar si 'item.date' es un Timestamp de Firestore */}
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
