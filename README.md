## Keira2 the TrinityCore Database Web-Editor

This software is a Database Editor web application for the [TrinityCore MMORPG framework](https://github.com/TrinityCore/TrinityCore) built with [AngularJS](https://angularjs.org/) and using the [TrinityCore JSON RESTful API](https://github.com/ShinDarth/TC-JSON-API/) to retrieve database datas.

Keira2 allows the user to **edit the database via GUI** and **generates automatically the SQL code** for him/her. It is inspired by the old **Quice/Truice** database editor, originally developed by **indomit**.

Using Keira2, you can edit **Quests**, **Creatures**, **Spawns**, **Loots**, **GameObjects**, **Items**, **Characters**, etc...

Also you can change the GUI style choosing a different **graphic theme** using the theme-switcher button. There are several themes, light and dark ones.

## Live demo

A live demo is available [here](http://shinworld.altervista.org/Keira2/). You can use it for production but be aware that its database may not be updated to the latest version.

## Installation

Keira2 fetches datas from an istance of the [TrinityCore JSON API](https://github.com/ShinDarth/TC-JSON-API/), it can be installed either on the same machine or on an external one.

You can install an istance of the TrinityCore JSON API using [this guide](https://github.com/ShinDarth/TC-JSON-API/blob/3.3.5/INSTALL.md).

Once you have installed the API, simply clone the Keira2 repository inside your web server directory:

`git clone https://github.com/Helias/Keira2.git`

Then copy the file config.js.dist to config.js, open it and set it properly with the path of the API:

`app.api = "../TC-JSON-API/public/index.php/";`

which is the address of the API.

If you have the TrinityCore JSON API on an external machine, you should set it like:

`app.api = "http://www.your.external.server.org/path/to/TC-JSON-API/public/index.php/";`


### Contribute

- Report any bug or suggestions by [opening a new issue](https://github.com/Helias/Keira2/issues/new).
- Check our [documentation](https://github.com/Helias/Keira2/wiki) to understand how the source is structured.

### License

Keira2 is open-sourced software licensed under the [GNU GPL license](https://github.com/Helias/Keira2/blob/master/LICENSE).

### Screenshots

![Keira2](http://shinworld.altervista.org/images/keira2/Keira2.png "Keira2")
![Keira2](http://shinworld.altervista.org/images/keira2/Keira2-themes.png "Keira2")
![Keira2](http://shinworld.altervista.org/images/keira2/Keira2-themes2.png "Keira2")
![Keira2](http://shinworld.altervista.org/images/keira2/Keira2-themes3.png "Keira2")
