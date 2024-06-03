import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { Router } from '@angular/router';
import { UsuarioValidadoModel } from 'src/app/core/models/UsuarioValidado.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioModel } from 'src/app/core/models/Usuario.model';

@Component({
  selector: 'app-identificar-usuario',
  templateUrl: './identificar-usuario.component.html',
  styleUrls: ['./identificar-usuario.component.css']
})
export class IdentificarUsuarioComponent implements OnInit, AfterViewInit {
  private container!: HTMLElement;
  signUpForm: FormGroup = new FormGroup({});
  signInForm: FormGroup = new FormGroup({});

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
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]] // Mínimo 8 caracteres
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
          
          alert(`Hola ${respuesta.name} ${respuesta.lastName}, tu registro fue exitoso. ¡Bienvenido!`);
          this.container.classList.remove("right-panel-active");
        },
        error: (err: HttpErrorResponse) => { 
            alert('Se ha producido un error al registrar el usuario. Por favor, inténtalo de nuevo más tarde.');
        }
      });
  
      // 5. Reset formulario
      this.signUpForm.reset(); 
    } else {
      // 6. Formulario invalido
      alert('Por favor, complete el formulario correctamente de Registro.');
    }
  }

  onSubmitSignIn() {
    if (this.signInForm.valid) {
      let datos = this.ConstruirDatos(0);
  
      this.servicioSeguridad.IdentificarUsuario(datos).subscribe({
        next: (respuesta: UsuarioValidadoModel) => {
          
          alert(`Hola ${respuesta.name} ${respuesta.lastName}. ¡Bienvenido de nuevo!`);
          this.servicioSeguridad.AlmacenarDatosUsuarioValidado(respuesta); 
          this.router.navigate(['/']); // Navegar  hacia inicio
        },
        error: (err: HttpErrorResponse) => { 
          if (err.error && err.error.message === 'Invalid credentials') {
            alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
          } else if (err.error && err.error.message === 'User does not exist') {
            alert('El usuario no existe. Por favor, regístrate.');
          } else {
            
            console.error('Error inesperado al iniciar sesión:', err); 
            alert('Se ha producido un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
          }
        }
      });
  
      // 5. Reset formulario
      this.signInForm.reset(); 
    } else {
      // 6. Formulario invalido
      alert('Por favor, complete el formulario correctamente Login.');
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
        password: camposRegistro['contrasena'].value,
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
}

