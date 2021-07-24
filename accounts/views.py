from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse

from django.db import IntegrityError
from django.contrib.auth.decorators import login_required

from django.shortcuts import render

from .models import User
from .forms import UserForm, ProfileForm


@login_required
def index(request):
    return render(request, "index.html")

def login_view(request):
    form = UserForm(auto_id=False)
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(username=username, password=password)

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

@login_required
def profile_view(request):
    if request.method == "POST":
        p_form = ProfileForm(request.POST, instance=request.user)

        password = request.POST["password"]
        new_pass = request.POST["new_pass"]
        confirmation = request.POST["confirmation"]
        user = authenticate(username=request.user, password=password)

        if p_form.is_valid():
            p_form.save()
            # Check if password change requested, current password correct and new passwords matching
            if user and new_pass == confirmation:
                u = User.objects.get(username=request.user)
                u.set_password(new_pass)
                u.save()
                new_user = authenticate(username=request.user, password=new_pass)
                login(request, new_user)
            return HttpResponseRedirect(reverse('index'))
    else:
        p_form = ProfileForm(instance=request.user)
        return render(request, "profile.html", {
            "p_form": p_form
        })

def info_view(request, slug):
    return render(request, 'info.html', {
        'slug': slug
    })