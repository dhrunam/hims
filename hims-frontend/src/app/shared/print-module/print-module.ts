import { Injectable } from "@angular/core";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Injectable({providedIn: 'root'})
export class PrintModule{
    items: Array<any> = [];
    getRoomDetails(data:any){
      this.items = [['S.No.','Item Name','Opening Bal.','Quantity','Price Per Unit','Remarks']];
      for(var i=0;i<data.length;i++){
        this.items.push([i+1,data[i].item_name,data[i].opening_balance, data[i].quantity_received, data[i].unit_price, data[i].remarks])
      }
      return this.items;
    }
    async printBill(items:any, batch_no: string, hotel_name: string, department_name: string){
        let docDefinition: any = {
          content: [
            // {
            //   image: await this.getBase64ImageFromURL("../../../assets/images/hcs_logo.png" ),
            //   fit: [150,150],
            //   alignment: 'center',
            // },
            {
              text: 'APPLICATION NAME',
              alignment: 'center',
              bold: true,
              margin: [0, 15, 0, 30]
            },
            {
              text: [{text: 'Hotel: ', bold:true}, `${hotel_name}`],
              alignment: 'left',
              margin: [0, 0, 0, 10]
            },
            {
              text: [{text: 'Department: ', bold:true}, `${department_name}`],
              alignment: 'left',
              margin: [0, 0, 0, 30]
            },
            {
              columns: [
                {
                  text: 'Item(s) Received',
                  bold: true,
                  margin: [0, 0, 0, 0],
                  alignment: 'left'
                },
                {
                  text: `Batch No. ${batch_no}`,
                  bold: true,
                  margin: [0, 0, 0, 0],
                  alignment: 'right'
                },
              ]
            },
            {canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595-2*40, y2: 5, lineWidth: 1 }], margin: [0, 0, 0, 10]},
            // {
            //   table: {
            //     headerRows: 1,
            //     widths: [ '*', '*'],
            //     body: [
            //       [ `Bill No: ${data.reservation_no}`, `Date: ${this.datePipe.transform(data.checkout_date, 'dd-MM-YYYY')}`],
            //       [ `Guest Name: ${data.lead_guest_name}`, `Address: ${data.address}`],
            //       [ `Contact: ${data.contact_no}`, `Guest House: ${data.related_property.name}`],
            //       [ `Check-In: ${this.datePipe.transform(data.checkin_date, 'dd-MM-YYYY')}`, `Check-Out : ${this.datePipe.transform(data.checkout_date, 'dd-MM-YYYY')}`],
            //     ]
            //   },
            //   margin: [0, 0, 0, 20]
            // },
            {
              table: {
                headerRows: 1,
                widths: [ 30,'*','*', '*','*','*'],
                body: this.getRoomDetails(items),
              },
              margin: [0, 0, 0, 20],
            },
            {
              text: 'Name & Signature',
              margin: [0, 40, 0, 20],
            },
            {
              text: 'Booking Officer',
              margin: [0, 0, 0, 20],
            },
          ],
          styles: {
            font_size: {
              fontSize: 9,
            }
          }
        }
        pdfMake.createPdf(docDefinition).open();
      }
}