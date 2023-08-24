# Backend Architecture for goTan-city

The backend of the `goTan-city` project is structured using the NestJS framework, offering a modular and scalable architecture. This document dives deep into the architectural choices, setup, and dependencies.

## Utils

### Database Utilities

The backend employs native SQL queries instead of an ORM, providing more control over database operations. The `DatabaseService` offers methods to execute these queries and return results in an observable format.

- **Native Query Execution**: The decision to utilize native SQL queries instead of an ORM not only provides enhanced control and the potential for improved performance but also ensures full compatibility with the PostGIS extension, allowing us to leverage all its functionalities to the fullest.

### Exception Handling

The backend boasts a robust exception handling mechanism:

- **Global Exception Filter**: This filter catches exceptions and formats them into a standardized response. It also logs errors, ensuring sensitive information is not exposed.

- **Custom Exceptions**: The backend includes custom exceptions like `TechnicalException` and `FunctionalException` to handle specific error scenarios.

### Logging

A comprehensive logging mechanism is in place:

- **Request Logging**: Every incoming HTTP request is logged, offering insights into the API's usage and potential issues.

- **Error Logging**: Errors and warnings are logged, ensuring that issues can be quickly identified and resolved.

## Layers

The `layers` module is responsible for managing and fetching map layers. It provides an API endpoint to retrieve layers based on different filters.

### Key Files:

- **`layers.controller.ts`**: Defines the API endpoint for fetching layers. It uses the `LayersService` to retrieve the layers based on the provided filters.

- **`layers.dto.ts`**: Contains the data transfer objects (DTOs) for layers. It defines the expected structure of the layers in a GeoJSON format.

- **`layers.module.ts`**: Organizes the module structure for layers. It imports necessary modules and declares the service, repository, and controller for layers.

- **`layers.service.ts`**: Contains the business logic for fetching layers. It communicates with the `LayersRepository` to execute database queries and retrieve the layers.

- **`layers.repositoy.ts`**: Contains the database queries related to layers. It uses native SQL queries to fetch layers based on the provided filters.



## Routes

The `routes` module manages transportation routes and is structured similarly to the `layers` module. It provides an API endpoint to retrieve all available routes.


## Stations

The `stations` module manages transportation stations and follows the same structure as the `layers` module. It provides an API endpoint to retrieve all available stations.



## Setup

1. Ensure you have Node.js and npm (or pnpm) installed on your machine.
2. Navigate to the `backend` directory.
3. Install the dependencies:
   ```bash
   pnpm install
    ```
4. Create a .env file based on .env.example and adjust the values as needed. 
5. Start the backend using:
    ```bash
    pnpm run start:dev
    ```
Once the backend is running, you can access the Swagger documentation at http://localhost:3000/api/doc to explore the available API endpoints.