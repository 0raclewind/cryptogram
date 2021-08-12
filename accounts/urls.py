from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login_view, name='login'),
    path('logout', views.logout_view, name='logout'),
    path('register', views.register, name='register'),
    path('profile', views.profile_view, name='profile'),
    path('info/<str:slug>', views.info_view, name='info'),
    path('buy/<str:slug>', views.buy_view, name='buy'),
    path('sell/<str:slug>', views.sell_view, name='sell'),
    path('portfolio', views.portfolio, name="portfolio"),
    path('topup', views.topup, name="topup")
]
