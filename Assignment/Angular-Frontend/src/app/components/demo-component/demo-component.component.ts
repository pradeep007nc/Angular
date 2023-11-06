import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { DataSkeleton } from 'src/app/Entities/data-skeleton';
import { DataPublisherService } from 'src/app/services/data-publisher.service';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-demo-component',
  templateUrl: './demo-component.component.html',
  styleUrls: ['./demo-component.component.css'],
})
export class DemoComponentComponent implements OnInit {
  constructor(
    private dataPublishService: DataPublisherService,
    private fb: FormBuilder
  ) {}

  form!: FormGroup;
  allData: DataSkeleton[] = []; // Changed the type to DataSkeleton[]

  //use these filters to filter out the data
  //syntax
  //pass the value
  filters: Object = {

  };

  //datastructure to fetch all filters unique items
  //maybe use set for eg. sector: set of unique sectors

  uniqueFilterMap!: Map<string, Set<string>>;

  ngOnInit() {
    this.fetchAllData();
    this.fetchAllUniqueFilters();
    console.log('fetched data successfully');

    this.form = this.fb.group({
      endYear: [''], // You can set initial values here
      topic: [''],
      sector: [''],
      region: [''],
      pestle: [''],
      source: [''],
    });
  }

  fetchAllUniqueFilters() {
    this.uniqueFilterMap = new Map<string, Set<string>>();

    setTimeout(() => {
      //setup all set objects
    const tempData = ['topic', 'sector', 'region', 'pestle', 'source'];

    tempData.forEach((data) => {
      this.uniqueFilterMap.set(data, new Set<string>());
    });

    //now add unique elements taken care by set
    //data fetch from allData
    this.allData.forEach((data) => {
      tempData.forEach((field) => {
        this.uniqueFilterMap
          .get(field as keyof DataSkeleton)
          ?.add(data[field as keyof DataSkeleton] as string);
      });
    });
    }, 200)

  }

  fetchAllData() {
    this.dataPublishService.fetchAllData().subscribe((values) => {
      this.allData = values.result;
    });
  }

  applyFilters() {
    const endYearValue = this.form.value.endYear.split('-')[0];
    this.filters = {
      endYear: endYearValue,
      topic: this.form.value.topic,
      sector: this.form.value.sector,
      region: this.form.value.region,
      pestle: this.form.value.pestle,
      source: this.form.value.source,
    };
    // Now you can use this.filters to apply your filters to your data.
    console.log(this.filters);
  }
}
