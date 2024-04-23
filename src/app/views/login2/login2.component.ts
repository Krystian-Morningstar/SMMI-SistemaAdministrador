import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit{
  
 async ngOnInit(){
    this.actualizarUsuario()
     let a: any= await this.userService.loginUser("M81245S", "segura123").toPromise();
    console.log(a)
  }

  isLoggedIn: boolean = false;

  contrasena:string= "";
  matricula: string="";

  usuario = {
    matricula: this.matricula,
    contraseña: this.contrasena
  };
 actualizarUsuario(){
  this.usuario.matricula=this.matricula
  this.usuario.contraseña=this.contrasena
 }
  constructor(private userService: UserService, private router: Router) {}

   onSubmit() {
    this.usuario.matricula=this.matricula
    this.usuario.contraseña=this.contrasena
    if (!this.usuario.matricula || !this.usuario.contraseña) {
     this.showToast('blankFieldsToast');
      return; 
    }

      console.log(this.usuario.matricula, this.usuario.contraseña);
    if (this.validateMatricula(this.usuario.matricula) && this.validatePassword(this.usuario.contraseña)) {
       this.userService.loginUser(this.usuario.matricula, this.usuario.contraseña)
        // this.userService.loginUser(this.usuario)
        .subscribe(
          (response) => {
            if (response['success']) {
              this.showToast('successToast');
              console.log(response)
              //localStorage.setItem('token', response['token']);
              localStorage.setItem('token', 'logueado');

              console.log(localStorage.getItem('token'))
              this.isLoggedIn = false;
              this.router.navigate(['/inicio']); 
            } else {
              this.showToast('errorToast');
            }
          },
          (error) => {
            this.showToast('errorToast');
          }
        );
    } else {
      this.showToast('errorToast');
    }
  }

  validateMatricula(matricula: string): boolean {
    // Validar la matrícula 
   // const regex = /^A\d{2}\d{3}$/; 
    //return regex.test(matricula);
    return true;
  }

  validatePassword(password: string): boolean {
    // Validar  una contraseña segura
    //const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    //return regex.test(password);
    return true;
  }

  showToast(toastId: string) {
    const toast = document.getElementById(toastId);
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000); 
    }
  }

  togglePasswordVisibility(passwordInput: HTMLInputElement) {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  }
}


