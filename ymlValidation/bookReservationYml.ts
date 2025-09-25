export const bookReservationHeader = (`
  - heading "Finalizar Reserva" [level=2]
  - paragraph: Para finalizar suas reservas, você precisa estar logado em sua conta.
  `);

export const bookReservationConfirmText = (`
  - text: 
  - heading "Reservas Confirmadas!" [level=2]
  - paragraph: /Suas reservas foram criadas com sucesso\\. Você tem \\d+ horas para retirar os livros\\./
  - link " Ver Minhas Reservas":
    - /url: /dashboard.html
  - link " Buscar Mais Livros":
    - /url: /catalog.html
  `);