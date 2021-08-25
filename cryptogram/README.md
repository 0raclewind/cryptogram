## Cryptogram

![Responsive](https://cryptogram-static.s3.eu-west-1.amazonaws.com/static/img/all-devices.png)

Cryptogram is a cryptocurrency trading web application built with HTML, CSS, Javascript and Django as a backend.

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