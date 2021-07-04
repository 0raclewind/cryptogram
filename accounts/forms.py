from django import forms

from .models import User

class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = [
            "username",
            "password"
        ]

        help_texts = {
            'username': None,
            'password': None
        }

        widgets = {
            'password': forms.TextInput(attrs={
                'type': 'password'
            })
        }

class ProfileForm(forms.ModelForm):
    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'email'
        ]