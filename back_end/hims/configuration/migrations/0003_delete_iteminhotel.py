# Generated by Django 4.1.4 on 2023-01-03 21:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('configuration', '0002_departmentmaster_hoteldepartment_iteminhotel_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='ItemInHotel',
        ),
    ]
