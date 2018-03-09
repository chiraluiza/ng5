import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  
  goals = [];
  doneItems = [];
  itemCount: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private httpClient: HttpClient) {
   }
  getGoals(){
    this.httpClient.get('http://localhost:3000/goals')
    .subscribe(
      (data:any[]) => {
        for(let i=0; i<data.length; i++){
          if(data[i].done === false){
            this.goals.push(data[i]);
          }
          else{
            this.doneItems.push(data[i]);
          }
        }
        this.itemCount.next(this.goals.length);
        console.log(this.itemCount);
      }
    )
  }
}
