import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reading-target',
  templateUrl: './reading-target.component.html',
  styleUrls: ['./reading-target.component.scss']
})
export class ReadingTargetComponent implements OnInit {

  public formReadingTarget: FormGroup;

  constructor(
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.createForm();  
  }


  private createForm(): void {
    this.formReadingTarget = this.fb.group({
        dateTarget: new FormControl(null, Validators.required)
     });
  }

  public calculateDays(): string {
    if(this.formReadingTarget.get('dateTarget').value != null) {
      var date1 = new Date();
      var date2 = this.formReadingTarget.get('dateTarget').value;
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
      return diffDays.toString();
    }
  }
}
