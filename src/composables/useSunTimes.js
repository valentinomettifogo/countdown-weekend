import SunCalc from 'suncalc';
import { ref } from 'vue';

export function useSunTimes() {
  const sunrise = ref(6);
  const sunset = ref(21);
  const hour = ref(new Date().getHours());

  function updateSunTimes(lat = 45.4642, lng = 9.19) {
    const now = new Date();
    hour.value = now.getHours();

    const times = SunCalc.getTimes(now, lat, lng);
    sunrise.value = times.sunrise.getHours();
    sunset.value = times.sunset.getHours();
  }

  // Geolocalizzazione automatica
  function initWithGeolocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          updateSunTimes(lat, lng);
        },
        () => {
          // fallback se l’utente nega i permessi
          updateSunTimes();
        }
      );
    } else {
      // fallback statico
      updateSunTimes();
    }
  }

  return { hour, sunrise, sunset, initWithGeolocation };
}