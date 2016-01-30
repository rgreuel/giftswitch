# giftswitch
A simple gift exchange web app built on the M*EAN stack (~~MongoDB~~ MariaDB, Express, Angular, and Node).

This is a work in progress and its purpose is to become more familiar with the technologies used.

## installation
dependencies:

* [Node.js](http://www.nodejs.org)
* [Bower](http://www.bower.io) - a package manager for the web
* [A MySQL database](https://downloads.mariadb.org/). 
  * **Note:** giftswitch comes preconfigured to connect to `giftswitch@localhost` with username and password `giftswitch` and use a MariaDB SQL dialect. This is set in `/config/config.js`

1. Once Node is installed, run `npm install` from the root of this repository to pull in all of the required node modules.
2. Install Bower globally by running `npm install -g bower`
3. Run `bower install` from the root of this repository to pull in the required packages.
4. Run `node server` to start up the server
5. Access giftswitch at [localhost:8080](http://localhost:8080)


## license
giftswitch is distributed under the MIT license.

## attribution
giftswitch was built with:

* [Node.js](http://www.nodejs.org)
* [Express](http://www.expressjs.com)
* [Angular](http://www.angularjs.org)
* [MariaDB](http://mariadb.org/)
* [node-mysql](https://github.com/felixge/node-mysql)
* [Sequelize](https://github.com/sequelize/sequelize)
* [Passport](http://www.passportjs.org)
* [Bootstrap](http://www.getbootstrap.com)
* [Font Awesome] (https://fortawesome.github.io/Font-Awesome/)
* [Stylus](http://www.stylus-lang.com)
* [Sortable](https://github.com/RubaXa/Sortable)
* [angular-moment-picker](https://github.com/indrimuska/angular-moment-picker)
* [angular-modal-service](https://github.com/dwmkerr/angular-modal-service)
