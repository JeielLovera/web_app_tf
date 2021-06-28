import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Fitknn } from 'src/app/models/fitknn';
import { Parameters } from 'src/app/models/parameters';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  parameters: Parameters;
  parametersForm: FormGroup;
  bestK: Fitknn;
  isTraining: boolean = false;
  afterTraining: boolean = false;
  
  constructor(private formBuilder: FormBuilder, private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.parameters = new Parameters();
    this.parametersForm = this.formBuilder.group(
      {
        epochs: ['', [Validators.required, Validators.max(100), Validators.min(1)]],
        parallelProcs: ['', [Validators.required, Validators.max(10), Validators.min(2)]],
      }
    );    
  }

  trainingKnn() {
    this.parameters.epochs = this.parametersForm.get('epochs').value;
    this.parameters.parallelProcs = this.parametersForm.get('parallelProcs').value;
    this.isTraining = true;
    this.trainingService.postTraining(this.parameters).subscribe(
      (res: Fitknn) => {
        this.bestK = res;
        console.log(this.bestK);
        this.isTraining = false;
        this.afterTraining = true;
        sessionStorage.setItem('bestK', this.bestK.k.toString());
      }
    );
  }

}
