document.addEventListener('DOMContentLoaded', () => {
    const clockContainer = document.getElementById('clock-container');

    // JSON array for location data
    const locations = [
        { id: 'de', name: 'Germany', code: '+49', timezone: 'Europe/Berlin' },
        { id: 'hr', name: 'Croatia', code: '+385', timezone: 'Europe/Zagreb' },
        { id: 'us', name: 'New York', code: '', timezone: 'America/New_York' },
        { id: 'jp', name: 'Japan', code: '+81', timezone: 'Asia/Tokyo' },
        { id: 'in', name: 'India', code: '+91', timezone: 'Asia/Kolkata' }
    ];

    // Function to create and append cards
    function createClockCards() {
        locations.forEach(location => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.id = location.id;
            card.dataset.timezone = location.timezone;

            const cardContent = document.createElement('div');
            cardContent.className = 'card-content';

            const name = document.createElement('h2');
            name.textContent = location.name;

            const time = document.createElement('div');
            time.className = 'time';

            const date = document.createElement('div');
            date.className = 'date';

            cardContent.appendChild(name);
            cardContent.appendChild(time);
            cardContent.appendChild(date);
            card.appendChild(cardContent);
            clockContainer.appendChild(card);
        });
    }

    // Function to get time-of-day class
    function getTimeOfDay(hour) {
        if (hour >= 5 && hour < 12) return { name: 'morning', emoji: '🌅' };
        if (hour >= 12 && hour < 18) return { name: 'day', emoji: '☀️' };
        if (hour >= 18 && hour < 22) return { name: 'evening', emoji: '🌆' };
        return { name: 'night', emoji: '🌙' };
    }

    // Function to update all clocks
    function updateClocks() {
        const now = new Date();
        const locationsData = locations; // Access the original locations array

        document.querySelectorAll('.card').forEach(card => {
            const timezone = card.dataset.timezone;
            if (!timezone) return;

            try {
                const timeOptions = {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                    timeZone: timezone
                };
                const dateOptions = {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    timeZone: timezone
                };

                const timeString = new Intl.DateTimeFormat('en-US', timeOptions).format(now);
                const dateString = new Intl.DateTimeFormat('en-US', dateOptions).format(now);

                card.querySelector('.time').textContent = timeString;
                card.querySelector('.date').textContent = dateString;

                // Update heading with emoji
                const hour = parseInt(timeString.substring(0, 2));
                const timeOfDay = getTimeOfDay(hour);
                const locationInfo = locationsData.find(loc => loc.id === card.dataset.id);

                if (locationInfo) {
                    card.querySelector('h2').textContent = `${locationInfo.name} ${timeOfDay.emoji}`;
                }
            } catch (error) {
                console.error(`Could not format time for timezone: ${timezone}`, error);
                card.querySelector('.time').textContent = 'Error';
            }
        });
    }

    // Initial setup
    createClockCards();
    updateClocks();

    // Update every second
    setInterval(updateClocks, 1000);
});