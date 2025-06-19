import { getUserCalorieGoal, setUserCalorieGoal, getUserGoalWeight, setUserGoalWeight } from '../userService';

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(() => Promise.resolve({ exists: () => true, data: () => ({ calorieGoal: 2000, goalWeight: 150 }) })),
  setDoc: jest.fn(() => Promise.resolve()),
}));

describe('userService', () => {
  const userId = 'testUser';

  it('gets user calorie goal from Firestore', async () => {
    const goal = await getUserCalorieGoal(userId);
    expect(goal).toBe(2000);
  });

  it('sets user calorie goal in Firestore', async () => {
    await expect(setUserCalorieGoal(userId, 1800)).resolves.toBeUndefined();
  });

  it('gets user goal weight from Firestore', async () => {
    const weight = await getUserGoalWeight(userId);
    expect(weight).toBe(150);
  });

  it('sets user goal weight in Firestore', async () => {
    await expect(setUserGoalWeight(userId, 140)).resolves.toBeUndefined();
  });
});
