

# Store Manager API 
    

# Contexto
Utilizando a arquitetura MSC.
    Sistema de gerenciamento de vendas, onde é possível criar, visualizar, deletar e atualizar produtos e vendas utilizando todas as camadas da API (Models, Services e Controllers).<br>
   Operações básicas: Criação, Leitura, Atualização e Exclusão (CRUD).<br>
   Banco: MongoDB para a gestão de dados.<br>
   Aplicação RESTful


## Tecnologias usadas

Back-end:
>  Tecnologias utilizadas no seu desenvolvimento:
   Node Js e banco de dados MongoDB.

## Instalando Dependências

> Entre na pasta Raiz e execute o comando:

```bash
cd store-manager 
npm install
``` 

## Conexão com o Banco

*  É preciso ter o MongodDb executando na maquina ou via docker(caso preferir) 
*  Crie a variavel de acesso ao banco 
    Abra o  arquivo .env na raiz do projeto e preencha as seguintes informações:
    
     ```
    HOST=localhost
     ```
    
## Executando aplicação

* Para rodar a api:

  ```
  cd store-manager 
  npm start
  ```

## Testando as requisições

  
* Abra o programa Postman e faça as requisições:

>  Requisicao para Criar produto, tipo Post http://localhost:3000/products
      Exemplo de Json enviado no Body:
      
  ```
   {
     "name": "product_name",
     "quantity": 10
    }
    
  ``` 
    
> Requisicao para listar os produtos , tipo Get http://localhost:3000/products
  
  
  
> Requisicao para listar o produto por id, tipo Get http://localhost:3000/products/iddoproduto
  
  
> Requisicao para Atualizar o produto por id, tipo Put http://localhost:3000/products/iddoproduto  
    Exemplo de Json enviado no Body:
      
  ```
   {
     "name": "product_name",
     "quantity": 10
    }
    
  ``` 

> Requisicao para deletar o produto por id, tipo Delete http://localhost:3000/products/iddoproduto
  

  
> Requisicao para cadastrar vendas , tipo Post http://localhost:3000/sales 
  Exemplo de Json enviado no Body:
  
   ```
  [
  {
  "productId": "product_id",
  "quantity": "product_quantity",
  }
  ]
 ```
 
> Requisicao para listar as vendas , tipo Get http://localhost:3000/sales
    
  
> Requisicao para listar uma venda por id, tipo Get http://localhost:3000/sales/iddavenda
  
  
> Requisicao para atualizar uma venda , tipo Put http://localhost:3000/sales/iddavenda 
  Exemplo de Json enviado no Body:
  
   ```
 [
  {
    "productId": "5f3ff849d94d4a17da707008",
    "quantity": 3
  }
]
  ]
 ```
 
> Requisicao para deletar uma venda , tipo Delete http://localhost:3000/sales/iddavenda 
 
     
     
