# Generated by Django 4.1.4 on 2023-01-10 11:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('configuration', '0005_departmentmaster_short_name_hotel_short_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='department',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='related_department', to='configuration.departmentmaster'),
        ),
    ]