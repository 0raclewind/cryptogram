## Cryptogram

![Responsive](https://cryptogram-static.s3.eu-west-1.amazonaws.com/static/img/all-devices.png)

Cryptogram is a cryptocurrency trading web application where users can sign up, view trending cryptocurrencies with graphs and detailed information. Built with HTML, CSS, Javascript, Django as a backend and PostgreSQL database.

##### Distinctiveness and Complexity
Cryptogram is a unique project built from scratch using knowledge acquired during CS50 Web programming course. Each Django template has it's own CSS and JS files associated with it, for easier development process. Project utilizes ChartJS for chart rendering, Messari's API and are deployed to AWS to be used and tested freely any time. Project uses PostgreSQL database for extra security layer online.

##### Files and directories

- `accounts/` - main application directory
  - `static/` - contains all static files
    - `css/` - contains all CSS files
      - `credits.css` - styling for `/credits` page
      - `index.css` - styling for `/index` page
      - `info.css` - styling for `/info/` page
      - `login.css` - styling for `/login` page
      - `portfolio.css` - styling for `/portfolio` page
      - `profile.css` - styling for `/profile` page
      - `styles.css` - contains common styling for all project, such as navigation, loading animation and main media queries
    - `script/` - contains all Javascript files
      - `index.js` - loads and displays trending cryptocurrencies for `/index` page
      - `info.js` - contains multiple functions for `/info/` page
  	     - metrics, history and profile data loading for chosen asset
  	     - chart display using ChartJS library
  	     - trading window activation when trading buttons are pressed
  	     - instant calculation of total values when entering amounts in trading window
      - `login.js` - contains functions for `/login` page
  	     - swipe sensing on small devices to chose between Login or Sign Up
  	     - error message displaying
      - `portfolio.js` - loads and displays all assets owned by user
      - `profile.js` - displays password change error messages, tops up user account if conditions are met and displays top up message
      - `script.js` - contains common functions used across all application
        - active page highlighting
        - dollar formatting
        - input checking for `/login` and `/profile` pages
  - `templates/` - contains all application templates
    - `credits.html` - `/credits` page template
    - `index.html` - displays trending cryptocurrencies
    - `info.html` - displays info for chosen cryptocurrency
    - `layout.html` - main template file
    - `login.html` - login and sign up template
    - `portfolio.html` - displays assets owned by user
    - `profile.html` - `/profile` page template
  - `forms.py` - contains forms for User model
  - `models.py` - contains `User` and `Portfolio` models
  - `views.py`- contains all views
  - `urls.py` - contains all urls
- `.ebextensions` - Elastic Beanstalk directory
  - `django.config` - Elastic Beanstalk configuration file
- `.ebignore` - Elastic Beanstalk ignore file
- `.gitignore` - Git ignore file

#### Functionality

##### Login / Signup page
To use application signup is required. For signup system I used Django built in model `django.contrib.auth.models.AbstractUser`.

##### Index page
After signup you will be redirected to `index` view, where 20 cryptocurrencies will be loaded from Messari's API using Javascript `fetch` function. More items will be loaded once you will reach bottom of page.

##### Info page
By clicking on crypto `info_view` will be loaded. Here you can find more specific details about selected currency. Which also comes from Messari's API, by sending 3 different requests about crypto. One of requests gets historical crypto data which is then displayed using ChartJS Javascript charting library. Clicking on any of trading buttons will open trade window. By typing amount in crypto or in cash you can instanly see updated information calculated using current crypto price. Arrow in the middle let's you change buy or sell action instantly. By pressing buy button, form is submitted with `POST` method and saved to `Portfolio` table in database for current user.

##### Portoflio page
Portfolio page displays all currencies and their amounts owned by user.

##### Profile page
Profile page allows user to add first name, last name, email address and change password. Topup button allows user to topup account if user has lass than $1,000 in cash.

Live application - http://cryptogram-env.eba-mrii9i8x.eu-west-1.elasticbeanstalk.com/

App video presentation: https://www.youtube.com/watch?v=dsnXZRiojPo