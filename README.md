# SHAGS - Self-Hosted Awesome Game Server

A free and open source party game server built with customization in mind in order to put you in complete control of the games you play

## Getting Started

These instructions are required to be able to get the server up and running before you start playing.

### Prerequisites

Node

NodeJS is a cross platform JavaScript runtime environment that is currently required to get the server up and running. It can be downloaded from their [download site here](https://nodejs.org/en/download/).

To test Node is installed properly open up a Terminal shell or Command Prompt and run the following command:
```sh
$ node --version
```

After that it should print a version number like
```
v8.5.0
```

If you get something similar to
```
'node' is not recognized as an internal or external command, operable program or batch file.
```

then Node did not install properly and you should try again.

### Running the Server

Run the command in the root of this project
```sh
$ node ./server.js
```

This will start the server that you and your friends can connect to on the port defined in the [`settings.toml`](settings.toml) which defaults to `80`

## Built With
- [corgi-lang](https://github.com/corgi-lang/corgi) - A nice HTML preprocessor built for style and structure
- [WebUtils](https://github.com/Nektro/WebUtils) - Used a custom router part of a hodge podge JS library I make
- [toml-node](https://github.com/BinaryMuse/toml-node) - [TOML](https://github.com/toml-lang/toml) is a new settings format way better than INI
- [express](https://github.com/expressjs/express) - The super easy JS HTTP server
- [socket.io](https://github.com/socketio/socket.io) - For realtime websocket client and server
- [sass](http://sass-lang.com/) - which imo is the best way to write CSS

## License

This project is licensed under the Apache 2 - see the [LICENSE](LICENSE) file for details

## Acknowledgements

- This project was greatly inspired by [The Jackbox Party Pack](https://jackboxgames.com/) series of games. You should definitely go play those, they're super fun and they just came out with [Jackbox 4](https://jackboxgames.com/project/jbpp4/), and it's a fantastic addition to the collection.
- [PurpleBooth](https://github.com/PurpleBooth) for having such a great README guide that I used to help write this wonderful document
- Modern browser devs for always believing in the web
- You for playing this game and bringing back the living room game genre
