import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import AuthContext from '../../context/AuthContext';
import HomeScreen from '../HomeScreen';

const mockNavigate = jest.fn();
const navigation = { navigate: mockNavigate } as any;
const route = { key: 'Home', name: 'Home' } as any;

const renderWithAuth = (user: any = null) =>
  renderer.create(
    <AuthContext.Provider value={{ user, signIn: jest.fn(), signOut: jest.fn() }}>
      <HomeScreen navigation={navigation} route={route} />
    </AuthContext.Provider>
  );

describe('HomeScreen (Jest/renderer)', () => {
  it('renders login UI when not logged in (snapshot)', () => {
    const tree = renderWithAuth(null).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders welcome message when logged in', () => {
    const mockUser = { email: 'jest@example.com', uid: 'jest123' };
    const testInstance = renderWithAuth(mockUser).root;
    expect(
      testInstance.findAll(
        node => node.type === Text && node.props.children?.includes('Welcome, jest@example.com')
      ).length
    ).toBeGreaterThan(0);
  });

  it('calls navigation.navigate when Go to Nut is pressed', () => {
    const mockUser = { email: 'jest@example.com', uid: 'jest123' };
    const testInstance = renderWithAuth(mockUser).root;
    const nutButton = testInstance.find(
      node => node.props && node.props.onPress && node.props.children && typeof node.props.children === 'object' && node.props.children.props && node.props.children.props.children === 'Go to Nut'
    );
    nutButton.props.onPress();
    expect(mockNavigate).toHaveBeenCalledWith('Main', { screen: 'Nutrition', params: { userId: 'jest123' } });
  });
});
