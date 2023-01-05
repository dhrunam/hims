# Generated by Django 4.1.4 on 2023-01-05 00:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('configuration', '0003_delete_iteminhotel'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='hoteldepartment',
            name='name',
        ),
        migrations.RemoveField(
            model_name='item',
            name='item_type',
        ),
        migrations.AddField(
            model_name='hoteldepartment',
            name='department',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='configuration.departmentmaster'),
        ),
        migrations.DeleteModel(
            name='ItemType',
        ),
    ]
