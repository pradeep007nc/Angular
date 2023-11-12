  import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
  import { DataSkeleton } from 'src/app/Entities/data-skeleton';
  import { DataPublisherService } from 'src/app/services/data-publisher.service';

  @Component({
    selector: 'app-chart-area',
    templateUrl: './chart-area.component.html',
    styleUrls: ['./chart-area.component.css'],
  })
  export class ChartAreaComponent implements OnInit {
    constructor(private dataService: DataPublisherService) {}

    @Input() filters!: any;

    sectorMap!: Map<string, number>;

    filteredData: DataSkeleton[] = [];

    fetchBasedOnSectors() {
      this.dataService.fetchAllByFilters(this.filters).subscribe((data) => {
        this.filteredData = data.result;

        // Clear the sectorMap before populating it
        this.sectorMap = new Map<string, number>();

        this.filteredData.forEach((data) => {
          const sector = data.sector;
          if (this.sectorMap.has(sector)) {
            this.sectorMap.set(
              sector,
              (this.sectorMap.get(sector) as number) + 1
            );
          } else {
            this.sectorMap.set(sector, 1);
          }
        });

      });
    }


    ngOnInit() {
      this.fetchBasedOnSectors();
    }

    ngOnChanges(changes: SimpleChanges) {
      if (changes['filters']) {
        // filters input has changed, so call your function
        this.fetchBasedOnSectors();
      }
    }


  }
