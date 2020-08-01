import React, { useCallback, useEffect, useState } from 'react';
import { View  } from 'react-native';
import { useAuth } from 'src/hooks/auth';
import {
  Container,
  Header,
  HeaderTitle,
  BackButton,
  UserAvatar,
  ProvidersList,
  ProviderListContainer,
  ProviderAvatar,
  ProviderName,
  ProviderContainer
} from './styles';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const CreateAppointment: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const {user } = useAuth();
  const route = useRoute();
  const {goBack} = useNavigation();

  const routeParams = route.params as RouteParams;
  const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
      console.log(response.data);
    })
  }, []);

  const handleSelectedProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, [setSelectedProvider ]);

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{uri: user.avatar_url}}></UserAvatar>
      </Header>
      <ProviderListContainer>
        <ProvidersList
          data={providers}
          horizontal
          showsHorizontalScrollIndicator={false}

          keyExtractor={provider => provider.id}
          renderItem={({item: provider}) => (
            <ProviderContainer selected={provider.id === selectedProvider}
              onPress={() => handleSelectedProvider(provider.id)}
            >
              <ProviderAvatar source={{uri: provider.avatar_url}}></ProviderAvatar>
              <ProviderName selected={provider.id === selectedProvider}>{provider.name}</ProviderName>
            </ProviderContainer>
          )}
        />
      </ProviderListContainer>
    </Container>
  );
};

export default CreateAppointment;
