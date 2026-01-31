#  SkyCast — Weather Analytics Dashboard

SkyCast is a modern weather analytics dashboard built to help users understand both current weather conditions and short-term forecasts through clean visuals and interactive charts.  
The goal of this project was to go beyond a basic weather app and build something closer to a real-world dashboard experience.

---

##  Live Demo

🌍 **Live Site:**[(https://sky-cast-weather-dashboard-ri4u.vercel.app/)]

---

##  Features

###  Dashboard Overview
- Displays multiple cities at once  
- Each city card shows:
  - Current temperature  
  - Weather condition  
  - Humidity  
  - Wind speed  
- Favorite cities are pinned at the top  
- Data auto-refreshes every 60 seconds  

---

###  Search & Favorites
- City search with API-based autocomplete  
- Add any city to your dashboard  
- Mark cities as favorites  
- Favorites persist between sessions using local storage  

---

###  Detailed Weather Modal
Clicking on any city opens a detailed analytics view including:

- Hour-by-hour temperature trend  
- Precipitation probability chart  
- Wind speed trend chart  
- 5–7 day forecast summary  
- Extra stats like:
  - Pressure  
  - Feels like temperature  
  - Humidity  

All charts are interactive and responsive.

---

###  Settings
- Toggle between **Celsius (°C)** and **Fahrenheit (°F)**  
- Unit change updates all cards and charts instantly  

---

###  Performance & Optimization
- Weather data is cached for 60 seconds to reduce API calls  
- Auto-refresh keeps information up to date  
- Charts are optimized for smooth performance on both desktop and mobile  

---

###  Authentication (Bonus Feature)
- Google Sign-In using Firebase Authentication  
- Logged-in users can see their profile in the navbar  

---

##  Tech Stack

| Technology | Purpose |
|-----------|---------|
| React + TypeScript | Frontend UI |
| Redux Toolkit | State management |
| Recharts | Data visualization |
| Tailwind CSS | Styling |
| Firebase | Hosting & Authentication |
| OpenWeatherMap API | Weather data |

---

##  Installation & Setup

Clone the repository:

```bash
git clone https://github.com/kamalkhandal23/SkyCast-Weather-Dashboard
cd SkyCast-Weather-Dashboard
