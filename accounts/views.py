from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse

from django.shortcuts import render

from .forms import UserForm

def index(request):
    return render(request, "index.html")

def login(request):
    if request.method == "POST":
        username = request.POST("username")
        password = request.POST("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse('index'))
    return render(request, "login.html", {
        "userForm": UserForm()
    })

def register(request):
    pass