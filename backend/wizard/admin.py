from django.contrib import admin
from .models import YahooUse
# Register your models here.
# register all of the models(classes) here so that we can edit them in the built in admin GUI we can log into
admin.site.register(YahooUse)