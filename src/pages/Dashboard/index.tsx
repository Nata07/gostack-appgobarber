import React, { useCallback, useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProviderContainer,
  ProvidersListTitle,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText } from './styles';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  // const {providers, setProviders} = useState<Provider[] | null>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const {signOut, user } = useAuth();
  const {navigate} = useNavigation();
  const navigateToProfile = useCallback(() => {
    // navigate('Profile')
    signOut();
  }, [signOut]);
  const navigateToCreateAppointment = useCallback((providerId: string) => {
    navigate('CreateAppointment', {providerId})
  }, [navigate]);

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
      console.log(response.data);
    })
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo {"\n"}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{uri: user.avatar_url}} />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        ListHeaderComponent={
          <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
        }
        renderItem={({item: provider}) => (
          <ProviderContainer onPress={() => navigateToCreateAppointment(provider.id)} >
            <ProviderAvatar source={{uri: provider.avatar_url}} />

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <ProviderMetaText>Segunda a sexta </ProviderMetaText>
              </ProviderMeta>


              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderMetaText>08:00h às 18:00h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />

    </Container>
  );
};

export default Dashboard;
