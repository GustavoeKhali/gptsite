async function pagarMercadoPago(nomeProduto, preco) {
  const body = {
    title: nomeProduto,
    quantity: 1,
    unit_price: preco,
    currency_id: "BRL"
  };

  const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      Authorization: "Bearer SUA_ACCESS_TOKEN_AQUI",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      items: [body],
      back_urls: {
        success: "https://falco.com.br/sucesso",
        failure: "https://falco.com.br/falha",
        pending: "https://falco.com.br/pendente"
      },
      auto_return: "approved"
    })
  });

  const data = await response.json();
  if (data.init_point) {
    window.location.href = data.init_point;
  } else {
    alert("Erro ao iniciar pagamento. Verifique sua Access Token.");
    console.log(data);
  }
}