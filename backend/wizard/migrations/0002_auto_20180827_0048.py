# Generated by Django 2.1 on 2018-08-27 00:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wizard', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='day',
            name='id',
        ),
        migrations.RemoveField(
            model_name='day',
            name='numberOfGames',
        ),
        migrations.RemoveField(
            model_name='week',
            name='id',
        ),
        migrations.AlterField(
            model_name='day',
            name='date',
            field=models.DateField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='week',
            name='weekNum',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]