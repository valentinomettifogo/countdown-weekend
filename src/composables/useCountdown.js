import { ref } from 'vue';

export function useCountdown() {
    const timeLeft = ref({ days: 0, hours: 0, minutes: 0 });
    const progress = ref(0);
    const isWeekend = ref(false);

    function getNextWeekendStart() {
        const now = new Date();
        const day = now.getDay();
        const target = new Date(now);
        const daysUntilFriday = (5 - day + 7) % 7;
        target.setDate(now.getDate() + daysUntilFriday);
        target.setHours(18, 0, 0, 0);

        if (now > target) target.setDate(target.getDate() + 7);
        return target;
    }

    function updateCountdown() {
        const now = new Date();
        //const now = new Date('2025-06-13T18:30:00'); // dev: venerdì ore 18:30
        const weekendStart = getNextWeekendStart();

        if (now >= weekendStart) {
            isWeekend.value = true;
            timeLeft.value = { days: 0, hours: 0, minutes: 0 };
            progress.value = 100;
            return;
        }

        isWeekend.value = false;

        const diffMs = weekendStart - now;
        const minutes = Math.floor(diffMs / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        timeLeft.value = {
            days,
            hours: hours % 24,
            minutes: minutes % 60
        };

        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - ((now.getDay() + 6) % 7));
        weekStart.setHours(0, 0, 0, 0);

        const totalWeekMs = weekendStart - weekStart;
        const elapsedMs = now - weekStart;

        progress.value = Math.min(100, Math.floor((elapsedMs / totalWeekMs) * 100));
    }

    return { timeLeft, progress, isWeekend, updateCountdown };
}
