# Generated by Django 4.1.4 on 2023-01-05 07:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operation', '0005_itemtransferred_acknowledged_by_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='itemreceived',
            name='expiry_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='itemreceived',
            name='unit_price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
