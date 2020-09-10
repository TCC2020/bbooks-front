Feature: Pagina inicial

  Scenario: Home Page
    Given I am on the home page
    When I do nothing
    Then I should see the title

  Scenario: Pesquisa por título
    When Eu escrever por "o diário de anne frank"
    And apertar em "Buscar"
    Then Eu devo receber um livro com o nome "o diário de anne frank"
