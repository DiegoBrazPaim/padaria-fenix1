// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuario: any;

  constructor() {}

  login(usuario: any) {
    this.usuario = usuario;
  }

  getUsuarioNome() {
    return this.usuario ? this.usuario.nome : 'Visitante';
  }

  logout() {
    this.usuario = null;
  }

  // Novo método para cadastro no Firebase
  cadastroNoFirebase(email: string, senha: string) {
    // Supondo que você tenha o Firebase configurado no seu projeto
    // Aqui, você pode usar o AngularFire ou o Firebase SDK diretamente
    console.log('Cadastro no Firebase:', email, senha);
    // Exemplo de simulação de cadastro (substitua pela lógica real com Firebase)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Usuário cadastrado com sucesso');
      }, 1000);
    });
  }
}
