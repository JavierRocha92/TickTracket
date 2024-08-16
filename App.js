import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';

export default function App() {
  const [scannedImage, setScannedImage] = useState(null);
  const [scanning, setScanning] = useState(false);

  const scanDocument = async () => {
    try {
      // Start the document scanner
      const { scannedImages } = await DocumentScanner.scanDocument();
      
      // Get back an array with scanned image file paths
      if (scannedImages.length > 0) {
        // Set the img src, so we can view the first scanned image
        setScannedImage(scannedImages[0]);
      }
    } catch (error) {
      console.error('Error scanning document:', error);
      Alert.alert('Error', 'Failed to scan document. Please try again.');
    } finally {
      setScanning(false); // End scanning mode
    }
  };

  return (
    <View style={styles.container}>
      {!scannedImage ? (
        <View style={styles.buttonContainer}>
          <Button
            title="Scan Ticket"
            onPress={() => {
              setScanning(true);
              scanDocument();
            }}
          />
        </View>
      ) : (
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{ uri: scannedImage }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '80%',
    margin: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
