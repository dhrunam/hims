import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-item-operations',
  templateUrl: './item-operations.component.html',
  styleUrls: ['./item-operations.component.css']
})
export class ItemOperationsComponent {
  key:string = '';
  is_receive: boolean = false;
  is_return: boolean = false;
  is_damage: boolean = false;
  is_transfer: boolean = false;
  items: Array<any> = [];
  constructor(private route: ActivatedRoute, private router: Router){
    this.route.params.subscribe({
      next: (param: Params) => {
        this.key = param['key'];
      }
    })
  }
  ngOnInit(): void{
    this.displayKey(this.key);
  }
  onGoBack(){
    this.router.navigate(['../../home'], { relativeTo: this.route } );
  }
  private displayKey(key:string){
    switch(key){
      case 'item-receive':
        this.is_receive = true;
        this.is_damage = false;
        this.is_return = false;
        this.is_transfer = false;
        break;
      case 'item-return':
        this.is_receive = false;
        this.is_damage = false;
        this.is_return = true;
        this.is_transfer = false;
        break;
      case 'item-damage':
        this.is_receive = false;
        this.is_damage = true;
        this.is_return = false;
        this.is_transfer = false;
        break;
      case 'item-transfer':
        this.is_receive = false;
        this.is_damage = false;
        this.is_return = false;
        this.is_transfer = true;
        break;
      default:
        this.is_receive = false;
        this.is_damage = false;
        this.is_return = false;
        this.is_transfer = false;
        break;
    }
  }
  onDisplayTitle(position: string){
    let keyPageTitle: string,
        keyModalTitle: string;
    if(this.is_receive){
      position === 'page' ? keyPageTitle = 'Item Received' : keyModalTitle = 'Receive Item';
    }
    if(this.is_return){
      position === 'page' ? keyPageTitle = 'Item Returned' : keyModalTitle = 'Return Item';
    }
    if(this.is_damage){
      position === 'page' ? keyPageTitle = 'Item Damaged' : keyModalTitle = 'Discard Item';
    }
    if(this.is_transfer){
      position === 'page' ? keyPageTitle = 'Item Transferred' : keyModalTitle = 'Transfer Item';
    }
    return position === 'page' ? keyPageTitle : keyModalTitle;
  }
}
