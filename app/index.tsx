import BottomTabs from '@/navigation/BottomTabs';
import React from 'react';

import { AuthProvider } from '../context/AuthContext';

export default function Index() {
  // Wrap the app in AuthProvider
  return (
    <AuthProvider>
      <BottomTabs />
    </AuthProvider>
  );
}
