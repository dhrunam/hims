import { Injectable } from "@angular/core";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Injectable({providedIn: 'root'})
export class PrintModule{
    items: Array<any> = [];
    getReceiveItemDetails(data:any){
      this.items = [['S.No.','Item Name','Vendor','Opening Bal.','Qty.', 'Expiry','Price','Remarks']];
      for(var i=0;i<data.length;i++){
        this.items.push([i+1,data[i].item_name, data[i].vendor_name, data[i].opening_balance, data[i].quantity_received, `${new Date(data[i].expiry_date).getDate() < 10 ? '0':''}${new Date(data[i].expiry_date).getDate()}/${new Date(data[i].expiry_date).getMonth()+1 < 10 ? '0':''}${new Date(data[i].expiry_date).getMonth()+1}/${new Date(data[i].expiry_date).getFullYear()}`, data[i].unit_price, data[i].remarks])
      }
      return this.items;
    }
    getDiscardedItemDetails(data:any){
      this.items = [['S.No.','Item Name','Opening Bal.','Qty.', 'Expiry','Price','Remarks']];
      for(var i=0;i<data.length;i++){
        this.items.push([i+1,data[i].item_name,data[i].opening_balance, data[i].quantity_damaged, `${new Date(data[i].expiry_date).getDate() < 10 ? '0':''}${new Date(data[i].expiry_date).getDate()}-${new Date(data[i].expiry_date).getMonth()+1 < 10 ? '0':''}${new Date(data[i].expiry_date).getMonth()+1}-${new Date(data[i].expiry_date).getFullYear()}`, data[i].unit_price, data[i].remarks])
      }
      return this.items;
    }
    getReturnedItemDetails(data:any){
      this.items = [['S.No.','Item Name','Opening Bal.','Qty.', 'Expiry','Price','Remarks']];
      for(var i=0;i<data.length;i++){
        this.items.push([i+1,data[i].item_name,data[i].opening_balance, data[i].quantity_returned, `${new Date(data[i].expiry_date).getDate() < 10 ? '0':''}${new Date(data[i].expiry_date).getDate()}-${new Date(data[i].expiry_date).getMonth()+1 < 10 ? '0':''}${new Date(data[i].expiry_date).getMonth()+1}-${new Date(data[i].expiry_date).getFullYear()}`, data[i].unit_price, data[i].remarks])
      }
      return this.items;
    }
    getTransferredItemDetails(data:any){
      this.items = [['S.No.','Item Name','Opening Bal.','Qty.', 'Expiry','Price','Remarks']];
      for(var i=0;i<data.length;i++){
        this.items.push([i+1,data[i].item_name,data[i].opening_balance, data[i].quantity_transferred, `${new Date(data[i].expiry_date).getDate() < 10 ? '0':''}${new Date(data[i].expiry_date).getDate()}-${new Date(data[i].expiry_date).getMonth()+1 < 10 ? '0':''}${new Date(data[i].expiry_date).getMonth()+1}-${new Date(data[i].expiry_date).getFullYear()}`, data[i].unit_price, data[i].remarks])
      }
      return this.items
    }
    getDetails(data: any, header: string){
      let buffer: any;
      switch(header){
        case 'Receive':
          buffer = this.getReceiveItemDetails(data);
          break;
        case 'Return':
          buffer = this.getReturnedItemDetails(data);
          break;
        case 'Discard':
          buffer = this.getDiscardedItemDetails(data);
          break;
        case 'Transfer':
          buffer = this.getTransferredItemDetails(data);
          break;
        default:
          break;
      }
      return buffer;
    }
    async printBill(header_name: string,items:any, batch_no: string, hotel_name: string, department_name: string){
        let date: any;
        if(header_name === 'Receive'){
          date = new Date(items[0].received_on)
        }
        if(header_name === 'Discard'){
          date = new Date(items[0].damaged_on)
        }
        if(header_name === 'Return'){
          console.log(items[0])
          date = new Date(items[0].returned_on)
        }
        if(header_name === 'Transfer'){
          date = new Date(items[0].transferred_on)
        }
        let docDefinition: any = {
          content: [
            {
              text: `Item ${header_name}`,
              alignment: 'center',
              bold: true,
              margin: [0, 15, 0, 30]
            },
            {
              text: items[0].to_hotel_name ? [{text: 'From Hotel: ', bold:true}, `${hotel_name}`] : [{text: 'Hotel: ', bold:true}, `${hotel_name}`],
              alignment: 'left',
              margin: [0, 0, 0, 10]
            },
            {
              text: items[0].to_hotel_name ? [{text: 'To Department: ', bold:true}, `${department_name}`] : [{text: 'Department: ', bold:true}, `${department_name}`],
              alignment: 'left',
              margin: [0, 0, 0, 10]
            },
            {
              text: items[0].to_hotel_name ? [{text: 'To Hotel: ', bold:true}, `${items[0].to_hotel_name}`] : '',
              alignment: 'left',
              margin: [0, 0, 0, 10]
            },
            {
              text: items[0].to_department_name ? [{text: 'To Department: ', bold:true}, `${items[0].to_department_name}`] : '',
              alignment: 'left',
              margin: [0, 0, 0, 10]
            },
            {
              text: [{text: `Date of ${header_name}: `, bold:true}, `${date.getDate() < 10 ? '0':''}${date.getDate()}/${date.getMonth()+1 < 10 ? '0':''}${date.getMonth()+1}/${date.getFullYear()}`],
              alignment: 'left',
              margin: [0, 0, 0, 30]
            },
            {
              columns: [
                {
                  text: `Item(s) ${header_name}`,
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
            {
              table: {
                headerRows: 1,
                widths: header_name === 'Receive' ? [30,'*','*','*', '*','*','*','*'] : [30,'*','*','*', '*','*','*'],
                body: this.getDetails(items, header_name),
              },
              margin: [0, 0, 0, 20],
            },
            {
              columns: [
                {
                  text: `Received By`,
                  bold: true,
                  margin: [0, 60, 0, 0],
                  alignment: 'left'
                },
                {
                  text: `Given By`,
                  bold: true,
                  margin: [0, 60, 0, 0],
                  alignment: 'right'
                },
              ]
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