"use client";
import { useState } from 'react';

export const useToolTip = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showToolTip = () => setIsVisible(true);

  const hideToolTip = () => setIsVisible(false);

  return {
    isVisible,
    showToolTip,
    hideToolTip,
  };
};