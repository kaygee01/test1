import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment-timezone';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const Destinations = [
      { id: '1', name: 'Paris', image: require('../assets/destinations/paris.jpg'), description: "Paris, often referred to as the 'City of Lights,' is renowned for its rich history, stunning architecture, and vibrant culture. The city boasts iconic landmarks such as the Eiffel Tower, Notre-Dame Cathedral, and the Louvre Museum. Paris is celebrated for its world-class art, fashion, and culinary scenes. Visitors can stroll along the Seine River, explore charming neighborhoods like Montmartre, and indulge in gourmet dining at its exquisite restaurants. With its romantic ambiance and cultural heritage, Paris remains a top destination for travelers from around the globe.", timezone: 'Europe/Paris' },
      { id: '2', name: 'New York', image: require('../assets/destinations/new york.avif'), description: "Known as 'The Big Apple,' New York City is a bustling metropolis that offers an unparalleled urban experience. Famous for its iconic skyline, NYC is home to landmarks like Times Square, Central Park, and the Statue of Liberty. The city's diverse neighborhoods, from the artsy streets of Brooklyn to the luxury of Manhattan, provide a myriad of experiences. Visitors can enjoy Broadway shows, explore world-class museums like the Metropolitan Museum of Art, and savor cuisine from around the world. New York City's dynamic energy and cultural diversity make it a must-visit destination.", timezone: 'America/New_York' },
      { id: '3', name: 'Tokyo', image: require('../assets/destinations/tokyo.jpeg'), description: "Tokyo, the capital of Japan, is a dazzling fusion of modernity and tradition. With its futuristic skyscrapers and bustling streets, Tokyo is a global hub for technology and innovation. The city is also rich in cultural heritage, with historic temples like Senso-ji and the serene Meiji Shrine. Tokyo's neighborhoods, such as Shibuya and Shinjuku, offer vibrant shopping districts and diverse culinary delights. The city’s efficient public transportation and unique attractions, including Tokyo Disneyland, make it an exciting destination for travelers.", timezone: 'Asia/Tokyo' },
      { id: '4', name: 'Sedney', image: require('../assets/destinations/sedney.jpg'), description: "Sydney, Australia's largest city, is renowned for its stunning harbor, iconic landmarks, and outdoor lifestyle. The Sydney Opera House and Sydney Harbour Bridge are among the city's most recognizable features, offering breathtaking views and cultural experiences. Visitors can relax on the golden sands of Bondi Beach, explore the Royal Botanic Garden, and enjoy vibrant dining and shopping in areas like Darling Harbour. Sydney's sunny climate and picturesque surroundings make it a fantastic destination for nature lovers and urban explorers alike.", timezone: 'Australia/Sydney' },
      { id: '5', name: 'Cape Town', image: require('../assets/destinations/cape town.avif'), description: "Cape Town, often called 'The Mother City,' is a breathtaking coastal city known for its dramatic landscapes and cultural diversity. Dominated by the majestic Table Mountain, Cape Town offers stunning views and outdoor activities such as hiking and surfing. The city is also rich in history, with attractions like Robben Island and the V&A Waterfront. Cape Town's vibrant neighborhoods, such as Bo-Kaap with its colorful houses and the bustling markets of Greenmarket Square, provide a rich cultural experience. Its combination of natural beauty and cultural richness makes Cape Town a captivating destination.", timezone: 'Africa/Johannesburg' },
      { id: '6', name: 'Rio de Janeiro', image: require('../assets/destinations/janeiro.jpg'), description: "Rio de Janeiro, famously known as the 'Marvelous City,' is celebrated for its vibrant atmosphere, stunning beaches, and iconic landmarks. The city is home to the world-famous Christ the Redeemer statue, which overlooks the beautiful Copacabana and Ipanema beaches. Rio's lively Carnival festival, colorful samba rhythms, and picturesque views from Sugarloaf Mountain create an unforgettable experience. Visitors can explore the lush Tijuca Forest, enjoy the dynamic nightlife, and immerse themselves in the rich cultural traditions of this lively Brazilian city.", timezone: 'America/Sao_Paulo' },
      { id: '7', name: 'Dubai', image: require('../assets/destinations/dubai.avif'), description: "Dubai, a dazzling city in the United Arab Emirates, is renowned for its luxury, innovation, and architectural marvels. The city is home to some of the world's tallest buildings, including the Burj Khalifa, and boasts impressive developments like the Palm Jumeirah and the Dubai Mall. Dubai offers a blend of modernity and tradition, with vibrant souks, pristine beaches, and world-class dining. The city’s opulent hotels, extravagant shopping experiences, and unique attractions such as indoor skiing in the desert make it a captivating destination for travelers.", timezone: 'Asia/Dubai' },
      { id: '8', name: 'Rome', image: require('../assets/destinations/rome.webp'), description: 'Rome, the capital of Italy, is a city steeped in history and grandeur. Known as the "Eternal City," Rome offers a rich tapestry of ancient ruins, Renaissance art, and vibrant street life. Visitors can explore iconic sites such as the Colosseum, the Roman Forum, and the Pantheon, as well as admire masterpieces in the Vatican Museums. Rome’s charming piazzas, historic fountains, and delectable Italian cuisine create an immersive experience in one of the world’s most culturally rich cities.', timezone: 'Europe/Rome' },
      { id: '9', name: 'Istanbul', image: require('../assets/destinations/istanbul.jpg'), description: 'Istanbul, straddling two continents, is a city where East meets West in a vibrant cultural tapestry. The city’s rich history is evident in its stunning landmarks, such as the Hagia Sophia, Topkapi Palace, and the Blue Mosque. Istanbul’s bustling bazaars, including the Grand Bazaar and Spice Bazaar, offer a sensory overload of colors, sounds, and scents. The city’s unique blend of historical significance and modern vibrancy makes it a fascinating destination for those interested in exploring diverse cultures and traditions.', timezone: 'Europe/Istanbul' },
      { id: '10', name: 'Moscow', image: require('../assets/destinations/moscow.avif'), description: "Moscow, the capital of Russia, is a city of grand architecture, historical significance, and vibrant cultural life. The Red Square, home to the Kremlin and Saint Basil's Cathedral, is a symbol of Russian history and power. Moscow's historical and cultural sites, such as the Bolshoi Theatre and the Tretyakov Gallery, showcase its rich artistic heritage. The city’s mix of modern skyscrapers and historic landmarks, along with its extensive public transportation system, provides an intriguing experience.", timezone: 'Europe/Moscow' },
    
    ];
    setDestinations(Destinations);
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
  };

  const filteredDestinations = destinations.filter(dest => dest.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search destinations..."
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredDestinations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.itemContainer}
            onPress={() => navigation.navigate('Details', { destination: item })}
          >
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.timeText}>{moment().tz(item.timezone).format('HH:mm')}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderColor: '#007acc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    color: '#007acc',
  },
  timeText: {
    fontSize: 16,
    color: '#007acc',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
