import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  constructor(private router: Router, private route: ActivatedRoute){}
  editMode: boolean = false;
  ngOnInit(): void{
    this.route.params.subscribe({
      next: (param: Params) => {
        this.editMode !== param['id']
      }
    })
  }
  onSubmit(data: NgForm){
    
  }
}
