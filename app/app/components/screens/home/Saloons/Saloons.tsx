import { FC, useEffect, useState } from 'react'
import * as Location from 'expo-location';
import Loader from '@/components/ui/Loader'
import Catalog from '@/components/ui/catalog/Catalog'

import { useSaloons } from './useSaloons'


const Saloons: FC = () => {
	const [location, setLocation] = useState<any>(null);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const distanceLimit = 99999999
	const { isLoading, saloons } = useSaloons(
		location?.coords?.longitude || 0, 
		location?.coords?.latitude || 0, 
		distanceLimit
	);



	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permissão para acessar localização negada.');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	let text = 'Carregando...';
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
	}


	return isLoading ? (
		<Loader />
	) : (

		<Catalog title='Próximos a você' saloons={saloons || []} filterButton/>

	)
}

export default Saloons