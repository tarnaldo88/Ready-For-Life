import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import { AuthContext } from '../../context/AuthContext';

const mockNavigate = jest.fn();
const navigation = { navigate: mockNavigate } as any;

// Mock AuthContext provider
const renderWithAuth = (user: any = null) =>
  render(
    <AuthContext.Provider value={{ user }}>
      <HomeScreen navigation={navigation} route={{ key: 'Home', name: 'Home' }} />
    </AuthContext.Provider>
  );

describe('HomeScreen', () => {
  it('shows login UI when not logged in', () => {
    const { getByPlaceholderText, getByText } = renderWithAuth(null);
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });

  it('shows welcome message when logged in', () => {
    const mockUser = { email: 'test@example.com', uid: '123' };
    const { getByText } = renderWithAuth(mockUser);
    expect(getByText(/Welcome, test@example.com/)).toBeTruthy();
  });

  it('navigates to Nutrition when Go to Nut pressed', () => {
    const mockUser = { email: 'test@example.com', uid: '123' };
    const { getByText } = renderWithAuth(mockUser);
    fireEvent.press(getByText('Go to Nut'));
    expect(mockNavigate).toHaveBeenCalledWith('Main', { screen: 'Nutrition', params: { userId: '123' } });
  });
});
