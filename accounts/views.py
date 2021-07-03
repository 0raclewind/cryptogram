from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse

from django.db import IntegrityError
from django.contrib.auth.decorators import login_required

from django.shortcuts import render

from .models import User
from .forms import UserForm

@login_required
def index(request):
    return render(request, "index.html", {
        'username': request.user
    })

def login_view(request):
    form = UserForm(auto_id=False)
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(username=username, password=password)
        print(username)
        print(password)
        print(user)
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

@login_required
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse('login'))

def register(request):
    username = request.POST["username"]
    password = request.POST["password"]
    confirmation = request.POST["confirmation"]

    # Check if passwords match
    if password != confirmation:
        return HttpResponse("Password don't match")

    try:
        user = User.objects.create_user(username, '', password)
        user.save()
    except IntegrityError:
        return HttpResponse("Username already exists")

    login(request, user)

    return HttpResponseRedirect(reverse('index'))