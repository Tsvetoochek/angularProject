import { Component, OnInit } from '@angular/core';
import { ICustomStatisticUser } from 'src/app/models/users';
import { StatisticService } from 'src/app/services/statistic/statistic.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  cols = [
    {field: 'name', header: 'Имя'},
    {field: 'company', header: 'Компания'},
    {field: 'phone', header: 'Телефон'},
    {field: 'city', header: 'Город'},
    {field: 'street', header: 'Улица'}
  ];
  users: ICustomStatisticUser[];

  constructor(private StatisticService: StatisticService) { }

  ngOnInit(): void {
    this.StatisticService.getUserStatistic().subscribe((data) => {
      this.users = data;
    });
  }

}
