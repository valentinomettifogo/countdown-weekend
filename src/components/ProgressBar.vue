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
  margin-top: 2rem;
  width: 100%;
  max-width: 500px;
  margin: 0 auto 10px auto;
}

.progress-label {
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: #555;
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 16px;
  background-color: #f0f0f0;
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease;
}
</style>
