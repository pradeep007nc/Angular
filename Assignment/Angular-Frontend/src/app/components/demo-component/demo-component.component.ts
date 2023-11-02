import { Component, OnInit } from '@angular/core';
import { DataSkeleton } from 'src/app/Entities/data-skeleton';
import { DataPublisherService } from 'src/app/services/data-publisher.service';


@Component({
  selector: 'app-demo-component',
  templateUrl: './demo-component.component.html',
  styleUrls: ['./demo-component.component.css']
})
export class DemoComponentComponent implements OnInit{
  constructor(private dataPublishService: DataPublisherService) {}

  ngOnInit(): void {
    this.fetchAllData();
    console.log('fetched data successfully');
  }

  data: DataSkeleton[] = []; // Changed the type to DataSkeleton[]

  fetchAllData() {
    this.dataPublishService.fetchAllData().subscribe(
      (values) => {
        this.data = values.result;
      }
    );
  }
}
