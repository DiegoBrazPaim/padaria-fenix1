import { Component, OnInit, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  showPaoList: boolean = false;
  showBebidaList: boolean = false;
  showBoloList = false;
  showBiscoitoList = false;
  showFrioList = false;
  showOutroList = false;

  constructor(private renderer: Renderer2) {}
  categories = [
  ];

  ngOnInit() {
  
  
  }
  paes = [
    {
      nome: "Pão Francês",
      imagem: "assets/icon/pao-frances.jpeg",
      preco: "0,50"
    },
    {
      nome: "Broa",
      imagem: "assets/icon/broa.jpg",
      preco: "0,50"
    },
    {
      nome: "Pão Suíço",
      imagem: "assets/icon/paosuico.jpeg",
      preco: 25.00
    },
    {
      nome: "Pão de Calabresa",
      imagem: "assets/icon/calabresa.jpeg",
      preco: 25.00
    },
    {
      nome: "Pão de Coco",
      imagem: "assets/icon/paodecoco.jpg",
      preco: 25.00
    },
    {
      nome: "Pão de Cachorro quente",
      imagem: "assets/icon/paodecachorroquente.jpeg",
      preco: 25.00
    },
    {
      nome: "Pão de Batata",
      imagem: "assets/icon/paodebatata.jpeg",
      preco: 25.00
    },
  ];

  bebida = [
    { 
      nome: "Coca Cola", 
      imagem: 'assets/icon/coca.jpeg',
      preco: 25.00
     },
    { 
      nome: "Pepsi",
      imagem: "assets/icon/pepsi.jpeg",
      preco: 25.00
     },
    { 
      nome: "Sprite",
      imagem: "assets/icon/sprite.jpeg",
      preco: 25.00 
      },
      { 
        nome: "Café",
        imagem: "assets/icon/cafe.jpeg",
        preco: 25.00 
        },
  ];

  bolos = [
    { 
      nome: "Bolo de Chocolate", 
      imagem: "assets/icon/chocolate.jpeg",
       preco: 25.00
    },
    {
       nome: "Bolo de Cenoura", 
       imagem: "assets/icon/cenoura.jpeg",
       preco: 25.00
       },
    {
       nome: "Bolo de Fubá",
       imagem: "assets/icon/fuba.jpeg",
       preco: 25.00
       },
    {
       nome: "Bolo de Milho",
       imagem: "assets/icon/milho.jpeg",
       preco: 25.00
       },
    
  ];

  biscoitos = [
    {
       nome: "Biscoito de Maizena",
       imagem: "assets/icon/maizena.jpeg",
       preco: 25.00
      },
    {
       nome: "Biscoito de Chocolate",
       imagem:  "assets/icon/cookie.jpeg",
       preco: 25.00 
      },
    // Adicione mais biscoitos conforme necessário
  ];

  frios = [
    {
       nome: "Presunto",
       imagem: "assets/icon/presunto.jpeg",
       preco: 25.00
      },
    { 
      nome: "Mortadela",
      imagem: "assets/icon/mortadela.jpeg",
      preco: 25.00 
    },
    {
      nome: "Queijo Minas",
      imagem: "assets/icon/minas.jpeg",
      preco: 25.00 
     },
   { 
     nome: "Queijo Prato",
     imagem: "assets/icon/prato.jpeg",
     preco: 25.00 
   },
   {
    nome: "Queijo Mussarela",
    imagem: "assets/icon/mussarela.jpeg",
    preco: 25.00 
   },
    // Adicione mais frios conforme necessário
  ];

  outros = [
    {
       nome: "",
       imagem: "",
       preco: 25.00
    },
    { 
      nome: "Pastel",
      imagem: "",
      preco: 25.00
    },
    // Adicione mais itens conforme necessário
  ];



  togglePaoList() {
    this.showPaoList = !this.showPaoList;
  }

  toggleBebidaList() {
    this.showBebidaList = !this.showBebidaList;
  }

  toggleBoloList() {
    this.showBoloList = !this.showBoloList;
  }

  toggleBiscoitoList() {
    this.showBiscoitoList = !this.showBiscoitoList;
  }

  toggleFrioList() {
    this.showFrioList = !this.showFrioList;
  }

  toggleOutroList() {
    this.showOutroList = !this.showOutroList;
  }

  
}




 
  


 


