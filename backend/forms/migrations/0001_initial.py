# Generated by Django 4.0.5 on 2022-06-24 21:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='FormTemplate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='FormWithAnswer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('about_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user')),
                ('form_template', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='forms.formtemplate')),
            ],
        ),
        migrations.AddField(
            model_name='formtemplate',
            name='questions',
            field=models.ManyToManyField(to='forms.question'),
        ),
        migrations.CreateModel(
            name='Answers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=1000)),
                ('form', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='forms.formwithanswer')),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='forms.question')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user')),
            ],
        ),
    ]
