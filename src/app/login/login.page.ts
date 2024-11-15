import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string = "";
  public senha: string = "";
  public mensagem: string = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) { }

  async loginUsuario() {
    // Verificação de campos obrigatórios
    if (!this.email || !this.senha) {
      this.mensagem = "Por favor, preencha e-mail e senha.";
      this.exibeMensagem();
      return;
    }
  
    try {
      // Chama o serviço de login
      const res = await this.authService.login(this.email && this.senha);
      console.log("Login bem-sucedido:", res);
      this.router.navigate(["/home"]);
    } catch (error: any) {  // Especificando 'any' para evitar erros relacionados ao tipo de 'error'
      console.error("Erro ao fazer login:", error);
  
      if (error && error.code) {
        if (error.code === 'auth/user-not-found') {
          this.mensagem = "Usuário não encontrado.";
        } else if (error.code === 'auth/wrong-password') {
          this.mensagem = "Senha incorreta.";
        } else {
          this.mensagem = "Erro ao fazer login do usuário.";
        }
      } else {
        this.mensagem = "Erro desconhecido ao tentar fazer login.";
      }
  
      this.exibeMensagem();
    }
    
  }
  

  // Exibe mensagem de erro com o Toast
  async exibeMensagem() {
    const toast = await this.toastController.create({
      message: this.mensagem,
      duration: 2000
    });
    toast.present();
  }

  // Navega para a página de cadastro
  cadastroPage() {
    this.router.navigate(["/cadastro"]);
  }

  ngOnInit() {
    // Lógica de inicialização, se necessário
  }
}
