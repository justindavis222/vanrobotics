# Generated by Django 4.2 on 2023-05-29 15:13

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Learner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.TextField(blank=True, max_length=100, null=True)),
                ('last_name', models.TextField(blank=True, max_length=100, null=True)),
                ('grade', models.TextField(blank=True, max_length=2, null=True)),
                ('secret_id', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='ClassBatch',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(blank=True, max_length=100, null=True)),
                ('instructor', models.TextField(blank=True, max_length=100, null=True)),
                ('learners', models.ManyToManyField(related_name='class_batches', to='rosters.learner')),
            ],
        ),
    ]
