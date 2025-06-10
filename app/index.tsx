import RootNavigator from '../navigation/RootNavigator';
import React from 'react';

import { AuthProvider } from '../context/AuthContext';

export default function Index() {
  // Wrap the app in AuthProvider
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
