import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to the appropriate starting screen
  return <Redirect href="/auth/login" />;
}