import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassifyData } from 'src/app/models/classify-data';
import { ClassificationService } from 'src/app/services/classification.service';
import { OPTS_Desendencia, OPTS_Educacion, OPTS_FrecuenciaPago, OPTS_SeguroSalud, OPTS_UltimoCargo } from 'src/app/utils/options-utils';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss']
})
export class ClassificationComponent implements OnInit {

  classifyData: ClassifyData;
  predictDataForm: FormGroup;
  optsDesendencia = OPTS_Desendencia;
  optsEducacion = OPTS_Educacion;
  optsUltimoCargo = OPTS_UltimoCargo;
  optsFrecuenciaPago = OPTS_FrecuenciaPago;
  optsSeguroSalud = OPTS_SeguroSalud;
  isClassifying: boolean = false;
  afterClassify: boolean = false;
  imgClass: string = '';


  constructor(private formBuilder: FormBuilder, private classificationService: ClassificationService) { }

  ngOnInit(): void {
    this.classifyData = new ClassifyData();
    this.predictDataForm = this.formBuilder.group({
      sexo: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.max(100), Validators.min(18)]],
      etnia: ['', [Validators.required]],
      nivelEducativo: ['', [Validators.required]],
      ultimoCargo: ['', [Validators.required]],
      frecuenciaPago: ['', [Validators.required]],
      ingresoMonetario: ['', [Validators.required, Validators.max(1000000)]],
      seguroSalud: ['', [Validators.required]]
    });
  }

  predictInformation() {
    this.classifyData.k = Number(sessionStorage.getItem('bestK'));
    this.classifyData.sexo = this.predictDataForm.get('sexo').value;
    this.classifyData.edad = this.predictDataForm.get('edad').value;
    this.classifyData.etnia = this.predictDataForm.get('etnia').value;
    this.classifyData.nivelEducativo = this.predictDataForm.get('nivelEducativo').value;
    this.classifyData.ultimoCargo = this.predictDataForm.get('ultimoCargo').value;
    this.classifyData.frecuenciaPago = this.predictDataForm.get('frecuenciaPago').value;
    this.classifyData.ingresoMonetario = this.predictDataForm.get('ingresoMonetario').value;
    this.classifyData.seguroSalud = this.predictDataForm.get('seguroSalud').value;

    this.isClassifying = true;
    this.classificationService.postClassification(this.classifyData).subscribe(
      (res) => {
        this.classifyData.class = res.class;        
        this.isClassifying = false;        
        if(res.class == 'Empleado') this.imgClass = 'business.png';
        if(res.class == 'Desempleado Abierto') this.imgClass = 'unemployed.png';
        if(res.class == 'Desempleado Oculto') this.imgClass = 'jobless.png';
        console.log(this.classifyData);
        this.afterClassify = true;
      }
    )
    
  }

}
