import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  private mensagem: string = "";
  
  // Propriedades para armazenar os dados do formulário
  bairro: string = '';
  rua: string = '';

  // Formulário de cadastro
  public formGroup: FormGroup = new FormGroup({
    email: new FormControl<string>("", {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(5), // Mínimo de 5 caracteres
        Validators.maxLength(250), // Máximo de 250 caracteres
        Validators.pattern(/.+@.+\..+/) // Valida formato de e-mail
      ],
    }),
    senha: new FormControl<string>("", {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(6), // Mínimo de 6 caracteres para a senha
      ],
    }),
    cep: new FormControl<string>("", {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^\d{8}$/), // Valida formato de CEP (8 dígitos numéricos)
      ],
    }),
  });

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
  ) {}

  ngOnInit() {}

  // Método de cadastro no Firebase
  cadastro() {
    const { email, senha } = this.formGroup.value;

    if (this.formGroup.valid) {
      this.authService.cadastroNoFirebase(email, senha)
        .then(() => {
          this.router.navigate(['/login']);
        })
        .catch((error: any) => {
          this.mensagem = this.getFirebaseErrorMessage(error.code);
          this.exibeMensagem();
        });
    } else {
      this.mensagem = 'Preencha todos os campos corretamente.';
      this.exibeMensagem();
    }
  }

  // Método para buscar endereço pelo CEP
  getAddress(cep: string) {
    const cleanedCep = cep?.replace(/\D/g, ''); // Remove caracteres não numéricos
    console.log('CEP limpo:', cleanedCep); // Verifica o valor do CEP limpo
  
    if (cleanedCep?.length === 8) {
      console.log('Buscando endereço para o CEP:', cleanedCep);
  
      this.http.get<any>(`https://viacep.com.br/ws/${cleanedCep}/json/`).subscribe(
        (data) => {
          console.log('Dados retornados da API:', data);
          if (!data.erro) {
            this.rua = data.logradouro;
            this.bairro = data.bairro;
            console.log('Campos preenchidos automaticamente.');
          } else {
            this.rua = '';
            this.bairro = '';
            this.showToast('CEP inválido. Por favor, tente novamente.');
          }
        },
        (error) => {
          console.error('Erro ao buscar o endereço:', error);
          this.showToast('Erro ao buscar o endereço. Verifique sua conexão.');
        }
      );
    } else {
      console.log('CEP inválido:', cleanedCep);
      this.rua = '';
      this.bairro = '';
      this.showToast('O CEP deve conter exatamente 8 dígitos.');
    }
  }
  

  // Método para exibir mensagens no ToastController
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  // Método para traduzir mensagens de erro do Firebase
  getFirebaseErrorMessage(errorCode: string): string {
    const errorMessages: { [key: string]: string } = {
      'auth/email-already-in-use': 'O e-mail já está em uso.',
      'auth/invalid-email': 'O e-mail é inválido.',
      'auth/weak-password': 'A senha é muito fraca.',
      'auth/operation-not-allowed': 'Operação não permitida.',
    };
    return errorMessages[errorCode] || 'Erro desconhecido. Tente novamente.';
  }

  // Exibe mensagem com ToastController
  async exibeMensagem() {
    const toast = await this.toastController.create({
      message: this.mensagem,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }
}
