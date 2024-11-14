import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {
  // Propriedades para armazenar os dados do formulário
  bairro: string = '';
  rua: string = '';

  constructor(private http: HttpClient) {}

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
