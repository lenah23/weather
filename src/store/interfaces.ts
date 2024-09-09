export interface IGetCurrentWeatherData {
  location: string;
}

interface IMain {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

interface ISys {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
}

interface IWeather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface IWind {
  deg: number;
  speed: number;
}

type ICloud = { all: number };

interface ICoords {
  lon: number;
  lat: number;
}

export interface IGetWeatherDataResp {
  id: number;
  base: string;
  clouds: ICloud;
  cod: number;
  coord: ICoords;
  dt: number;
  main: IMain;
  name: string;
  sys: ISys;
  timezone: number;
  visibility: number;
  weather: IWeather[];
  wind: IWind;
}

export enum Scales {
  'F' = 'Farenhait',
  'C' = 'Celcius',
}

export interface IDailyWeatherList {
  main: { temp: number },
  weather: string[]
}