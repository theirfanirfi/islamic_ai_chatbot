// components/FeedbackModal.tsx
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../constants/Colors';
import AppSvg from './AppSvg';
import Button from './Button';

interface FeedbackModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (feedback: string, category: string) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ visible, onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'appropriate', label: 'Appropriate' },
    { id: 'tone', label: 'Tone not correct' },
    { id: 'derogatory', label: 'Derogatory' },
  ];

  const handleSubmit = () => {
    if (selectedCategory) {
      onSubmit(feedback, selectedCategory);
      setFeedback('');
      setSelectedCategory(null);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.container}>
          <Pressable onPress={e => e.stopPropagation()}>
            <View style={styles.content}>
              <View style={styles.header}>
                <Text style={styles.title}>Provide Feedback</Text>
                <Pressable onPress={onClose} style={styles.closeButton}>
                  <AppSvg icon="close" width={24} height={24} color={Colors.dark} />
                </Pressable>
              </View>
              
              <Text style={styles.label}>Select issue category</Text>
              <View style={styles.categoriesContainer}>
                {categories.map(category => (
                  <Pressable
                    key={category.id}
                    style={[
                      styles.categoryButton,
                      selectedCategory === category.id && styles.selectedCategory
                    ]}
                    onPress={() => setSelectedCategory(category.id)}
                  >
                    <Text style={[
                      styles.categoryText,
                      selectedCategory === category.id && styles.selectedCategoryText
                    ]}>
                      {category.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
              
              <Text style={styles.label}>Your feedback</Text>
              <TextInput
                style={styles.input}
                value={feedback}
                onChangeText={setFeedback}
                placeholder="Describe your feedback..."
                placeholderTextColor={Colors.mediumGray}
                multiline
                numberOfLines={4}
              />
              
              <Button 
                title="Submit Feedback" 
                onPress={handleSubmit} 
                disabled={!selectedCategory}
                style={styles.submitButton}
              />
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    maxWidth: 400,
  },
  content: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark,
  },
  closeButton: {
    padding: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: 12,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
  },
  selectedCategory: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    color: Colors.dark,
  },
  selectedCategoryText: {
    color: '#FFF',
    fontWeight: '600',
  },
  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.dark,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  submitButton: {
    borderRadius: 12,
    height: 50,
  },
});

export default FeedbackModal;