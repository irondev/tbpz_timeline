# Timeline

## Dev environment

### Install

* Required : Git (`https://git-scm.com`), NodeJS (`https://nodejs.org`), Grunt (`npm install -g grunt-cli`) and Bower (`npm install -g bower`)
* Clone the repository : `git clone git@gitlab.lequipe.fr:rdardeau/timeline.git`
* Go to the project directory `cd timeline`
* Install the NodeJS dependencies `npm install`, then the app packages `bower install`

### Compile

* `grunt`: compile files + watch modified files
* `grunt serve`: compile files + watch modified files + launch the local server (browserSync)
* `grunt publish`: just compile files

### Visualize

* If you run the project from your own machine : BrowserSync will automatically launch the url `http://localhost:3000/` in your browser.
* If you run the project from a local server (eg. 10.173.10.18) : open the url with the server IP on the port 3000 (`http://10.173.10.18:3000/`).
 
All devices connected to the port 3000 will be synchronised, and modified files are automatically reinjected.

## Deployment

* `grunt deploy --env=qualif`: compile files + deploy to qualif in /timeline/
* `grunt deploy --env=prod`: compile files + deploy to prod in /timeline/

## URLS

* Desktop : `http://www.lequipe.fr/Sportname/Timeline/timeline-title/580793`
* Web app : `http://m.lequipe.fr/Sportname/Timeline/timeline-title/580793?mobile` redirected to `http://m.lequipe.fr/iframe.html?src=http://www.lequipe.fr/Sportname/Timeline/timeline-title/580793?mobile`
* Native app : `news://Sportname/2015/580793#PREMIUM` redirected to `http://www.lequipe.fr/Sportname/Timeline/timeline-title/580793?webview`
* Preview : `http://www.lequipe.fr/Sportname/Timeline/timeline-title/580793?preview`
* Preview mobile : `http://www.lequipe.fr/Sportname/Timeline/timeline-title/580793?mobile&preview`

## Source Code

### Librairies

* AngularJS v1.2.x (last version IE8 compliant)
* jQuery v1.11.x

### Architecture

#### Root

* `.ftppass` : FTP configuration for the grunt deploy
* `.htaccess` : not used, just a reminder of the server RewriteRules
* `bower.json` : configuration file for the app packages
* `Gruntfile.js` : configuration file for Grunt
* `package.json` : configuration file for the Node dependencies
* `README.md` : documentation of the project

#### bower_components/

Directory for all packages managed by Bower

#### dist/

Directory for all files compiled by Grunt

#### node_modules/

Directory for all dependencies of NodeJS

#### src/

Directory for all source files

* `src/index.html` : template of the app
* `src/app/` : directory of the Angular app
* `src/app/app.js` : Angular global file
* `src/app/config_*.js` : app configuration files according to the environment
* `src/app/directives.js` : Angular directives
* `src/app/filters.js` : Angular filters
* `src/app/services.js` : Angular services
* `src/app/models/` : JSON models, used as mockups in dev and replaced by `/timeline/datas/` in other environments
* `src/app/views/` : HTML views
* `src/app/controllers/` : Javascript controllers
* `src/css/scss/` : directory for the Sass files
* `src/js/` : directory for the JavaScript files out of Angular

### App config (src/app/config_*.js)

* `freeLimit` : number of paragraphs readable before the paywall (eg. 4)
* `datasPath` : path to the JSON datas directory (eg. "/timeline/datas/")
* `diapoDatasPath` : path to the diaporama JSON datas directory (eg. "/diaporamas/")
* `assetsPath` : path to the CSS/JS/IMG files (eg. "/timeline/")
* `inc` : path to the HTML includes (eg. "/timeline/app/views/partials/")
* `gbService` : URL of the GB service (eg. "/vel/gb.php")
* `gbWebviewService` : URL of the webview GB service (eg. "/vel/checkHash.php")
* `authService` : URL of the authentification service (eg. "/club/connect.php")
* `authCookieName` : name of the authentification cookie (eg. lequipe-connected-infos)
* `authorizedReferers` : MD5 of the referers authorized to visualize the preview (eg. ["24098ed6779ad6d76e232090642ab2d2", "8571fe3d4c599cafc67f21fca14ba397", "0325c34d7a901259a958aa21cf3e3865"] for http://172.22.25.114, http://172.22.25.107, http://private.lequipe.fr)