from django.contrib import admin
from .models import *
# Register your models here.
# register all of the models(classes) here so that we can edit them in the built in admin GUI we can log into
admin.site.register(Week)
admin.site.register(Game)
admin.site.register(Team)
admin.site.register(Player)
admin.site.register(Use)
admin.site.register(UseType)
admin.site.register(YahooAuth)
