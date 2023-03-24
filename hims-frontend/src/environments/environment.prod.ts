export const environment = {
    production: true
};
export const URL = 'http://localhost:8000';
export const KEY = 'U2FsdGVkX194Y7uE3oWaKaaOVWKXp50Km/Aa1dLr4lk=';

export const URLs={
    'login':'/api/auth/login',
    'logout':'/api/auth/logout',
    'hotel':'/api/hotel',
    'department':'/api/department',
    'hotel_dept':'/api/hotel_department',
    'item':'/api/item',
    'registration':'/api/user/reg',
    'items_by_dept':'/api/item',
    // '':'',
    // '':'',
    // '':'',
    // '':'',
    // '':'',
    // '':'',
    // '':'',
    // '':'',
    // '':'',
    // '':'',




}


 
//   get_items_dept(id:string){
//     return this.http.get<any>(`${URL}/api/item?dept_id=${id}`);
//   }
//   add_item_received(data: any){
//     const d = {
//       data: data,
//     }
//     return this.http.post(`${URL}/api/op/item/received`, d);
//   }
//   add_item_damaged(data: any){
//     const d = {
//       data: data,
//     }
//     return this.http.post(`${URL}/api/op/item/damage`, d);
//   }
//   add_item_transferred(data: any){
//     const d = {
//       data: data,
//     }
//     return this.http.post(`${URL}/api/op/item/transfer`, d);
//   }
//   add_item_returned(data: any){
//     const d = {
//       data: data,
//     }
//     return this.http.post(`${URL}/api/op/item/return`, d);
//   }
//   get_item_received(id: string){
//     return this.http.get<any>(`${URL}/api/op/item/received/batch?hotel_id=${id}`);
//   }
//   get_item_returned(id: string){
//     return this.http.get<any>(`${URL}/api/op/item/received/batch?hotel_id=${id}`);
//   }
//   get_item_damaged(id: string){
//     return this.http.get<any>(`${URL}/api/op/item/received/batch?hotel_id=${id}`);
//   }
//   get_item_transferred(id: string){
//     return this.http.get<any>(`${URL}/api/op/item/received/batch?hotel_id=${id}`);
//   }