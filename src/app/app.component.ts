import { Component, OnInit } from '@angular/core';
import { ObservableExampleService } from './services/testing/observable-example.service';
import { ConfigServiceService } from './services/config/config-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ticketSales2022';
  prop: string;
  testing: ObservableExampleService;

  constructor(testing: ObservableExampleService,
              private configService: ConfigServiceService
  ) {
    this.testing = testing;
  }

  ngOnInit(): void {
    this.configService.loadPromise();
    const myObservable = this.testing.getObservable();
    myObservable.subscribe((data: string) => {

    });

    myObservable.subscribe((data: string) => {

    });

    const mySubject = this.testing.getSubject();
    mySubject.next('subject value1');

    // mySubject.subscribe((data: string) => {
    // });
    // mySubject.subscribe((data:string) => {
    //  console.log('second data subject', data)
    // });

    
    mySubject.next('subject value2');

    const myBehavior = this.testing.getBehaviorSubject();
    myBehavior.subscribe((data:string) => {

    });
    myBehavior.next("new data from behaviorSubject");
     myBehavior.next("new data from behaviorSubject");

  }
}
