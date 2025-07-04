import { useState } from 'react';

export const useFeedback = (onSubmit) => {
  const [visible, setVisible] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [selectedFlags, setSelectedFlags] = useState([]);

  const showFeedback = (messageId) => {
    setSelectedMessageId(messageId);
    setVisible(true);
  };

  const hideFeedback = () => {
    setVisible(false);
    setFeedback('');
    setSelectedFlags([]);
  };

  const toggleFlag = (flagId) => {
    setSelectedFlags(prev => 
      prev.includes(flagId) 
        ? prev.filter(id => id !== flagId)
        : [...prev, flagId]
    );
  };

  const submitFeedback = () => {
    onSubmit({
      messageId: selectedMessageId,
      feedback,
      flags: selectedFlags
    });
    hideFeedback();
  };

  return {
    visible,
    feedback,
    setFeedback,
    selectedFlags,
    showFeedback,
    hideFeedback,
    toggleFlag,
    submitFeedback
  };
};
