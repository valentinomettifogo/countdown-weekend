<template>
  <div class="progress-container">
    <div class="progress-label">{{ label }}</div>
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progress + '%' }" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  progress: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    default: 'Progress'
  }
});
</script>

<style scoped>
.progress-container {
  width: 100%;
  margin: 0;
}

.progress-label {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  color: var(--color-text-muted);
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background-color: var(--color-border);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-accent), var(--color-success));
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 3px;
}
</style>
