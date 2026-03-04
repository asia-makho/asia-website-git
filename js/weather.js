const API_KEY = '3d54d1e61b499314da57152e9bad38ed'; 

function handleEnter(event) {
    if (event.key === "Enter") {
        getWeather();
    }
}

async function getWeather(city = null) {
    // Беремо місто з поля вводу, або те, що передали у функцію
    const searchCity = city || document.getElementById('city').value;
    const errorMessage = document.getElementById('error-message');
    const loading = document.getElementById('loading');

    if (!searchCity) {
        errorMessage.innerText = "Please enter a city name";
        return;
    }

    errorMessage.innerText = "";
    loading.style.display = "block"; // Показуємо напис "Завантаження..."

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        // 💡 СПЕЦІАЛЬНИЙ РЯДОК ДЛЯ ДЕБАГУ: 
        // Виведемо в консоль те, що реально прийшло від сервера
        console.log("Відповідь від сервера:", data);

        // Більш надійна перевірка: якщо сервер повернув статус помилки (не 200)
        if (!response.ok) {
            // Викидаємо повідомлення про помилку, яке надіслав сам сервер
            throw new Error(`Помилка: ${data.message}`);
        }

        // Якщо все добре, оновлюємо HTML
        document.getElementById('cityName').innerText = data.name;
        document.getElementById('temperature').innerText = `${Math.round(data.main.temp)}°C`;
        document.getElementById('description').innerText = `Description: ${data.weather[0].description}`;
        document.getElementById('feels-like').innerText = `Feels like: ${Math.round(data.main.feels_like)}°C`;
        document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
        document.getElementById('wind-speed').innerText = `Wind: ${data.wind.speed} m/s`;

    } catch (error) {
        // Якщо сталася помилка, показуємо її на екрані
        errorMessage.innerText = error.message;
    } finally {
        loading.style.display = "none"; // Ховаємо напис "Завантаження..."
    }
}

// Завантажуємо погоду при відкритті сторінки за замовчуванням
window.onload = () => {
    getWeather('Kyiv');
};