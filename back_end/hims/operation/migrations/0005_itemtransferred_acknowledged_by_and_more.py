# Generated by Django 4.1.4 on 2023-01-05 03:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('operation', '0004_itemdamaged_opening_balance_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='itemtransferred',
            name='acknowledged_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='item_transferred_acknowledged_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='itemtransferred',
            name='is_acknowledged',
            field=models.BooleanField(default=False),
        ),
    ]
