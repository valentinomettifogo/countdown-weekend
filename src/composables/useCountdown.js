import { ref } from 'vue';

export function useCountdown() {
    const timeLeft = ref({ days: 0, hours: 0, minutes: 0 });
    const progress = ref(0);
    const isWeekend = ref(false);

    function getWeekendRange() {
        const now = new Date();
        const day = now.getDay();

        // Calcola l'inizio del weekend: venerdì alle 18:00
        const weekendStart = new Date(now);
        const daysSinceFriday = (day + 7 - 5) % 7; // quanto manca da venerdì
        weekendStart.setDate(now.getDate() - daysSinceFriday);
        weekendStart.setHours(18, 0, 0, 0);

        // Fine del weekend: domenica alle 23:59:59
        const weekendEnd = new Date(weekendStart);
        weekendEnd.setDate(weekendStart.getDate() + 2);
        weekendEnd.setHours(23, 59, 59, 999);

        return { weekendStart, weekendEnd };
    }

    function updateCountdown() {
        const now = new Date();
        const { weekendStart, weekendEnd } = getWeekendRange();

        if (now >= weekendStart && now <= weekendEnd) {
            isWeekend.value = true;
            timeLeft.value = { days: 0, hours: 0, minutes: 0 };
            progress.value = 100;
            return;
        }

        isWeekend.value = false;

        // Calcola il prossimo weekend se siamo dopo la fine di questo
        const nextWeekendStart = new Date(weekendStart);
        if (now > weekendEnd) {
            nextWeekendStart.setDate(nextWeekendStart.getDate() + 7);
        }

        const diffMs = nextWeekendStart.getTime() - now.getTime();
        const minutes = Math.floor(diffMs / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        timeLeft.value = {
            days,
            hours: hours % 24,
            minutes: minutes % 60
        };

        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // Lunedì
        weekStart.setHours(0, 0, 0, 0);

        const totalWeekMs = nextWeekendStart - weekStart;
        const elapsedMs = now - weekStart;

        progress.value = Math.min(100, Math.floor((elapsedMs / totalWeekMs) * 100));
    }

    return { timeLeft, progress, isWeekend, updateCountdown };
}
