import SunCalc from 'suncalc';
import { ref } from 'vue';
import timezoneCoordinates from '../assets/timezone-coordinates.json';

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

  function initApproximateLocation() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const coords = timezoneCoordinates[timezone];

    if (coords) {
      updateSunTimes(coords.lat, coords.lng);
    } else {
      updateSunTimes(); // fallback su Milano
    }
  }

  return { hour, sunrise, sunset, initApproximateLocation };
}