<template>
  <div v-if="isDev" class="debug-panel">
    <h3>🧪 {{ title }}</h3>
    <div class="debug-controls">
      <button 
        v-for="option in options" 
        :key="option.value" 
        @click="handleOptionClick(option.value)"
        :class="{ active: isActive(option.value) }"
        class="debug-btn">
        {{ option.label }}
      </button>
      <button 
        v-if="showReset"
        @click="handleReset" 
        class="debug-btn reset">
        {{ resetLabel }}
      </button>
    </div>
    <p v-if="info" class="debug-info">
      {{ info }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Debug Panel'
  },
  options: {
    type: Array,
    required: true,
    // Array di oggetti: [{ value: 8, label: '8:00' }, ...]
  },
  currentValue: {
    type: [Number, String, null],
    default: null
  },
  info: {
    type: String,
    default: ''
  },
  showReset: {
    type: Boolean,
    default: true
  },
  resetLabel: {
    type: String,
    default: 'Reset'
  }
});

const emit = defineEmits(['option-selected', 'reset']);

const isDev = import.meta.env.DEV;

function handleOptionClick(value) {
  emit('option-selected', value);
}

function handleReset() {
  emit('reset');
}

function isActive(value) {
  return props.currentValue === value;
}
</script>

<style scoped>
/* 🧪 Debug Panel Styles */
.debug-panel {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  background: var(--color-surface);
  border: 2px dashed var(--color-accent);
  border-radius: var(--radius-md);
  padding: 1rem;
  box-shadow: var(--shadow-soft);
  z-index: 9999;
  min-width: 300px;
  pointer-events: auto;
}

.debug-panel h3 {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  color: var(--color-accent);
  font-weight: 600;
}

.debug-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-bottom: 0.75rem;
}

.debug-controls:last-child {
  margin-bottom: 0;
}

.debug-btn {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.debug-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.debug-btn.active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: white;
}

.debug-btn.reset {
  background: var(--color-success);
  border-color: var(--color-success);
  color: white;
}

.debug-btn.reset:hover {
  opacity: 0.9;
}

.debug-info {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin: 0;
  font-family: monospace;
  background: var(--color-background);
  padding: 0.5rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
}

@media (max-width: 768px) {
  .debug-panel {
    bottom: 4rem;
    left: 0.5rem;
    right: 0.5rem;
    min-width: auto;
    max-width: calc(100vw - 1rem);
  }
  
  .debug-controls {
    justify-content: center;
  }
}
</style>