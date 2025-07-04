# Generated by Django 5.0.6 on 2025-07-04 06:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_question', models.TextField()),
                ('subject', models.CharField(max_length=100)),
                ('language', models.CharField(max_length=50)),
                ('answer', models.TextField(blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
