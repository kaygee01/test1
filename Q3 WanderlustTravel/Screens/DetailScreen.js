import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import moment from 'moment-timezone';

const DetailsScreen = ({ route }) => {
  const { destination } = route.params;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${destination.name}&appid=f7ead8e9c907299a3d1110724f550b14`)
      .then(response => setWeather(response.data))
      .catch(error => console.error('Error fetching weather data', error));
  }, [destination]);

  return (
    <View style={styles.container}>
      <Image source={destination.image} style={styles.image} />

      <Text style={styles.title}>{destination.name}</Text>
      <Text style={styles.description}>{destination.description}</Text>
      <Text style={styles.timeText}>Local Time: {moment().tz(destination.timezone).format('HH:mm')}</Text>
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>Temperature: {Math.round(weather.main.temp - 273.15)}°C</Text>
          <Text style={styles.weatherText}>Weather: {weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    marginVertical: 10,
    color: '#007acc',
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
    color: '#333',
  },
  timeText: {
    fontSize: 18,
    marginTop: 10,
    color: '#333',
    fontWeight: 'bold',
  },
  weatherContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f4f8',
    borderRadius: 10,
  },
  weatherText: {
    fontSize: 16,
    color: '#007acc',
    fontWeight: 'bold',
  },
});

export default DetailsScreen;
