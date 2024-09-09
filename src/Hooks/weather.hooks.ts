import { useEffect, useState } from 'react';
import {
  useGetCurrentWeatherQuery,
  useGetDailyWeatherQuery,
} from '../store/Requests/weatherApi';
import { Scales } from '../store/interfaces';

export default () => {
  const [inputValue, setInputValue] = useState<string>('Yerevan');
  const [skip, setSkip] = useState<boolean>(true);
  const [initialData, setInitialData] = useState<any>();
  const [scale, setScale] = useState<string>('c');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log('Geolocation not supported');
    }

    function success(position: any) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          setInitialData(data);
        })
        .catch((error) => console.log(error));
    }

    function error() {
      console.log('Unable to retrieve your location');
    }
  }, []);

  const {
    data: fetchedData,
    isLoading,
    isSuccess,
    isError,
  } = useGetCurrentWeatherQuery({ location: inputValue }, { skip });

  const { data: dailyWeatherData } = useGetDailyWeatherQuery({
    location: inputValue,
  });

  useEffect(() => {
    if (isSuccess) {
      setInitialData(null);
    }
  }, [isSuccess]);

  return {
    fetchedData,
    setInputValue,
    setSkip,
    isLoading,
    isError,
    initialData,
    dailyWeatherData,
    setScale,
    scale,
  };
};
