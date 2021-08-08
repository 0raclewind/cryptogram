from django.contrib import admin

from .models import User, Portfolio

admin.site.register(User)
admin.site.register(Portfolio)