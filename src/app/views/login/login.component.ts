import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component {

  isLoggedIn: boolean = false;

  contrasena: string = "";
  matricula: string = "";

  usuario: Usuario = {
    matricula: this.matricula,
    contraseña: this.contrasena
  };

  actualizarUsuario() {
    this.usuario.matricula = this.matricula
    this.usuario.contraseña = this.contrasena
  }
  constructor(private userService: UserService, private router: Router) { }

  async onSubmit() {
    this.actualizarUsuario();
    if (!this.usuario.matricula || !this.usuario.contraseña) {
      this.showToast('blankFieldsToast');
      return;
    }

    if (this.validateMatricula(this.usuario.matricula) && this.validatePassword(this.usuario.contraseña)) {
      try {
        let respuesta: any = await this.userService.loginUser(this.usuario.matricula, this.usuario.contraseña).toPromise();
        if (respuesta.message == 'Sesion_Activa') {
          this.showToast('successToast');
          localStorage.setItem('token', respuesta.token);
          localStorage.setItem('matricula', this.usuario.matricula);  
          this.isLoggedIn = false;
          this.router.navigate(['/inicio']);
          return
        }
        } catch (error) {
          this.showToast('errorToast');
          return
        }
      }else{
        this.showToast('errorToast');

      }
        
  }

  validateMatricula(matricula: string): boolean {
    // Validar la matrícula 
    const regex = /^A\d{5}[a-zA-Z]$/;
    return regex.test(matricula);
    //return true;
  }

  validatePassword(password: string): boolean {
    // Validar  una contraseña segura
    const regex = /^(?=.*[a-z])(?=.*\d).{8,}$/;
    return regex.test(password);
    //return true;
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


