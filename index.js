const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;
app.use(express.json());

// Configuração do banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',       
  password: '1207Casa*',     
  database: 'ecomerce'
});

// Conectar ao banco de dados
connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados como ID ' + connection.threadId);
});

// Endpoint para obter dados dos clientes
app.get('/clientes', (req, res) => {
  try {
    connection.query('SELECT * FROM clientes', (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json(results);
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/clientes', (req, res) => {
  const { nome, sobrenome, email, senha, telefone } = req.body;

  try {
    if (!nome || !sobrenome || !email || !senha || !telefone) {
      return res.status(400).json({ message: 'Preencha todos os campos!' });
    }

    connection.query(
      'INSERT INTO clientes (nome, sobrenome, email, senha, telefone) VALUES (?, ?, ?, ?, ?)',
      [nome, sobrenome, email, senha, telefone],
      (error, results) => {

        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.json({ message: 'Cliente cadastrado com sucesso!', id: results.insertId });
      }
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.put('/clientes/:id', (req, res) => {
  const { nome, sobrenome, email, senha, telefone } = req.body;
  const { id } = req.params;

  try {
    if (!nome || !sobrenome || !email || !senha || !telefone) {
      return res.status(400).json({ message: 'Preencha todos os campos!' });
    }

    connection.query(
      'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, senha = ?, telefone = ? WHERE id = ?',
      [nome, sobrenome, email, senha, telefone, id],
      (error, results) => {

        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.json({ message: 'Cliente atualizado com sucesso!', id: id });
      }
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.delete('/clientes/:id', (req, res) => {
  const { id } = req.params;

  try {
    connection.query('DELETE FROM clientes WHERE id = ?', [id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ message: 'Cliente deletado com sucesso!', id: id });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Endpoint para obter dados dos produtos
app.get('/produtos', (req, res) => {
  try {
    connection.query('SELECT * FROM produtos', (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json(results);
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/produtos', (req, res) => {
  const { nome, descricao, preco, categoria, sku, imagem_produto } = req.body;

  try {
    if (!nome || !descricao || !preco || !categoria || !sku || !imagem_produto) {
      return res.status(400).json({ message: 'Preencha todos os campos!' });
    }

    connection.query(
      'INSERT INTO produtos (nome, descricao, preco, categoria, sku, imagem_produto) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, descricao, preco, categoria, sku, imagem_produto],
      (error, results) => {

        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.json({ message: 'Produto cadastrado com sucesso!', id: results.insertId });
      }
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.put('/produtos/:id', (req, res) => {
  const { nome, descricao, preco, categoria, sku, imagem_produto } = req.body;
  const { id } = req.params;
  try {
    if (!nome || !descricao || !preco || !categoria || !sku || !imagem_produto) {
      return res.status(400).json({ message: 'Preencha todos os campos!' });
    }

    connection.query(
      'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, categoria = ?, sku = ?, imagem_produto = ? WHERE id = ?',
      [nome, descricao, preco, categoria, sku, imagem_produto, id],
      (error, results) => {

        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.json({ message: 'Produto atualizado com sucesso!', id: id });
      }
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  try {
    connection.query('DELETE FROM produtos WHERE id = ?', [id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ message: 'Produto deletado com sucesso!', id: id });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Endpoint para obter dados dos pedidos
app.get('/pedidos', (req, res) => {
 try {
    connection.query('SELECT * FROM pedidos', (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json(results);
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/pedidos', (req, res) => {
  const { id_cliente, valor_total, status_pedido, id_venda } = req.body;
  try  {
    if (!id_cliente || !valor_total || !status_pedido || !id_venda) {
      return res.status(400).json({ message: 'Preencha todos os campos!' });
    }

    connection.query(
      'INSERT INTO pedidos (id_cliente, valor_total, status_pedido, id_venda) VALUES (?, ?, ?, ?)',
      [id_cliente, valor_total, status_pedido, id_venda],
      (error, results) => {

        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.json({ message: 'Pedido cadastrado com sucesso!', id: results.insertId });
      }
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});



// Endpoint para obter dados dos itens dos vendas
app.get('/vendas', (req, res) => {
  try {
    connection.query('SELECT * FROM vendas', (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json(results);
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/vendas', (req, res) => {
  const { id_cliente, valor_total, metodo_pagamento, status_venda} = req.body;

  try {
    if (!id_cliente || !valor_total || !metodo_pagamento || !status_venda) {
      return res.status(400).json({ message: 'Preencha todos os campos!' });
    }

    connection.query(
      'INSERT INTO vendas (id_cliente, valor_total, metodo_pagamento, status_venda) VALUES (?, ?, ?, ?)',
      [id_cliente, valor_total, metodo_pagamento, status_venda],
      (error, results) => {

        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.json({ message: 'Venda cadastrado com sucesso!', id: results.insertId });
      }
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Endpoint para obter dados dos itens dos estoque
app.get('/estoque', (req, res) => {
  try {
    connection.query('SELECT * FROM estoque', (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json(results);
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/estoque', (req, res) => {
  const { id_produto,  quantidade_atual,  valor_unitario, localizacao_estoque, motivo_atualizacao} = req.body;

  try {
    if (!id_produto || !quantidade_atual || !valor_unitario || !localizacao_estoque || !motivo_atualizacao) {
      return res.status(400).json({ message: 'Preencha todos os campos!' });
    }

    connection.query(
      'INSERT INTO estoque (id_produto, quantidade_atual, valor_unitario, localizacao_estoque, motivo_atualizacao) VALUES (?, ?, ?, ?, ?)',
      [id_produto, quantidade_atual, valor_unitario, localizacao_estoque, motivo_atualizacao],
      (error, results) => {

        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.json({ message: 'Estoque cadastrado com sucesso!', id: results.insertId });
      }
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
