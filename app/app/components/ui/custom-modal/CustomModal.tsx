import React, { FC, useRef, useEffect, useState } from 'react';
import { View, Modal, Animated } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  className?: string;
  children?: React.ReactNode;
  initialHeight: number;
}

const CustomModal: FC<CustomModalProps> = ({ visible, onClose, className, initialHeight, children}) => {
  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  const [modalHeight, setModalHeight] = useState(400); 
  

  useEffect(() => {
    Animated.timing(backgroundOpacity, {
      toValue: visible ? 0.5 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    if (visible) {
      setModalHeight(initialHeight); 
    }
  }, [visible]);

  const handleGestureEvent = (event: any) => {
    const translationY = event.nativeEvent.translationY;

    
    if (translationY > 50) { 
      onClose();
    } else {
      const newHeight = initialHeight - translationY;
      
      if (newHeight >= 200) { 
        setModalHeight(newHeight);
      }
    }
  };

  // Para restaurar a altura inicial do modal quando ele for fechado
  const handleModalClose = () => {
    setModalHeight(initialHeight);
    onClose();
  };

  return (
    <>
      {visible && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 1)',
            opacity: backgroundOpacity,
            zIndex: 10,
          }}
        />
      )}

      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        statusBarTranslucent
        onRequestClose={handleModalClose}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PanGestureHandler onGestureEvent={handleGestureEvent}>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: modalHeight,
              }}
              className={`bg-white rounded-t-lg ${className}`}
            >
              {/* Barra de arrastar */}
              <View className="w-10 h-1 bg-gray-400 rounded-full self-center mb-2 mt-2" />
              
              {/* Conteúdo do Modal */}
              <View className="flex-1">
                {children}
              </View>
            </View>
          </PanGestureHandler>
        </GestureHandlerRootView>
      </Modal>
    </>
  );
};

export default CustomModal;
