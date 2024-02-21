# Projeto Kanban

Este projeto é um sistema Kanban desenvolvido com o objetivo de facilitar o gerenciamento de tarefas em equipes. Ele permite que os usuários visualizem, criem, atualizem e movam tarefas em diferentes colunas de um quadro Kanban, proporcionando uma visão clara do fluxo de trabalho.

## Funcionalidades

- Visualização das tarefas em diferentes colunas: "To do", "Doing", "QA" e "Done".
- Criação de novas tarefas.
- Atualização das tarefas existentes.
- Movimentação das tarefas entre as colunas.
- Requisição de dados em outra tela após trazer os dados do Kanban.
- Mockup do layout do Kanban.

## Tecnologias Utilizadas

- **Frontend:**
  - JavaScript: Linguagem de programação para construção da interface do usuário.
  - TypeScript: Linguagem de programação para construção da interface do usuário.
  - React.js/Next.js: Biblioteca JavaScript para construção da interface do usuário.
  - TailwindCss: Biblioteca de componentes React para criar uma IU consistente e responsiva.

- **Backend (API):**
  - Django Ninja: Framework web rápido, flexível e minimalista para construção de APIs com Django.
  - Python: Linguagem de programação utilizada para desenvolvimento do backend.
  - PostgreSql: Banco de dados SQL orientado a documentos.

## Estrutura do Projeto

- `frontend/`: Contém os arquivos do frontend do projeto.
- `backend/`: Contém os arquivos do backend (API) do projeto.

## Instruções de Uso

1. Clone o repositório.
2. Instale as dependências do frontend e do backend:
 - cd frontend
 - npm install
 - cd ../backend
 - criar venv (python -m venv nome)
 - acessar venv no Linux (source venv nome/bin/activate)
 - pip install -r requirements.txt

3. Inicie o servidor do backend:
python manage.py runserver

4. Inicie o servidor do frontend: npm run dev

5. Acesse o projeto em `http://localhost:3000`.

## Mockup

Aqui está uma representação visual do layout do Kanban:

[Inserir imagem do mockup aqui]

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

