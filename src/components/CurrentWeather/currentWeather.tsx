import { useMemo } from 'react';
import styles from './currentWeather.module.scss';
import { IGetWeatherDataResp } from '../../store/interfaces';

interface Iprops {
  fetchedData: IGetWeatherDataResp | undefined;
  isLoading: boolean;
  isError: boolean;
  initialData: any;
  dailyWeatherData: any;
  scale: string;
}

const CurrentWeather: React.FC<Iprops> = (props: Iprops) => {
  const {
    isLoading,
    fetchedData,
    isError,
    initialData,
    dailyWeatherData,
    scale,
  } = props;

  const temperature = useMemo(
    () => (val: any) => {
      return (val * 9) / 5 + 32;
    },
    [scale]
  );

  if (isLoading) {
    return <div>Loading weather data...</div>;
  }

  if (isError) {
    return <div>Any city by that name has not been found...</div>;
  }

  return (
    <div>
      <div className={styles['current-weather']}>
        <p>Location: {initialData ? initialData?.name : fetchedData?.name}</p>
        <p>
          Temperature:{' '}
          {initialData && scale === 'f'
            ? `${temperature(initialData?.main?.temp)} F`
            : initialData && scale === 'c'
            ? `${initialData?.main?.temp} C`
            : fetchedData && scale === 'f'
            ? `${(fetchedData?.main?.temp * 9) / 5 + 32}`
            : `${(fetchedData?.main?.temp! * 9) / 5 + 32} C`}
        </p>
        <p>
          Weather:{' '}
          {initialData
            ? initialData?.weather[0].description
            : fetchedData?.weather[0].description}
        </p>
      </div>
      <div>
        {dailyWeatherData?.list?.map((item: any, index: number) => {
          return (
            <div key={index}>
              <p>
                {scale === 'f'
                  ? `${temperature(item?.main?.temp)} F`
                  : `${item?.main?.temp} C`}
              </p>
              <p>Weather: {item?.weather[0]?.description}</p>
              <p>Weather: {item?.dt_txt}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CurrentWeather;
