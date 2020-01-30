
import { Component, OnInit } from '@angular/core';
import { ConsumofirebaseService } from 'src/app/service/consumofirebase.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { error } from 'protractor';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css']
})
export class AutoComponent implements OnInit {

  public autos: any = [];
  public documentId = null;
  public currentStatus = 1;

  constructor(private fs: ConsumofirebaseService) {

    this.newAutoForm.setValue({
      idF: '',
      marcaF: '',
      modeloF: '',
      anioF: '',
      urlF: ''
    });
  }

  ngOnInit() {
    this.obtenerAutos();
  }

  public actualizarAuto(documentId) {
    let editSubscribe = this.fs.obtenerAutoId(documentId).subscribe(
      (data) => {
        this.currentStatus = 2;
        this.documentId = documentId;
        this.newAutoForm.setValue({
          idF: documentId,
          marcaF: data.payload.data()['marca'],
          modeloF: data.payload.data()['modelo'],
          anioF: data.payload.data()['anio'],
          urlF: data.payload.data()['url'],
        })
        editSubscribe.unsubscribe();
      }
    );
  }

  public nuevoAuto(form, documentId = this.documentId) {
    if (this.currentStatus == 1) {
      let data = {
        marca: form.marcaF,
        modelo: form.modeloF,
        anio: form.anioF,
        url: form.urlF
      }
      this.fs.crearAuto(data).then(
        () => {
          console.log('Documento creado exitosamente');
          this.newAutoForm.setValue({
            idF: '',
            marcaF: '',
            modeloF: '',
            anioF: '',
            urlF: ''
          });

        }, (error) => {
          console.error(error);
        });

    } else {
      let data = {
        marca: form.marcaF,
        modelo: form.modeloF,
        anio: form.anioF,
        url: form.urlF
      }

      this.fs.actualizarAuto(documentId, data).then(
        () => {
          this.newAutoForm.setValue({
            idF: '',
            marcaF: '',
            modeloF: '',
            anioF: '',
            urlF: ''
          });
          console.log('Documento editado exitosamente!');
        }, (error) => {
          console.error(error);
        });
    }
  }

  public obtenerAutos() {
    this.fs.ObtenerAutos().subscribe((dataDocumentos) => {
      dataDocumentos.forEach((data: any) => {
        this.autos.push({
          id: data.payload.doc.id,
          data: data.payload.doc.data()
        });
        console.log(this.autos);
      })
    });
  }

  //elimnar auto
  public eliminarAuto(documnetId) {
    this.fs.eliminarAuto(documnetId)
      .then(
        () => {
          console.log("Documento Eliminar dato");
        }
        , (error) => {
          console.log(error);
        })
  }

  public newAutoForm = new FormGroup({
    marcaF: new FormControl('', Validators.required),
    modeloF: new FormControl('', Validators.required),
    anioF: new FormControl('', Validators.required),
    urlF: new FormControl('', Validators.required),
    idF: new FormControl('')
  });



}
