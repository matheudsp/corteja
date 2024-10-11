import { FC, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import Loader from '@/components/ui/Loader';
import Catalog from '@/components/ui/catalog/Catalog';
import { useSaloons } from './useSaloons';
import { Box } from 'components/ui/box';
import { Text } from 'components/ui/text';

const Saloons: FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState(true);
  const distanceLimit = 99999999999;

  const { isLoading: isSaloonsLoading, saloons } = useSaloons(
    location?.coords?.longitude || 0,
    location?.coords?.latitude || 0,
    distanceLimit
  );

  useEffect(() => {
    (async () => {
      setIsLocationLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar localização negada.');
        setIsLocationLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg('Erro ao obter a localização.');
      } finally {
        setIsLocationLoading(false);
      }
    })();
  }, []);

  const isLoading = isLocationLoading || isSaloonsLoading;

  if (errorMsg) {
    return <Box><Text>{errorMsg}</Text>;</Box>
  }
  
  return <Catalog title="Próximos a você" isLoading={isLoading} saloons={saloons || []} />;
};

export default Saloons;
