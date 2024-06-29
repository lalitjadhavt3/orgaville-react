import {React, useState} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

const GroupedImages = ({src, totalImages}) => {
  const [errorImages, setErrorImages] = useState({});

  const handleError = index => {
    setErrorImages(prevErrorImages => ({
      ...prevErrorImages,
      [index]: true,
    }));
  };
  return (
    <>
      <View style={styles.orderImg}>
        {src.slice(0, 3).map((imageSrc, index) => (
          <Image
            key={index}
            source={
              errorImages[index]
                ? require('../assets/banner1.png')
                : {uri: imageSrc}
            }
            style={
              src.length == 1 ? styles.orderImgItemOne : styles.orderImgItem
            }
            onError={() => handleError(index)}
          />
        ))}
        {src.length > 3 && (
          <View style={styles.moreImg}>
            <Text style={styles.plusText}>+{src.length - 3}</Text>
          </View>
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  plusText: {
    fontSize: 13,
    color: 'grey',
  },
  moreImg: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 27, // Adjust this percentage to create space between items
    margin: '1.5%', // Adjust this percentage to create space between items
    height: 27,
    border: 1,
    borderWidth: 0.7,
    borderColor: 'grey',
    borderRadius: 15,
  },
  orderImgItemOne: {
    width: 40, // Adjust this percentage to create space between items
    margin: '2%', // Adjust this percentage to create space between items
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderImgItem: {
    width: 27, // Adjust this percentage to create space between items
    margin: '2%', // Adjust this percentage to create space between items
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderImg: {
    width: '17%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GroupedImages;
