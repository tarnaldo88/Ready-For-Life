import { deleteNut, getNut, Nut } from '@/app/nutService';
import { NutStackList } from '@/navigation/NutStackNavigator';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import nutBg from '../img/nutListBg.jpg';
import { styleNutList } from '../styles/Styles';


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
  const [editingCal, setEditingCal] = useState(false);
  const [calInput, setCalInput] = useState('1800');
  const [groupedNuts, setGroupedNuts] = useState<any>({});
  const [caloriesByDay, setCaloriesByDay] = useState<any>({});

  var moment = require('moment');

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const fetchNut = async () => {
        setLoading(true);
        try {
          const userNuts = await getNut(userId);
          if (isActive) {
            setNuts(userNuts);
            // Group by day and calculate calories
            const grouped: { [date: string]: Nut[] } = {};
            const calByDay: { [date: string]: number } = {};
            userNuts.forEach(nut => {
              // Use only date part for grouping (e.g. 2025-06-18)
              const date = nut.startDate ? moment(nut.startDate).format('YYYY-MM-DD') : 'Unknown';
              if (!grouped[date]) grouped[date] = [];
              grouped[date].push(nut);
              // Parse calories as number
              const cals = nut.calories ? parseInt(nut.calories, 10) : 0;
              if (!calByDay[date]) calByDay[date] = 0;
              calByDay[date] += cals;
            });
            setGroupedNuts(grouped);
            setCaloriesByDay(calByDay);
          }
        } catch (err) {
          if (isActive) setError('Failed to load nutrition: ' + userId);
        } finally {
          if (isActive) setLoading(false);
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
      <View style={styleNutList.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styleNutList.container}>
        <Text style={styleNutList.error}>{error}</Text>
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
            setError('Failed to delete Food Item');
          }
        }
      }
    ]);
  };

  const handleEdit = (nut: Nut) => {
    navigation.navigate('EditNut', { nut });
  };

  return (
    <ImageBackground source={nutBg} style={styleNutList.background} resizeMode='cover'>
      <View style={styleNutList.container}>
        <Text style={styleNutList.title}>Nutrition Entries</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Text style={styleNutList.nutText}>Daily Calorie Goal: </Text>
          {editingCal ? (
            <>
              <TextInput
                style={[styleNutList.input, { width: 80, marginRight: 8, backgroundColor: 'white', color: 'black' }]}
                value={calInput}
                onChangeText={setCalInput}
                keyboardType="numeric"
                autoFocus
              />
              <TouchableOpacity style={[styleNutList.editButton, {marginRight: 4}]} onPress={() => {
                const val = parseInt(calInput, 10);
                if (!isNaN(val) && val > 0) {
                  setCal(val);
                  setEditingCal(false);
                }
              }}>
                <Text style={styleNutList.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styleNutList.deleteButton} onPress={() => {
                setCalInput(cal.toString());
                setEditingCal(false);
              }}>
                <Text style={styleNutList.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={[styleNutList.calText, {marginRight: 8}]}>{cal}</Text>
              <TouchableOpacity style={styleNutList.editButton} onPress={() => setEditingCal(true)}>
                <Text style={styleNutList.buttonText}>Edit</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        {Object.keys(groupedNuts).length === 0 ? (
          <>
            <Text>No food items found for this user.</Text>
            <TouchableOpacity style={styleNutList.button} onPress={() => navigation.navigate('CreateNut', { userId })}>
              <Text style={styleNutList.buttonText}>Create New Food Item</Text>
            </TouchableOpacity>
          </>
        ) : (
          <FlatList
            data={Object.keys(groupedNuts).sort((a, b) => b.localeCompare(a))}
            keyExtractor={date => date}
            renderItem={({ item: date }) => (
              <View style={{ marginBottom: 24, width: '100%' }}>
                <Text style={styleNutList.progressTitle}>{moment(date).format('dddd, MMM D, YYYY')}</Text>
                <Text style={styleNutList.nutText}>Calories Consumed: {caloriesByDay[date]} / {cal} | Remaining: {cal - caloriesByDay[date]}</Text>
                {groupedNuts[date].map((nut: Nut) => (
                  <View style={styleNutList.nutItem} key={nut.id || nut.title}>
                    <LinearGradient
                      colors={['#7d00ff','#0087FF' ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{ flex: 1 }}
                    >
                      <Text style={styleNutList.nutTitle}>{nut.title}</Text>
                      {nut.calories ? <Text style={styleNutList.calText}>Calories: {nut.calories}</Text> : null}
                      {nut.description ? <Text style={styleNutList.nutText}>Food Description: {nut.description}</Text> : null}
                      {nut.startDate ? <Text style={styleNutList.nutText}>Time Eaten: {moment(nut.startDate).format('h:mm:ss a')}</Text> : null}
                      <View style={styleNutList.buttonRow}>
                        <TouchableOpacity style={styleNutList.editButton} onPress={() => handleEdit(nut)}>
                          <Text style={styleNutList.buttonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styleNutList.deleteButton} onPress={() => handleDelete(nut.id!)}>
                          <Text style={styleNutList.buttonText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </LinearGradient>
                  </View>
                ))}
              </View>
            )}
          />
        )}
        <TouchableOpacity style={styleNutList.button} onPress={() => navigation.navigate('CreateNut', { userId })}>
          <Text style={styleNutList.buttonText}>Create New Food Item</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default NutitrionScreen;