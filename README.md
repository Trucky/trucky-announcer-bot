# Trucky Announcer Bot

A simple bot that automatically announces messages in an announcement channel and maintains a queue if rate limited after 10 messages in an hour.

## Features
- Automatic message announcements
- Rate limiting with queue management
- Easy configuration

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/trucky/trucky-announcer-bot.git
    ```
2. Navigate to the project directory:
    ```sh
    cd trucky-announcer-bot
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage
1. Start the bot:
    ```sh
    npm start
    ```
2. The bot will automatically announce messages in the configured announcement channel.

## Configuration
- Create an .env file to set up your bot token and announcement channel ID.
- Example `.env`:
    ```
    DISCORD_TOKEN=<your token>
    CHANNEL_ID=<announcement channel id>  
    ```

## Docker
1. Build and run the Docker Compose services:
    ```sh
    docker-compose up --build
    ```
2. Build the Docker image:
    ```sh
    docker build -t trucky-announcer-bot .
    ```
3. Run the Docker container:
    ```sh
    docker run --env-file .env trucky-announcer-bot
    ```

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License
This project is licensed under the MIT License.