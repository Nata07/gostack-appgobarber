import React from 'react';
import { View, Button } from 'react-native';
import { useAuth } from 'src/hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View>
      <Button title="sair" onPress={signOut} />
    </View>
  );
};

export default Dashboard;
