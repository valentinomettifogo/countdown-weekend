<template>
  <div :class="['sky', isDay ? 'day' : 'night']">
    <!-- Sole stilizzato -->
    <div v-if="isDay" class="sun" :style="{ left: sunLeft }">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="4" fill="currentColor"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 6.34L4.93 4.93M19.07 19.07l-1.41-1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
    
    <!-- Luna stilizzata -->
    <div v-else class="moon" :style="{ left: moonLeft }">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>
      </svg>
    </div>
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
  transition: background 2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
  pointer-events: none;
  inset: 0;
}

/* Giorno - Gradiente più sottile e moderno */
.day {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
}

/* Notte - Gradiente più sottile e moderno */
.night {
  background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
}

.sun,
.moon {
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  top: 8vh;
  transition: all 2s cubic-bezier(0.4, 0, 0.2, 1);
}

.sun {
  color: #f59e0b;
  opacity: 0.8;
  animation: gentle-rotate 20s linear infinite;
}

.moon {
  color: #e5e7eb;
  opacity: 0.9;
  transform: rotate(-15deg);
}

.sun svg,
.moon svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 8px currentColor);
}

@keyframes gentle-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .sun,
  .moon {
    width: 2rem;
    height: 2rem;
    top: 6vh;
  }
  
  .sun {
    opacity: 0.6;
  }
  
  .moon {
    opacity: 0.7;
  }
  
  .sun svg,
  .moon svg {
    filter: drop-shadow(0 0 4px currentColor);
  }
}
</style>
