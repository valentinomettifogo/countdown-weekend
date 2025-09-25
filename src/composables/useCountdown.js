import { ref, computed } from 'vue';

export function useCountdown() {
    const timeLeft = ref({ days: 0, hours: 0, minutes: 0 });
    const progress = ref(0);
    const isWeekend = ref(false);

    // Costanti per performance
    const WEEKEND_START_HOUR = 18;
    const WEEKEND_END_HOUR = 23;
    const WEEKEND_END_MINUTES = 59;
    const WEEKEND_END_SECONDS = 59;
    const WEEKEND_END_MS = 999;
    const FRIDAY = 5;
    const SUNDAY = 0;
    const DAYS_IN_WEEK = 7;
    const MS_PER_MINUTE = 1000 * 60;
    const MINUTES_PER_HOUR = 60;
    const HOURS_PER_DAY = 24;

    // Funzione pura per calcolo weekend
    function getWeekendRange(now = new Date()) {
        const day = now.getDay();

        // Calcola l'inizio del weekend: venerdì alle 18:00
        const weekendStart = new Date(now);
        const daysSinceFriday = (day + DAYS_IN_WEEK - FRIDAY) % DAYS_IN_WEEK;
        weekendStart.setDate(now.getDate() - daysSinceFriday);
        weekendStart.setHours(WEEKEND_START_HOUR, 0, 0, 0);

        // Fine del weekend: domenica alle 23:59:59
        const weekendEnd = new Date(weekendStart);
        weekendEnd.setDate(weekendStart.getDate() + 2);
        weekendEnd.setHours(WEEKEND_END_HOUR, WEEKEND_END_MINUTES, WEEKEND_END_SECONDS, WEEKEND_END_MS);

        return { weekendStart, weekendEnd };
    }

    // Funzione ottimizzata per il calcolo del countdown
    function updateCountdown() {
        const now = new Date();
        const { weekendStart, weekendEnd } = getWeekendRange(now);

        // Check se siamo nel weekend
        const nowTime = now.getTime();
        const isCurrentlyWeekend = nowTime >= weekendStart.getTime() && nowTime <= weekendEnd.getTime();

        if (isCurrentlyWeekend) {
            isWeekend.value = true;
            timeLeft.value = { days: 0, hours: 0, minutes: 0 };
            progress.value = 100;
            return;
        }

        isWeekend.value = false;

        // Calcola il prossimo weekend se necessario
        const nextWeekendStart = new Date(weekendStart);
        if (nowTime > weekendEnd.getTime()) {
            nextWeekendStart.setDate(nextWeekendStart.getDate() + DAYS_IN_WEEK);
        }

        // Calcolo ottimizzato del tempo rimanente
        const diffMs = nextWeekendStart.getTime() - nowTime;
        const totalMinutes = Math.floor(diffMs / MS_PER_MINUTE);
        const totalHours = Math.floor(totalMinutes / MINUTES_PER_HOUR);
        const days = Math.floor(totalHours / HOURS_PER_DAY);

        timeLeft.value = {
            days,
            hours: totalHours % HOURS_PER_DAY,
            minutes: totalMinutes % MINUTES_PER_HOUR
        };

        // Calcolo progresso ottimizzato
        const weekStart = new Date(now);
        const daysSinceMonday = (now.getDay() + 6) % DAYS_IN_WEEK; // Lunedì = 0
        weekStart.setDate(now.getDate() - daysSinceMonday);
        weekStart.setHours(0, 0, 0, 0);

        const totalWeekMs = nextWeekendStart.getTime() - weekStart.getTime();
        const elapsedMs = nowTime - weekStart.getTime();

        progress.value = Math.min(100, Math.max(0, Math.floor((elapsedMs / totalWeekMs) * 100)));
    }

    // Computed per formattazione migliorata
    const formattedTimeLeft = computed(() => ({
        days: timeLeft.value.days.toString().padStart(2, '0'),
        hours: timeLeft.value.hours.toString().padStart(2, '0'),
        minutes: timeLeft.value.minutes.toString().padStart(2, '0')
    }));

    // Status del weekend con più info
    const weekendStatus = computed(() => ({
        isWeekend: isWeekend.value,
        progress: progress.value,
        timeLeft: timeLeft.value,
        formattedTimeLeft: formattedTimeLeft.value
    }));

    return { 
        timeLeft, 
        progress, 
        isWeekend, 
        updateCountdown,
        formattedTimeLeft,
        weekendStatus
    };
}
