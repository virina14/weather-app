document.addEventListener('DOMContentLoaded', function () {
    const latitude = document.getElementById('latitude');
    const longitude = document.getElementById('longitude');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const weatherInfo = document.getElementById('weatherInfo');
    const weatherDetails = document.getElementById('weatherDetails');
    const mapContainer = document.getElementById('map'); // Контейнер карты
    const weatherIcon = document.getElementById('weatherIcon'); // Контейнер для иконки погоды

    let map;

    // Функция для отображения карты
    function showMap(lat, lon) {
        mapContainer.style.display = 'block'; // Показываем карту
        if (map) {
            map.setView([lat, lon], 13);
        } else {
            map = L.map('map').setView([lat, lon], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            }).addTo(map);
        }
        L.marker([lat, lon]).addTo(map)
            .bindPopup(`Координаты: ${lat}, ${lon}`)
            .openPopup();
    }

    // Функция для отображения иконки погоды в зависимости от погодных условий
    function getWeatherIcon(weatherCondition) {
        if (weatherCondition.includes('солнце')) {
            return 'sun.png';
        } else if (weatherCondition.includes('дождь')) {
            return 'rain.png';
        } else if (weatherCondition.includes('облачно')) {
            return 'cloud.png';
        } else if (weatherCondition.includes('снег')) {
            return 'snow.png';
        } else {
            return 'cloud.png'; // Изображение по умолчанию
        }
    }

    //Кнопка для получения погоды
    getWeatherBtn.addEventListener('click', async () => {
        const latValue = parseFloat(latitude.value.trim());
        const lonValue = parseFloat(longitude.value.trim());

        if (!latitude.value.trim() || !longitude.value.trim()) {
            alert('Пожалуйста, введите значения для широты и долготы!');
            return;
        }

        if (isNaN(latValue) || isNaN(lonValue)) {
            alert('Широта и долгота должны быть числами!');
            return;
        }

        if (latValue < -90 || latValue > 90) {
            alert('Широта должна быть в пределах от -90 до 90!');
            return;
        }

        if (lonValue < -180 || lonValue > 180) {
            alert('Долгота должна быть в пределах от -180 до 180!');
            return;
        }

        weatherInfo.style.display = 'none'; // Скрываем информацию о погоде

        const apiKey = '7b85031e5a4ce658b9854647cb1f5805';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latValue}&lon=${lonValue}&appid=${apiKey}&units=metric&lang=ru`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.cod === 200) {
                const weatherCondition = data.weather[0].description.toLowerCase();
                const weatherIconUrl = `images/${getWeatherIcon(weatherCondition)}`; // Определяем изображение

                // Отображаем информацию о погоде
                const weatherDetailsText = `
                    <p><strong>Город:</strong> ${data.name}</p>
                    <p><strong>Температура:</strong> ${data.main.temp}°C</p>
                    <p><strong>Ощущается как:</strong> ${data.main.feels_like}°C</p>
                    <p><strong>Влажность:</strong> ${data.main.humidity}%</p>
                    <p><strong>Скорость ветра:</strong> ${data.wind.speed} м/с</p>
                    <p><strong>Погодные условия:</strong> ${data.weather[0].description}</p>
                    <img src="${weatherIconUrl}" alt="Погода" style="width: 50px; height: 50px;"> <!-- Иконка погоды -->
                `;
                weatherDetails.innerHTML = weatherDetailsText;

                weatherInfo.style.display = 'block'; // Показываем блок с информацией о погоде

                showMap(latValue, lonValue); // Показываем карту
            } else {
                alert('Не удалось получить данные о погоде. Проверьте правильность введенных координат.');
            }
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            alert('Произошла ошибка при запросе данных о погоде.');
        }
    });
});
