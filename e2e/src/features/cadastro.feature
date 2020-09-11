Feature: Cadastrar normal

  Scenario: primeira etapa cenário feliz
    Given Eu estou na paginal inicial
    And clicar em "Entrar"
    Then devo ser redirecionado para a rota "login"
    And clicar em criar uma conta
    Then devo ser redirecionado para a pagina "cadastro"
    And preencher os dados "teste", "teste", "teste@teste.com", "nfTeste", "teste123"
    And clicar no botão "Próximo"
    Then devo ser redirecionado tela "continuar-cadastro"
