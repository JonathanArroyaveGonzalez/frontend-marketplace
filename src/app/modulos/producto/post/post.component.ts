import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    form: FormGroup;
    images: string[] = []; // Almacena las imágenes en base64
    imagePreviews: string[] = []; // Almacena las URLs para las previsualizaciones


    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            nombre: ['', Validators.required],
            precio: ['', Validators.required],
            stock: ['', Validators.required],
            descripcion: ['', Validators.required]
        });
    }

    ngOnInit(): void {} 

    onFileChange(event: Event) {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
          const maxAllowedFiles = 5;
          const numFilesToProcess = Math.min(files.length, maxAllowedFiles);

          

          for (let i = 0; i < numFilesToProcess; i++) {
              const reader = new FileReader();
              reader.onload = (e: any) => {
                  // Almacenar la imagen en base64 en el array 'images'
                  this.images.push(e.target.result);

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
            const formData = new FormData();
            formData.append('nombre', this.form.get('nombre')?.value);
            formData.append('precio', this.form.get('precio')?.value);
            formData.append('stock', this.form.get('stock')?.value);
            formData.append('descripcion', this.form.get('descripcion')?.value);

            // Agregar las imágenes al FormData
            for (let i = 0; i < this.images.length; i++) {
                formData.append(`images[${i}]`, this.images[i]); 
            }
            console.log(this.form.value, this.images); 
        
    }}
}
