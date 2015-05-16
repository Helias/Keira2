## Keira2 the TrinityCore Database Web-Editor

Keira2 is a Database Editor web application for the [TrinityCore MMORPG framework](https://github.com/TrinityCore/TrinityCore) built with [AngularJS](https://angularjs.org/) and using the [TrinityCore JSON RESTful API](https://github.com/ShinDarth/TC-JSON-API/) to retrieve database datas.

The application is still **under development**, this means you can't use it yet for production. But you are free to try it and help us with development.

Check our [documentation](https://github.com/Helias/Keira2/wiki) to check project status and understand how it is structured.

## Live demo

A live demo is available [here](http://keira2.altervista.org/Keira2/).

## Installation

In order to install Keira2, you must have the [TrinityCore JSON API](https://github.com/ShinDarth/TC-JSON-API/) installed in your system.

Once you have installed it, simply clone the Keira2 repository inside your web server directory:

`git clone https://github.com/Helias/Keira2.git`

Then copy the file config.js.dist to config.js, open it and set properly with the path of the API:

`app.api = "../TC-JSON-API/public/index.php/";`

which is the address of the API.

### License

Keira2 is open-sourced software licensed under the [GNU GPL license](https://github.com/Helias/Keira2/blob/master/LICENSE).
