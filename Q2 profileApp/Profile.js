import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView, SafeAreaView, StyleSheet } from 'react-native';

const ProfileCard = () => {
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowed(!isFollowed);
  };

  const handleSubmit = () => {
    Alert.alert('Profile Submitted');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.card}>
          <View style={styles.profileContainer}>
            <Image
              style={styles.image}
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
            />
            <View style={styles.textContainer}>
              <Text style={styles.name}>John Doe</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Bio"
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your Profession"
              />
              <TouchableOpacity 
                style={styles.button} 
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, isFollowed && styles.unfollowButton]} 
                onPress={handleFollowToggle}
              >
                <Text style={styles.buttonText}>
                  {isFollowed ? "Unfollow" : "Follow"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007acc',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#007acc',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#333',
  },
  button: {
    backgroundColor: '#007acc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  unfollowButton: {
    backgroundColor: '#ff4757',
  },
});

export default ProfileCard;
