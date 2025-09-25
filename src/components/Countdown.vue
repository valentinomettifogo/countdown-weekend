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
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 0;
}

.countdown span {
    background: var(--color-surface);
    border: 2px solid var(--color-border);
    color: var(--color-primary);
    padding: 1rem 1.5rem;
    border-radius: var(--radius-md);
    font-size: 1.75rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.025em;
    min-width: 4rem;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
}

.countdown span:hover {
    border-color: var(--color-accent);
    transform: translateY(-2px);
}

@media (max-width: 640px) {
    .countdown {
        gap: 0.75rem;
    }
    
    .countdown span {
        padding: 0.75rem 1rem;
        font-size: 1.5rem;
        min-width: 3.5rem;
    }
}

@media (max-width: 480px) {
    .countdown {
        gap: 0.5rem;
    }
    
    .countdown span {
        padding: 0.5rem 0.75rem;
        font-size: 1.25rem;
        min-width: 3rem;
    }
}
</style>
