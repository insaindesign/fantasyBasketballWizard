from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.db import models

class RegistrationForm(UserCreationForm):
    
    email = forms.EmailField(max_length=254, help_text='Must be a valid address')
    class Meta:
        model = User
        fields = (
            'username',
            'email',
            'password1',
            'password2',
        )
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def save(self, commit=True):
        user = super(RegistrationForm, self).save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
        return user