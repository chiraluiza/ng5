import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('goals', [
      transition('* => *', [
        query(':enter', style({ opacity:0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1})
          ]))
        ]), {optional: true}),

        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 0, transform: 'translateY(-75%)', offset: 1})
          ]))
        ]), {optional: true})
      ])
    ]),
    trigger('doneItems', [
      transition('* => *', [
        query(':enter', style({ opacity:0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1})
          ]))
        ]), {optional: true}),

        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 0, transform: 'translateY(-75%)', offset: 1})
          ]))
        ]), {optional: true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  itemCount: any;
  btnText: string ='Add an item';
  goalText: string = 'Another item';
  newGoal
  goals = [];
  doneItems = [];

  constructor(private _data: DataService, private httpClient: HttpClient) { }
  
  ngOnInit() { 
    this._data.getGoals();
    this.goals = this._data.goals;
    this.doneItems = this._data.doneItems;
    this._data.goals.length = 0;   
    this._data.doneItems.length = 0; 
    this._data.itemCount.subscribe((goalsLenght)=> {
      this.itemCount = goalsLenght;
    });
  }

  addItem(){
    if(this.goalText != ''){ 
      this.httpClient.post('http://localhost:3000/goals', {
        text: this.goalText,
        done: false
      })
      .subscribe(
        (data: any) => {
          this.goals.push(data);
          this.goalText = '';
          this.itemCount = this.goals.length;
        }
      )
    }
  }
  removeItem(i) {
    let url = 'http://localhost:3000/goals/' + this.goals[i].id;
    this.httpClient.put(url, {
      text: this.goals[i].text,
      done: true
    }).subscribe(()=> {
      this.doneItems.push(this.goals[i]);
      this.goals.splice(i, 1);
      this.itemCount = this.goals.length;
    });
  }
}
