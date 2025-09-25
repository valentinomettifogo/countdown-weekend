import SunCalc from 'suncalc';
import { ref } from 'vue';
import timezoneCoordinates from '../assets/timezone-coordinates.json';

export function useSunTimes() {
  const sunrise = ref(6);
  const sunset = ref(21);
  const hour = ref(new Date().getHours());
  
  // 🧪 MODALITÀ TEST: Cambia questo valore per testare orari diversi
  // Esempi: 8 (mattina), 14 (pomeriggio), 20 (sera), 2 (notte)
  // Imposta a null per usare l'orario reale
  const TEST_HOUR = null; // <-- Cambia questo valore per testare!

  function updateSunTimes(lat = 45.4642, lng = 9.19) {
    const now = new Date();
    
    // Se è impostato un orario di test, usalo, altrimenti usa l'orario reale
    hour.value = TEST_HOUR !== null ? TEST_HOUR : now.getHours();

    const times = SunCalc.getTimes(now, lat, lng);
    sunrise.value = times.sunrise.getHours();
    sunset.value = times.sunset.getHours();
  }

  function initApproximateLocation() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const coords = timezoneCoordinates[timezone];

    if (coords) {
      updateSunTimes(coords.lat, coords.lng);
    } else {
      updateSunTimes(); // fallback su Milano
    }
  }

  return { 
    hour, 
    sunrise, 
    sunset, 
    initApproximateLocation,
    // Funzione helper per testing
    setTestHour: (testHour) => {
      hour.value = testHour;
    }
  };
}