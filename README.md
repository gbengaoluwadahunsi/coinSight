CoinSight

CoinSight is a dynamic cryptocurrency tracking application that allows users to monitor and analyze real-time crypto market data. Leveraging Polygon.io API and Groq's AI capabilities, CoinSight provides insightful financial reports and recommendations for various cryptocurrencies.

Table of Contents
Features
Installation
Usage
Technologies Used
Project Structure
Contributing
License
Contact
Features
Real-Time Data Fetching: Get the latest cryptocurrency data from Polygon.io.
AI-Powered Reports: Generate financial reports using Groq's AI.
Dynamic Visualization: Display data and reports side by side.
User-Friendly Interface: Easy navigation and interaction for a seamless experience.
Installation
To run CoinSight locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/gbengaoluwadahunsi/coinSight.git
cd coinSight
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root directory and add your API keys:

env
Copy code
VITE_POLYGON_API_KEY=your_polygon_api_key
VITE_GROQ_API_KEY=your_groq_api_key
Run the application:

bash
Copy code
npm run dev
The app will be available at http://localhost:3000.

Usage
Select Cryptocurrency Tickers:

Use the dropdown menu to select one or more cryptocurrency tickers.
Click on "Add Ticker" to add the selected ticker to the list.
Generate Report:

Click on "Generate Report" to fetch the latest data and generate a financial report.
The app will display the data and the AI-generated report side by side.
Technologies Used
Frontend: React, Vite
Styling: Tailwind CSS
API Integration: Polygon.io, Groq AI
Build Tool: Vite
Project Structure
plaintext
Copy code
.
├── public
│   ├── assets
│   │   ├── chevron-down.svg
│   │   ├── logo.png
│   │   ├── ...
│   ├── index.html
├── src
│   ├── components
│   │   ├── ActionPanel.jsx
│   │   ├── CryptoDataPanel.jsx
│   ├── App.jsx
│   ├── main.jsx
├── .env
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
Contributing
We welcome contributions to CoinSight! Please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix:
bash
Copy code
git checkout -b feature-name
Commit your changes:
bash
Copy code
git commit -m 'Add new feature'
Push to the branch:
bash
Copy code
git push origin feature-name
Create a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For any questions or suggestions, feel free to reach out:

Email: gbenga@example.com
GitHub: gbengaoluwadahunsi
Feel free to customize this README as needed to fit your project.
