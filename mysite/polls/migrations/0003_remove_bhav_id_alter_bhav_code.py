# Generated by Django 4.2.4 on 2023-08-28 07:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0002_bhav_delete_choice_delete_question'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bhav',
            name='id',
        ),
        migrations.AlterField(
            model_name='bhav',
            name='code',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
