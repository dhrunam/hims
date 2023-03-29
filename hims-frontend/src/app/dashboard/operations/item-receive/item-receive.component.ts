import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-item-receive',
    template: `
                <div class="px-5">
                    <button class="btn btn-light" (click)="onGoBack()"><i class="bi bi-arrow-left-circle"></i>&nbsp;&nbsp;Go Back</button>
                </div>
                <div class="text-center">
                  <h2>Item Receive</h2>  
                </div>
                <router-outlet></router-outlet>`
})
export class ItemReceiveComponent{
    constructor(private router: Router, private route: ActivatedRoute){}

    onGoBack(){
        this.router.navigate(['../../home'], { relativeTo: this.route })
    }
}