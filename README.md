### News from Keira's authors

- Keira2 is no longer mantained and it has been replaced by [Keira3](https://github.com/azerothcore/Keira3)

------------------

## Keira2 the TrinityCore Database Web-Editor

This software is a Database Editor web application for the [TrinityCore MMORPG framework](https://github.com/TrinityCore/TrinityCore) built with [AngularJS](https://angularjs.org/) and using the [TrinityCore JSON RESTful API](https://github.com/ShinDarth/TC-JSON-API/) to retrieve database data.

Keira2 allows the user to **edit the database via GUI** and **generates automatically the SQL code** for him/her. It is inspired by the old **Quice/Truice** database editor, originally developed by **indomit**, and by the [Discover-'s SAI Editor](https://github.com/Discover-/SAI-Editor).

Using Keira2, you can edit **SmartAI**, **Quests**, **Creatures**, **Spawns**, **Loots**, **GameObjects**, **Items**, **Characters**, etc...

Also you can change the GUI style choosing a different **graphic theme** using the theme-switcher button. There are several themes, light and dark ones.

![Keira2](http://shinworld.altervista.org/images/keira2/Keira2.png "Keira2")

## Live demo

A live demo is available [here](http://shinworld.altervista.org/Keira2/). You can use it for production but be aware that its database may not be updated to the latest version.

Also you can **help us** by testing the development version **without installing it**, simply using our [development live demo](http://keira2.altervista.org/Keira2-dev/). Remember to **clear your browser cache** before testing it and [report any bug or suggestion](https://github.com/Helias/Keira2/issues/new).

## Installation

Keira2 fetches data from an istance of the [TrinityCore JSON API](https://github.com/ShinDarth/TC-JSON-API/), it can be installed either on the same machine or on an external one.

You can install an istance of the TrinityCore JSON API using [this guide](https://github.com/ShinDarth/TC-JSON-API/blob/master/INSTALL.md).

Once you have installed the API, download the [latest release of Keira2](https://github.com/Helias/Keira2/releases) and extract the Keira2 folder and place is inside your web server directory (e.g. /var/www/).

Then open the Keira2 folder and copy the file config.js.dist to config.js, open it and set it properly with the path of the API:

`app.api = "../TC-JSON-API/public/index.php/";`

replace "../TC-JSON-API/public/index.php/" with the path of your API istance.

If you have the TrinityCore JSON API on an external machine, you should set it like:

`app.api = "http://www.your.external.server.org/path/to/TC-JSON-API/public/index.php/";`


### Contribute

- You can help us even without installing your own Keira2 instance by testing our [development live demo](http://keira2.altervista.org/Keira2-dev/).
- Report any bug or suggestion by [opening a new issue](https://github.com/Helias/Keira2/issues/new).
- Check our [documentation](https://github.com/Helias/Keira2/wiki) to understand how the source is structured.

or you can donate to support us

[![Donate](https://www.paypal.com/en_GB/i/btn/btn_donateCC_LG.gif "Donate")](https://www.paypal.me/Stefano303)

### License

Keira2 is open-sourced software licensed under the [GNU AGPL license](https://github.com/Helias/Keira2/blob/master/LICENSE).

### Screenshots

![Keira2](http://shinworld.altervista.org/images/keira2/Keira2-2.png "Keira2")
![Keira2](http://shinworld.altervista.org/images/keira2/Keira2-3.png "Keira2")
![Keira2](http://shinworld.altervista.org/images/keira2/Keira2-4.png "Keira2")
![Keira2](http://shinworld.altervista.org/images/keira2/Keira2-5.png "Keira2")
![Keira2](http://shinworld.altervista.org/images/keira2/Keira2-themes.png "Keira2")
![Keira2](http://shinworld.altervista.org/images/keira2/Keira2-themes2.png "Keira2")
![Keira2](http://shinworld.altervista.org/images/keira2/Keira2-themes3.png "Keira2")
