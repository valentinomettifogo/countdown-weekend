<template>
    <div class="countdown">
        <span>{{ time.days }}{{ t('d') }}</span>
        <span>{{ time.hours }}{{ t('h') }}</span>
        <span>{{ time.minutes }}{{ t('m') }}</span>
    </div>
</template>

<script setup>
defineProps({
    time: Object,
    t: Function
});
</script>

<style scoped>
.countdown {
    font-size: 2.5rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 30px;
}

.countdown span {
    background: #f0f0f0;
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 2rem;
    transition: transform 0.2s ease;
}

.countdown span:hover {
    transform: scale(1.1);
}
</style>
