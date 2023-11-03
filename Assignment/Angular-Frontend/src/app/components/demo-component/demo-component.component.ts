import { Component, OnInit } from '@angular/core';
import { DataSkeleton } from 'src/app/Entities/data-skeleton';
import { DataPublisherService } from 'src/app/services/data-publisher.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-demo-component',
  templateUrl: './demo-component.component.html',
  styleUrls: ['./demo-component.component.css'],
})
export class DemoComponentComponent implements OnInit {
  constructor(private dataPublishService: DataPublisherService) {}

  data: DataSkeleton[] = []; // Changed the type to DataSkeleton[]

  //use these filters to filter out the data
  //syntax
  //pass the value
  filters: Object = {
    sector: 'Information Technology'
  }

  ngOnInit(): void {
    this.fetchAllData();
    console.log('fetched data successfully');
  }

  fetchAllData() {
    this.dataPublishService.fetchAllData().subscribe((values) => {
      this.data = values.result;
    });
  }

  fetchAllByFilters(filters: any) {
    this.data = [];
    this.dataPublishService
      .fetchAllByFilters(filters)
      .subscribe((values) => {
        this.data = values.result;
      });
  }

  onChanges(){
    this.fetchAllByFilters(this.filters);
    console.log(this.data);
  }
}
