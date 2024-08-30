// API Key untuk OpenWeatherMap, pastikan untuk menggantinya dengan API Key milik kamu.
const apiKey = 'YOUR_API_KEY';

// Fungsi utama untuk mengambil data cuaca berdasarkan lokasi yang dimasukkan oleh pengguna
function getWeather() {
    // Mengambil nilai lokasi yang dimasukkan oleh pengguna dari input field
    const location = document.getElementById('location').value;

    // Membuat URL untuk API cuaca dengan lokasi yang dimasukkan dan API Key
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    // Menggunakan fetch untuk mengirim permintaan ke API OpenWeatherMap
    fetch(weatherUrl)
        .then(response => response.json()) // Mengonversi respons menjadi format JSON
        .then(data => {
            // Menampilkan data cuaca di halaman web menggunakan fungsi displayWeather
            displayWeather(data);
            // Mengambil data indeks UV berdasarkan koordinat yang didapatkan dari respons API cuaca
            getUVIndex(data.coord.lat, data.coord.lon);
        })
        .catch(error => console.error('Error fetching weather data:', error)); // Menangani kesalahan jika permintaan gagal
}

// Fungsi untuk menampilkan data cuaca di halaman web
function displayWeather(data) {
    // Menampilkan suhu dengan menambahkannya ke elemen dengan ID 'temperature'
    document.getElementById('temperature').innerHTML = `<strong>Temperature:</strong> ${data.main.temp}°C`;
    // Menampilkan kondisi cuaca (seperti cerah, hujan, dll.) di elemen dengan ID 'condition'
    document.getElementById('condition').innerHTML = `<strong>Condition:</strong> ${data.weather[0].description}`;
    // Menampilkan kelembapan di elemen dengan ID 'humidity'
    document.getElementById('humidity').innerHTML = `<strong>Humidity:</strong> ${data.main.humidity}%`;
    // Menampilkan kecepatan dan arah angin di elemen dengan ID 'wind'
    document.getElementById('wind').innerHTML = `<strong>Wind:</strong> ${data.wind.speed} m/s, ${data.wind.deg}°`;
    // Menampilkan tekanan udara di elemen dengan ID 'pressure'
    document.getElementById('pressure').innerHTML = `<strong>Pressure:</strong> ${data.main.pressure} hPa`;
}

// Fungsi untuk mengambil data Indeks UV berdasarkan koordinat (lintang dan bujur)
function getUVIndex(lat, lon) {
    // Membuat URL untuk API Indeks UV dengan menggunakan lintang, bujur, dan API Key
    const uvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    // Menggunakan fetch untuk mengirim permintaan ke API Indeks UV
    fetch(uvUrl)
        .then(response => response.json()) // Mengonversi respons menjadi format JSON
        .then(data => {
            // Menampilkan nilai Indeks UV di elemen dengan ID 'uv-index'
            document.getElementById('uv-index').innerHTML = `<strong>UV Index:</strong> ${data.value}`;
        })
        .catch(error => console.error('Error fetching UV index data:', error)); // Menangani kesalahan jika permintaan gagal
}
