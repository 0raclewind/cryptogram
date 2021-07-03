from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse

from django.shortcuts import render

from .forms import UserForm

def index(request):
    return render(request, "index.html")

def login(request):
    form = UserForm(auto_id=False)
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse('index'))
        else:
            return render(request, 'login.html', {
                'message': 'Invalid username or password.',
                'userForm': form
            })

    return render(request, "login.html", {
        "userForm": form
    })

def register(request):
    username = request.POST["username"]
    password = request.POST["password"]
    confirmation = request.POST["confirmation"]

    # Check if passwords match
    if password != confirmation:
        return HttpResponse("Password don't match")

    return HttpResponseRedirect(reverse('index'))