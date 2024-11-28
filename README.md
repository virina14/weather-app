# weather-app
# Приложение "WeatherSeek"

Это приложение предназначено для отображения текущей погоды в указанной пользователем локации. Пользователь вводит координаты (широту и долготу), и приложение отображает информацию о погоде в реальном времени с помощью API OpenWeather.

## Основные функции

- **Без использования библиотек и фреймворков**: Приложение разработано без использования внешних библиотек и фреймворков (только чистый HTML, CSS и JavaScript).
  
- **Валидация данных**: Перед отправкой запроса данные, введенные пользователем (широта и долгота), проходят проверку на корректность (непустые, числовые значения в допустимых диапазонах).

- **Асинхронный запрос через Fetch API**: Приложение использует `fetch`, `async/await` для получения данных с API погоды и отображения их пользователю.

- **Понятный и структурированный код**:
  - Переменные и функции имеют осознанные и понятные имена, отражающие их назначение.
  - Все функции не превышают 25 строк кода, что делает их компактными и читаемыми.
  - Код организован таким образом, что исключает линейное исполнение и разбивает его на отдельные логические блоки.

- **Дополнительная информация**:
  - Отображаются дополнительные данные о погоде, такие как: ощущаемая температура, влажность, скорость ветра и погодные условия.
  - В зависимости от погодных условий показываются соответствующие изображения: солнце, дождь, облачность, снег и грозу.
  
- **Интерактивная карта**:
  - Приложение интегрировано с картой, на которой показываются координаты введенной локации.

## Деплой приложения

Приложение развернуто на сервере и доступно для просмотра через браузер. [Ссылка](http://127.0.0.1:5500/index.html)

## Установка

1. Клонируйте репозиторий:

```bash
git clone https://github.com/irina14/weather-app.git
