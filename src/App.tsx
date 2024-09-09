import { CurrentWeather, Header } from './components';
import useWeatherHooks from './Hooks/weather.hooks';
import './App.css';

function App() {
  const {
    fetchedData,
    setSkip,
    setInputValue,
    isLoading,
    isError,
    initialData,
    dailyWeatherData,
    setScale,
    scale,
  } = useWeatherHooks();
  return (
    <div className='App'>
      <Header
        setSkip={setSkip}
        setInputValue={setInputValue}
        setScale={setScale}
      />
      <CurrentWeather
        fetchedData={fetchedData}
        isLoading={isLoading}
        isError={isError}
        initialData={initialData}
        dailyWeatherData={dailyWeatherData}
        scale={scale}
      />
    </div>
  );
}

export default App;
