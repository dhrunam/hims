from hims.configuration import models as conf_models
from hims.operation import models as op_models

import datetime

class ValueManager():

    def generate_batch_no(self, data, op_type):
        print(data)
        latest_record=[]
        if (op_type=='REC'):
            latest_record = op_models.ItemReceived.objects.filter(hotel=data[0]['hotel']).last()
        if (op_type=='DAM'):
            latest_record = op_models.ItemDamaged.objects.filter(hotel=data[0]['hotel']).last()
        if (op_type=='RET'):
            latest_record = op_models.ItemReturned.objects.filter(hotel=data[0]['hotel']).last()
        if (op_type=='TRA'):
            latest_record = op_models.ItemTransferred.objects.filter(from_hotel=data[0]['hotel']).last()
        hotel_shot_name = conf_models.Hotel.objects.get(pk=data[0]['hotel']).short_name.upper().strip()
        dept_short_name = conf_models.Item.objects.get(pk=data[0]['item']).department.short_name.upper().strip()
        # date_object = datetime.datetime.strptime(data['checkin_date'], '%Y-%m-%d')
        date_object = datetime.datetime.today()

        batch_year = int(date_object.strftime('%y'))
        batch_month =int(date_object.strftime('%m'))
        financial_year=''

        if(batch_month>3):
            financial_year= str(batch_year) + '-' + str(batch_year + 1)
        else:
            financial_year= str(batch_year - 1) + '-' + str(batch_year)

        sl_no = 1
        if latest_record and hotel_shot_name:

            batch_no = latest_record.batch_no

            if batch_no:
                batch_no_fragments=batch_no.split('/')
                hotel_short_name_part = batch_no_fragments[0].upper().strip()
                year_part = batch_no_fragments[1].strip()
                dept_shorth_name_part = batch_no_fragments[2].upper().strip()
                sl_no_part = int(batch_no_fragments[3].strip())
                sl_no = int(batch_no[-3:])
                dept_short_name_to_compare = batch_no[-3:]
                # print(batch_year,sl_no, year_part)
                if financial_year == year_part and dept_short_name == dept_shorth_name_part :
                    # print('I am in..')
                    sl_no = sl_no+1
                    return   hotel_shot_name + '/' + financial_year + '/' + dept_short_name +'/'+ f"{sl_no:05d}"
                else:
                    sl_no = 1

                    return   hotel_shot_name + '/' + financial_year + '/' + dept_short_name +'/'+ f"{sl_no:05d}"

            return   hotel_shot_name + '/' + financial_year + '/' + dept_short_name +'/'+f"{sl_no:05d}"
        return   hotel_shot_name + '/' + financial_year + '/' + dept_short_name +'/'+ f"{sl_no:05d}"



