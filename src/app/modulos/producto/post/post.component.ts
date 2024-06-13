import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogicaNegocioService } from 'src/app/servicios/logica-negocio.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
declare let M: any;
@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    form: FormGroup;
    images: File[] = []; // Almacena las imágenes en base64
    imagePreviews: string[] = []; // Almacena las URLs para las previsualizaciones
    postID: string = '';
    userId: string = '';

    constructor(
        private fb: FormBuilder, 
        private servicioLogicaNegocio: LogicaNegocioService,
        private servicioSeguridad: SeguridadService
    ) {
        this.form = this.fb.group({
            nombre: ['', Validators.required],
            precio: ['', Validators.required],
            stock: ['', Validators.required],
            descripcion: ['', Validators.required],
            categoria: ['', Validators.required] ,  
        });
    }

    ngOnInit(): void {
        M.AutoInit();
        this.userId = this.servicioSeguridad.datosUsuarioValidado.value.id ?? '';
    } 

    onFileChange(event: Event) {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
          const maxAllowedFiles = 5;
          const numFilesToProcess = Math.min(files.length, maxAllowedFiles);

          

          for (let i = 0; i < numFilesToProcess; i++) {
              const reader = new FileReader();
              reader.onload = (e: any) => {
                  // Almacenar la imagen de tipo FILE en el array 'images'
                  
                  this.images.push(files[i]);

                  // Almacenar la URL de previsualización en el array 'imagePreviews'
                  this.imagePreviews.push(e.target.result); 
              };
              reader.readAsDataURL(files[i]); // Leer el archivo como una URL de datos
          }

          if (files.length > maxAllowedFiles) {
              alert(`Solo se permiten ${maxAllowedFiles} fotos.`);
          }
      }
  }

    onSubmit() {
      
          if (this.form.valid) {
            const DataPost = {
                "name": this.form.get('nombre')?.value,
                "category": this.form.get('categoria')?.value,
                "price": this.form.get('precio')?.value,
                "description": this.form.get('descripcion')?.value,
                "stock": this.form.get('stock')?.value,
                "status": 1,
                "createdUser": this.servicioSeguridad.datosUsuarioValidado.value.id
            }

            this.servicioLogicaNegocio.CrearPost(DataPost).subscribe({
                next: (data) => {
                    this.postID = data;
                    this.guardarImagenes();
                },
                error: (error) => {
                    console.log(error);
                }
            })
        
    }}

    guardarImagenes() {
        this.images.forEach(imagen => {
            this.servicioLogicaNegocio.CargarImagenesPost( imagen,this.postID ).subscribe({
                next: (data) => {
                    console.log(data);
                },
                error: (error) => {
                    alert("Se produjo un error al cargar la imagenes")
                }
            })
        });

    }
}
