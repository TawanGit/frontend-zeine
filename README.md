# 🚀 Instruções de Configuração

# Instale as dependências

```bash
 npm install
```

## ⚙️ Configure as variáveis de ambiente

Renomeie o arquivo de exemplo:
.env.example → .env

Defina a URL do backend dentro do .env:

```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

ℹ️ A porta padrão do backend do projeto é 3000.

▶️ Execute o projeto

```bash
npm run dev
```

# Estrutura de Testes

Todos os testes estão localizados na pasta:

```bash
tests/components
```

Para executar os testes, utilize o comando:

```bash
npm run test
```

# Estrutura do Projeto (src/app)

Páginas principais:

page.tsx: página de login

register/page.tsx: página de registro de usuários

Componentes gerais:

Button: botão reutilizável

Error: exibe mensagens de erro

Success: exibe mensagens de sucesso

Dashboard:
Dentro da pasta dashboard, estão todos os componentes e lógica necessários para o funcionamento do dashboard, incluindo:

Componentes próprios do dashboard
Lógica de navegação e estado da aplicação

# Gerenciamento de Autenticação

Após o login, o token do usuário é armazenado no localStorage, assim como email e o id

O token é utilizado para validações e chamadas posteriores à API, assim como os demais
