# Weather Application

This is a simple weather application that fetches and displays weather information for a given location using the OpenWeather API. The application includes the following features:

- Toggle between the dark mode and light mode
- Input field for search the weather condition by city name or ZIP code
- Display current temperature
- Display date and time of weather information
- Show atmospheric pressure in hPa
- Show visibility in km
- Show humidity percentage
- Display sunrise and sunset times
- A loader will be displayed while it was loading
- Shows an error message in alert for submitting any empty input fields or invalind inputs

## Technologies Used

- React: For building the user interface
- OpenWeather API: For fetching weather data
- CSS: For styling the application

## Dependencies

The project uses the following dependencies:

- **axios**: For making API requests.
- **react-icons**: For importing icons like sunrise sunset etc.
- **react-loader-spinner**: To display the loader spinner while fetching data

### Usage

1. **Search by City Name**:

   - Enter the name of the city in the input field.
   - Click the "Get Weather" button to fetch and display the weather information.

2. **Search by ZIP Code**:
   - Enter the ZIP code and country code (eg: `94040,us`) in the two input fields.
   - Click the "Get Weather" button to fetch and display the weather information.

## Date and Time Formatting

The application uses JavaScript's Date object to format date and time in the following ways:

- **Sunrise and Sunset Times**: Displayed only time using `toLocaleTimeString` method.
- **Date and Time of Weather**: Displayed the full date and time using `toLocaleString` method.

## Project Structure

The main file for the application is located in the `src` directory:

- **src/Home**: Contains the main React component for the weather application.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
