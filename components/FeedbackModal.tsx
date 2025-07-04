import React from 'react';
import { Dimensions, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FEEDBACK_FLAGS } from '../utils/constants';

const { width, height } = Dimensions.get('window');

const FeedbackModal = ({ 
  visible, 
  onClose, 
  feedback, 
  setFeedback, 
  selectedFlags, 
  toggleFlag, 
  onSubmit 
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Provide Feedback</Text>
          
          <Text style={styles.sectionTitle}>Issues (select all that apply):</Text>
          <View style={styles.flagsContainer}>
            {FEEDBACK_FLAGS.map(flag => (
              <TouchableOpacity
                key={flag.id}
                style={[
                  styles.flagButton,
                  selectedFlags.includes(flag.id) && styles.flagButtonSelected
                ]}
                onPress={() => toggleFlag(flag.id)}
              >
                <Text style={[
                  styles.flagText,
                  selectedFlags.includes(flag.id) && styles.flagTextSelected
                ]}>
                  {flag.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Additional Comments:</Text>
          <TextInput
            style={styles.feedbackInput}
            multiline
            placeholder="Please provide specific feedback about the response..."
            value={feedback}
            onChangeText={setFeedback}
            maxLength={500}
          />

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  content: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: width * 0.9,
    maxHeight: height * 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    color: '#333',
  },
  flagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  flagButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    margin: 4,
  },
  flagButtonSelected: {
    backgroundColor: '#667eea',
  },
  flagText: {
    fontSize: 14,
    color: '#666',
  },
  flagTextSelected: {
    color: '#fff',
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 15,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  cancelButtonText: {
    textAlign: 'center',
    color: '#666',
    fontWeight: '500',
  },
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#667eea',
    marginLeft: 10,
  },
  submitButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
  },
});

export default FeedbackModal;