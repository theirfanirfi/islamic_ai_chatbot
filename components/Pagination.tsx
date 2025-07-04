// components/Pagination.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../constants/Colors';

const Pagination: React.FC<{ dots: number; active: number }> = ({ dots, active }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: dots }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === active ? styles.activeDot : styles.inactiveDot
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: 12,
  },
  inactiveDot: {
    backgroundColor: Colors.lightGray,
  },
});

export default Pagination;