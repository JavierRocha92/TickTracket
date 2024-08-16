import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert, Text } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import TesseractOcr, { useEventListener } from '@devinikhiya/react-native-tesseractocr';

export default function App() {
  const [scannedImage, setScannedImage] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [resultText, setResultText] = useState(null);

  const scanDocument = async () => {
    try {
      // Start the document scanner
      const { scannedImages } = await DocumentScanner.scanDocument();

      // Get back an array with scanned image file paths
      if (scannedImages.length > 0) {
        const imageUri = scannedImages[0];
        setScannedImage(imageUri);

        try {
          // Download langujae packages from https://github.com/tesseract-ocr/tessdata
          const recognizedText = await TesseractOcr.recognize(
            imageUri,
            'spa',
            {},
          );
          console.log('ESTE ES EL TIKET DE LA COMPRA');
          console.log(recognizedText)
        } catch (error) {
          console.log('error tesseract is', error);
        }


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
        <>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: scannedImage }}
          />
          {resultText && <View style={styles.resultContainer}><Text>{resultText}</Text></View>}
        </>
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
    width: '80%',
    height: 300,
    marginVertical: 20,
  },
  resultContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
