<template>

  <div :class="['sky', isDay ? 'day' : 'night']">
    <img v-if="isDay" class="sun-img" src="/sky/sun.svg" alt="Sole" :style="{ left: sunLeft }" />
    <img v-else class="moon-img" src="/sky/moon.svg" alt="Luna" :style="{ left: moonLeft }" />
  </div>

</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  hour: {
    type: Number,
    required: true
  },
  sunrise: {
    type: Number,
    required: true
  },
  sunset: {
    type: Number,
    required: true
  }
})

// TODO - Se passo hour = 5 e sunrise = 6 esce il sole anche se dovrebbe essere la luna
const isDay = computed(() => props.hour >= props.sunrise && props.hour < props.sunset)

// Posizione del sole (3 fasi: alba, giorno, tramonto)
const sunLeft = computed(() => {
  const { hour, sunrise, sunset } = props
  const dayMid = (sunrise + sunset) / 2

  if (hour < dayMid) return '20%'
  if (hour === Math.floor(dayMid)) return '50%'
  return '80%'
})

// Posizione della luna (3 fasi: sera, notte, tarda notte)
const moonLeft = computed(() => {
  const { hour, sunrise, sunset } = props;

  // Fascia notturna: es. dalle 21 alle 6
  // Calcolo correttamente nightStart e nightEnd
  const nightStart = sunset;
  const nightEnd = sunrise < sunset ? sunrise + 24 : sunrise; // gestisce l'overflow oltre mezzanotte
  const currentHour = hour < sunrise ? hour + 24 : hour; // anche qui, portiamo tutto sullo stesso "giorno"

  const nightMid = nightStart + (nightEnd - nightStart) / 2;

  if (currentHour < nightMid) return '20%';
  if (currentHour === Math.floor(nightMid)) return '50%';
  return '80%';
});
</script>

<style scoped>
.sky {
  position: fixed;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  transition: background 1s;
  z-index: -1;
  pointer-events: none;
  inset: 0;
  padding-top: 30px;
  background-clip: content-box;
}

/* Giorno */
.day {
  background: linear-gradient(to top, #93d4ee, #ffffff);
}

/* Notte */
.night {
  background: linear-gradient(to top, #0b1a3c, #2a2a72); 
}

.moon-img,
.sun-img {
  position: absolute;
  width: 80px;
  height: 80px;
  transition: left 1s ease-in-out;
}
</style>
