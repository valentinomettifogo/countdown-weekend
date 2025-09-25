import { computed } from 'vue';
import { useSunTimes } from './useSunTimes.js';

export function useSkyState() {
  const sunTimes = useSunTimes();
  
  // Stato del cielo ottimizzato
  const isDay = computed(() => 
    sunTimes.hour.value >= sunTimes.sunrise.value && 
    sunTimes.hour.value < sunTimes.sunset.value
  );
  
  // Props per il componente Sky - centralizzate
  const skyProps = computed(() => ({
    hour: sunTimes.hour.value,
    sunrise: sunTimes.sunrise.value,
    sunset: sunTimes.sunset.value,
    isDay: isDay.value
  }));
  
  return {
    ...sunTimes,
    isDay,
    skyProps
  };
}