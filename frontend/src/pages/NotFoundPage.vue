<template>
    <div class="not-found">
      <h1>404 - Página Não Encontrada</h1>
      <p>Desculpe, a página que você está procurando não existe.</p>
      <router-link to="/">Voltar para a página inicial</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
  };
  </script>
  
  <style scoped>
  .not-found {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100% - 160px);
    text-align: center;
    margin-top: 50px;
  }
  .not-found h1 {
    font-size: 2em;
    color: #ff0000;
  }
  .not-found p {
    margin: 20px 0;
  }
  </style>
  