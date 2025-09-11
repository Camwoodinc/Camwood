# Chatbot Application

This is a chatbot application built with TypeScript. The application serves as a demonstration of a simple chatbot interface.

## Project Structure

```
camwood-chatbot
├── src
│   └── index.ts        # Entry point of the application
├── Dockerfile           # Dockerfile for building the application image
├── docker-compose.yml   # Docker Compose configuration for running the application
├── .dockerignore        # Files and directories to ignore when building the Docker image
├── package.json         # npm configuration file
├── tsconfig.json        # TypeScript configuration file
└── README.md            # Documentation for the project
```

## Getting Started

To get started with the chatbot application, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd camwood-chatbot
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   npm start
   ```

## Docker Setup

To run the application using Docker, you can use the provided Docker setup.

1. **Build the Docker image**:
   ```bash
   docker build -t camwood-chatbot .
   ```

2. **Run the Docker container**:
   ```bash
   docker run -p 3000:3000 camwood-chatbot
   ```

Alternatively, you can use Docker Compose:

1. **Start the application with Docker Compose**:
   ```bash
   docker-compose up
   ```

## Usage

Once the application is running, you can interact with the chatbot through the designated interface.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for details.