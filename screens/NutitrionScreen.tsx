import { deleteNut, getNut, Nut } from '@/app/nutService';
import { NutStackList } from '@/navigation/NutStackNavigator';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import Moment from 'moment';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import nutBg from '../img/loginBg.jpg';

type RootStackParamList = {
    //Goals: undefined;
    NutList: { userId: string };
    CreateNut: { userId: any };
    EditNut: {nut: any};
};

type NutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NutList'>;

type Props = StackScreenProps<NutStackList, 'NutList'>;

const NutitrionScreen: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.uid || 'guest';
  const navigation = useNavigation<NutScreenNavigationProp>();
  const [nuts, setNuts] = useState<Nut[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cal, setCal] = useState(1800);

  var moment = require('moment');

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const fetchNut = async () => {
        setLoading(true);
        console.log('userId:', userId);
        try {
          const userNuts = await getNut(userId);
          console.log('Fetched goals:', userNuts);
          if (isActive){ 
            setNuts(userNuts);
            handleNutDates(userNuts);
          };
        } catch (err) {
          console.error('Error fetching goals:', err);
          if (isActive) setError('Failed to load goals: ' + userId);
        } finally {
          if (isActive) setLoading(false);
        }
      };
      const handleNutDates = async (goals: Nut[]) => {
          for(let i = 0; i < goals.length; i++){
            
          }
      };
      fetchNut();
      return () => {
        isActive = false;
      };
    }, [userId])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (nuts.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nutrition Items List</Text>
        <Text>No food items found for this user.</Text>
      </View>
    );
  }

  const handleDelete = async (nutId: string) => {
    Alert.alert('Delete Food Item', 'Are you sure you want to delete this food item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: async () => {
          try {
            await deleteNut(nutId);
            setNuts(nuts.filter(g => g.id !== nutId));
          } catch (err) {
            setError('Failed to delete goal');
          }
        }
      }
    ]);
  };

  const handleEdit = (nut: Nut) => {
    navigation.navigate('EditNut', { nut });
  };


  return (
    <ImageBackground source = {nutBg}  style={styles.background} resizeMode='cover'>
    <View style={styles.container}>
      <Text style={styles.title}>Goals List</Text>
      <Text style={styles.nutText}>Total Calories Remaining: {cal}</Text>
      <FlatList
        data={nuts}
        keyExtractor={(item) => item.id || item.title}
        renderItem={({ item }) => (                      
          <View style={styles.nutItem}>
            <LinearGradient
              colors={['#7d00ff','#9bd2f7' ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1 }}
            >
            <Text style={styles.nutTitle}>{item.title}</Text>
            {item.description ? <Text style={styles.nutText}>{item.description}</Text> : null}
            {item.startDate ? <Text style={styles.nutText}>Start: {Moment(item.startDate).format('d MM YYYY')}</Text> : null}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id!)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
            </LinearGradient>
          </View>          
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateNut', { userId })}>
        <Text style={styles.buttonText}>Create New Food Item</Text>
      </TouchableOpacity>
    </View>    
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  nutText:{
    color:'white',
    marginLeft: 8,
  },
  nutItem: {
    width: '100%',
    
    // borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, height: 4 },
    // shadowRadius: 4,
    elevation: 2,
  },
  nutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: 8,
    color: 'white',
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: 8,
    color: '#23e859',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'flex-end',
  },
  editButton: {
    backgroundColor: '#6cc6e8',
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
    marginBottom:8,
  },
  deleteButton: {
    backgroundColor: '#e86c6c',
    padding: 8,
    borderRadius: 4,
    marginBottom:8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: { backgroundColor: '#7904a4', padding: 10, marginVertical: 5, borderRadius: 5, alignItems: "center", },
})

export default NutitrionScreen;