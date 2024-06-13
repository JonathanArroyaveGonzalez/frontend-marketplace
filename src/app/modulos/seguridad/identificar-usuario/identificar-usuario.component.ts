import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { Router } from '@angular/router';
import { UsuarioValidadoModel } from 'src/app/core/models/UsuarioValidado.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioModel } from 'src/app/core/models/Usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-identificar-usuario',
  templateUrl: './identificar-usuario.component.html',
  styleUrls: ['./identificar-usuario.component.css']
})
export class IdentificarUsuarioComponent implements OnInit, AfterViewInit {
  private container!: HTMLElement;
  signUpForm: FormGroup = new FormGroup({});
  signInForm: FormGroup = new FormGroup({});
  passwordVisible = false;

  constructor(
    private elementRef: ElementRef,
    private servicioSeguridad: SeguridadService,
    private fb: FormBuilder,
    private fb2: FormBuilder,
    private router: Router
    
  ) { }

  ngOnInit() {
    this.ConstruirFormulario();
  }
  ngAfterViewInit() {
    // Acceder al elemento del contenedor después de que se haya renderizado
    this.container = this.elementRef.nativeElement.querySelector('#container');
    this.attachEventListeners();
  }

  /**
   *  Construcción del formulario con los controles
   */
  ConstruirFormulario() {
    // Initialize sign up form
    this.signUpForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(/(?=.*[a-z])(?=.*[A-Z]).+/)]] // Mínimo 8 caracteres
   });
  // Initialize sign in form
  this.signInForm = this.fb2.group({
    email: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(8)]] // Mínimo 8 caracteres
  });
  }

  onSubmitSignUp() {
    if (this.signUpForm.valid) {
      let datos = this.ConstruirDatos(1);
  
      this.servicioSeguridad.RegistrarUsuario(datos).subscribe({
        next: (respuesta: UsuarioModel) => {
          
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Hola ${respuesta.name} ${respuesta.lastName}, tu registro fue exitoso. ¡Bienvenido!`,
            showConfirmButton: false,
            timer: 1000
          });
          this.container.classList.remove("right-panel-active");
        },
        error: (err: HttpErrorResponse) => { 
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Se ha producido un error al registrar el usuario. Por favor, inténtalo de nuevo más tarde.",
              showConfirmButton: false,
              timer: 1000
            });
          }
      });
  
      // 5. Reset formulario
      this.signUpForm.reset(); 
    } else {
      // 6. Formulario invalido
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Por favor, complete el formulario de Registro correctamente.",
        showConfirmButton: false,
        timer: 1000
      });
    }
  }

  onSubmitSignIn() {
    if (this.signInForm.valid) {
      let datos = this.ConstruirDatos(0);
  
      this.servicioSeguridad.IdentificarUsuario(datos).subscribe({
        next: (respuesta: UsuarioValidadoModel) => {
          
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Hola ${respuesta.name} ${respuesta.lastName}. ¡Bienvenido de nuevo!`,
            showConfirmButton: false,
            timer: 1000
          });
          this.servicioSeguridad.AlmacenarDatosUsuarioValidado(respuesta); 
          this.router.navigate(['/']); // Navegar  hacia inicio
        },
        error: (err: HttpErrorResponse) => { 
          if (err.error && err.error.message === 'Invalid credentials') {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
              showConfirmButton: false,
              timer: 1000
            });
          } else if (err.error && err.error.message === 'User does not exist') {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "El usuario no existe. Por favor, regístrate.",
              showConfirmButton: false,
              timer: 1000
            });
          } else {
            
            console.error('Error inesperado al iniciar sesión:', err); 
            
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Se ha producido un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.",
              showConfirmButton: false,
              timer: 1000
            });
          }
        }
      });
  
      // 5. Reset formulario
      this.signInForm.reset(); 
    } else {
      // 6. Formulario invalido
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Por favor, complete el formulario correctamente Login.",
        showConfirmButton: false,
        timer: 1000
      });
      
    }
  }
  

  /* Animaciones */
  
  attachEventListeners() {
    const signUpButton = this.container.querySelector('#signUp');
    const signInButton = this.container.querySelector('#signIn');

    signUpButton?.addEventListener('click', () => {
      this.container.classList.add("right-panel-active");
    });

    signInButton?.addEventListener('click', () => {
      this.container.classList.remove("right-panel-active");
    });
  }

  /**
   * Construye el objeto de datos para enviar solicitud a seguridad 
   * @param tipo de modelo a construir Registro(1) o Login(0)
   * @returns 
   */
  ConstruirDatos(tipo: number){
    let datos ={}
    let camposRegistro = this.signUpForm.controls;
    let camposLogin = this.signInForm.controls;
    if(tipo == 1){
      datos = {
        name: camposRegistro['nombre'].value,
        lastName: camposRegistro['apellidos'].value,
        email: camposRegistro['email'].value,
        phone: camposRegistro['telefono'].value,
        password: camposRegistro['password'].value,
      };
    }else{
      datos = {
        email: camposLogin['email'].value,
        password: camposLogin['contrasena'].value,
      };
    }
    
    return datos
  }
  

  get ObtenerFormGroupLogin() {
    return this.signInForm.controls; 
  }

  get ObtenerFormGroupSignUp() {
    return this.signUpForm.controls;
  }

  togglePasswordVisibility(event: Event) {
    event.stopPropagation(); // Prevent bubbling
    this.passwordVisible = !this.passwordVisible;
    const inputElement = document.querySelector('[formControlName="contrasena"]') as HTMLInputElement;
    if (inputElement) {
      inputElement.type = this.passwordVisible ? 'text' : 'password';
    }
  }

  togglePasswordVisibilityR(event: Event) {
    event.stopPropagation(); // Prevent bubbling
    this.passwordVisible = !this.passwordVisible;
    const inputElement = document.querySelector('[formControlName="password"]') as HTMLInputElement;
    if (inputElement) {
      inputElement.type = this.passwordVisible ? 'text' : 'password';
    }
  }
}


