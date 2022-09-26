import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataService } from './core/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'afm-frontend';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadConfigurations();
  }

  async loadConfigurations() {
    await this.dataService.loadAssetConfigurations(
      environment.configurationPath
    );
  }
}
