# Generated by Django 4.1.4 on 2023-01-10 07:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operation', '0006_itemreceived_expiry_date_itemreceived_unit_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='itemreceived',
            name='batch_no',
            field=models.CharField(default='test', max_length=128),
            preserve_default=False,
        ),
    ]
