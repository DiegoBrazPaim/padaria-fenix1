import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormControl, FormGroup, Validators } from "@angular/forms";
import { of, throwError } from "rxjs";
import { AutenticacaoService } from "../services/autenticacao.service";
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  private mensagem: string = "";
  public formGroup: FormGroup = new FormGroup({
    email: new FormControl<string>("", {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(10),
        //Validators.maxLength(250),
        //Validators.minLength(5),
        //Validators.pattern(/.+@.+\..+/)
      ],
    }),
    senha: new FormControl<string>("", {

      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(6),
      ],
    }),
  });

  constructor(private http: HttpClient, private authService: AutenticacaoService,
    private router: Router,
    private toastController:
      ToastController
  ) { }
  cadastro() {
    const { email, senha } = this.formGroup.value;
    this.authService.cadastroNoFirebase(email,
      senha)
      .then((res: any) => {
        this.router.navigate(["/login"]);
      }).catch((error: any) => {
        this.mensagem = "Erro ao incluir usuário.";
        this.exibeMensagem();
      })
  }
  async exibeMensagem() {
    const toast =
      await this.toastController.create({
        message: this.mensagem,
        duration: 2000
      });
    toast.present();
  }
  ngOnInit() {
  }

  // Propriedades para armazenar os dados do formulário
  bairro: string = '';
  rua: string = '';


  // Método para buscar o endereço usando o CEP
  getAddress(cep: string) {
    // Remove caracteres não numéricos do CEP
    const cleanedCep = cep.replace(/\D/g, '');

    // Apenas chama a API quando o CEP tem exatamente 8 caracteres
    if (cleanedCep.length === 8) {
      this.http.get<any>(`https://viacep.com.br/ws/${cleanedCep}/json/`).subscribe(
        (data) => {
          if (!data.erro) {
            this.rua = data.logradouro; // Preenche o campo da rua
            this.bairro = data.bairro; // Preenche o campo do bairro
          } else {
            // Não exibe alerta aqui; apenas limpa os campos
            this.rua = '';
            this.bairro = '';
          }
        },
        (error) => {
          console.error('Erro ao buscar o endereço:', error);
          alert('Erro ao buscar o endereço. Verifique o CEP e tente novamente.');
        }
      );
    }
  }
}
