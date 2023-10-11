import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-forms',
  templateUrl: './template-forms.component.html',
  styleUrls: ['./template-forms.component.css']
})
export class TemplateFormsComponent {
  categories = [
    {id: 1, name: 'dev'},
    {id: 2, name: 'mia'},
    {id: 3, name: 'acc'}
  ];
}
