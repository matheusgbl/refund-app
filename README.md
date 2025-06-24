# Refund App - Sistema de Solicitação de Reembolso

Uma aplicação Vue.js moderna para solicitação de reembolsos com suporte a múltiplos idiomas.

## 🚀 Tecnologias Utilizadas

- **Vue 3** - Framework JavaScript progressivo
- **TypeScript** - Superset tipado do JavaScript
- **PrimeVue** - Biblioteca de componentes UI
- **Vue I18n** - Internacionalização para Vue.js
- **Vue Router** - Roteamento oficial do Vue.js
- **Vite** - Build tool moderna e rápida

## 🌍 Idiomas Suportados

- Português (Brasil)
- English (US)
- Deutsch (Alemão)

## 📱 Funcionalidades

### ✅ Implementadas

1. **Solicitação de Reembolso**

   - Entrada de email com validação simplificada

2. **Verificação de Email**

   - Envia e-mail para o informado, via EmailJS
   - Formatação automática do código

3. **Lista de Compras**

   - Exibição organizada de produtos comprados
   - Informações detalhadas (preço, data de compra)

4. **Detalhes do Produto**

   - Visualização completa do produto com imagem grande
   - Formulário para motivo do reembolso

5. **Confirmação de Sucesso**
   - Tela de confirmação com animação

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção
- `npm run type-check` - Verificação de tipos TypeScript
- `npm run lint` - Linting do código
- `npm run format` - Formatação do código

## 🌐 Rotas da Aplicação

- `/` - Solicitação de reembolso (entrada de email)
- `/purchases` - Lista de compras
- `/product/:id` - Detalhes do produto

## 🎯 Como Usar

### Fluxo Completo:

1. **Tela Inicial**: Digite qualquer email válido e clique em "Continuar"
2. **Verificação**: Digite o código de 6 dígitos enviado por e-mail e clique em "Continuar"
3. **Lista de Compras**: Escolha um produto e clique em "Solicitar reembolso"
4. **Detalhes**: Selecione um motivo e clique em "Solicitar reembolso"
5. **Sucesso**: Visualize a confirmação da solicitação
