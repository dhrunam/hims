# Generated by Django 4.1.4 on 2023-05-07 10:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operation', '0011_itemdamaged_expiry_date_itemdamaged_unit_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='itemtransferred',
            name='expiry_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='itemtransferred',
            name='unit_price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
