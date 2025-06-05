
const db = require("../config/firebase");

exports.create = async (req, res) => {
    try {
        const { idConsumidor, idProduto, quantidadeReserva, dataReserva, statusReserva } = req.body;
        const docRef = await db.collection("reservas").add({ idConsumidor, idProduto, quantidadeReserva, dataReserva, statusReserva });
        res.json({ 
            "success": true,
            "message": "Reserva realizada com sucesso.", 
            "data": {
                "Id": docRef.id
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar a reserva" });
    }
};

exports.listAll = async (req, res) => {
    try {
        const snapshot = await db.collection("reservas").get();
        const reservas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json({ 
            "success": true,
            "message": "Lista de reservas:", 
            "data": reservas
        });
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar os reservas" });
    }
};

exports.listFilter = async (req, res) => {
    try {
        const produtoCampos = [
            "idProdutor", "nomeProduto", "precoProduto", "quantidadeProduto", 
            "undMedida", "dataCriacaoProduto", "modoProducao", "categoriaProduto"
        ];

        const usuarioCampos = [
            "nomeUsuario", "telefoneUsuario", "enderecoUsuario", 
            "dataCadastroUsuario", "tipoUsuario"
        ]
        
        const produtoFiltros = {};
        const reservaFiltros = {};
        const usuarioFiltros = {};

        for (const key in req.body) {
            if (produtoCampos.includes(key)) {
                produtoFiltros[key] = req.body[key];
            } else if (usuarioCampos.includes(key)) {
                usuarioFiltros[key] = req.body[key];
            } else {
                reservaFiltros[key] = req.body[key];
            }
        }

        console.log("produtoFiltros recebido:", JSON.stringify(produtoFiltros, null, 2));
        console.log("reservaFiltros recebido:", JSON.stringify(reservaFiltros, null, 2));
        console.log("usuarioFiltros recebido:", JSON.stringify(usuarioFiltros, null, 2));


        // FILTRANDO PRODUTOS
        let queryProdutos = db.collection("produtos");

        if (Object.keys(produtoFiltros).length > 0) {
            for (const key in produtoFiltros) {
                if (produtoFiltros[key] !== undefined) {
                    queryProdutos = queryProdutos.where(key, "==", produtoFiltros[key]);
                }
            }
        }

        const snapshotProdutos = await queryProdutos.get();
        const produtosFiltrados = snapshotProdutos.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (Object.keys(produtoFiltros).length > 0 && produtosFiltrados.length === 0) {
            return res.status(404).json({ 
                "success": false,
                "message": "Nenhuma reserva encontrada com os filtros aplicados."
            });
        }


        //FILTRANDO USUÁRIOS
        let queryUsuarios = db.collection("usuarios");

        // Buscando pelos filtros de produto
        if (Object.keys(usuarioFiltros).length > 0) {
            for (const key in usuarioFiltros) {
                if (usuarioFiltros[key] !== undefined) {
                    queryUsuarios = queryUsuarios.where(key, "==", usuarioFiltros[key]);
                }
            }
        }

        const snapshotUsuarios = await queryUsuarios.get();
        const usuariosFiltrados = snapshotUsuarios.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (Object.keys(usuarioFiltros).length > 0 && usuariosFiltrados.length === 0) {
            return res.status(404).json({ 
                "success": false,
                "message": "Nenhuma reserva encontrada com os filtros aplicados."
            });
        }


        // FILTRANDO RESERVAS
        let queryReservas = db.collection("reservas");

        if (Object.keys(reservaFiltros).length > 0) {
            for (const key in reservaFiltros) {
                if (reservaFiltros[key] !== undefined) {
                    queryReservas = queryReservas.where(key, "==", reservaFiltros[key]);
                }
            }
        }


        //UNINDO OS TRÊS FILTROS

        // Se houver filtros de produto, filtramos as reservas pelos produtos encontrados
        if (produtosFiltrados.length > 0) {
            const produtoIds = produtosFiltrados.map(produto => produto.id);
            queryReservas = queryReservas.where("idProduto", "in", produtoIds);
        }

        // Se houver filtros de usuário, filtramos as reservas pelos usuários encontrados
        if (usuariosFiltrados.length > 0) {
            const usuarioIds = usuariosFiltrados.map(usuario => usuario.id);
            queryReservas = queryReservas.where("idUsuario", "in", usuarioIds);
        }

        const snapshotReservas = await queryReservas.get();
        const reservasFiltradas = snapshotReservas.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (reservasFiltradas.length === 0) {
            return res.status(404).json({ 
                success: false,
                message: "Nenhuma reserva encontrada com os filtros aplicados."
            });
        }

        return res.status(200).json({ 
            success: true,
            message: "Reservas encontradas.",
            data: reservasFiltradas
        });
    } catch (error) {
        res.status(500).json({ 
            error: "Erro ao buscar reservas", 
            details: error.message 
        });
    }
};


exports.getId = async (req, res) => {
    try {
        const doc = await db.collection("reservas").doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ 
                "success": false,
                "message": "Cadastro não encontrado" 
        });
        }
        res.json({ 
            "success": true,
            "message": "Cadastro encontrado.",
            "data": doc.id, ...doc.data() 
        });
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar o cadastro" });
        console.error(error);
    }
};

exports.update = async (req, res) => {
    try {
        const { idConsumidor, idProduto, quantidadeReserva, dataReserva, statusReserva } = req.body;
        await db.collection("reservas").doc(req.params.id).update({ idConsumidor, idProduto, quantidadeReserva, dataReserva, statusReserva });
        res.json({
            "success": true,
            "message": "Cadastro atualizado com sucesso."
        });
    } catch (error) {
        res.status(500).json({
            "success": false,
            "message": "Erro ao atualizar o cadastro."
        });
    }
};

exports.delete = async (req, res) => {
    try {
        await db.collection("reservas").doc(req.params.id).delete();
        res.json.json({
            "success": true,
            "message": "Cadastro excluído com sucesso."
        });
    } catch (error) {
        res.status(500).json({
            "success": false,
            "message": "Erro ao excluir o cadastro."
        });
    }
};

exports.addAvaliacao = async (req, res) => {
    try {
        const { avaliacaoReserva, estrelasReserva, fotosUrlReserva } = req.body;
        const reservaAvaliada = await Reserva.findByIdAndUpdate(
            idReserva,
            {
                $set: { avaliacaoReserva, estrelasReserva, fotosUrlReserva },
            },
            { new: true }
        );

        if (!reservaAvaliada) {
            return res.status(404).json({
                "success": false,
                "message": "Reserva não encontrada."
            });
        }

        return res.status(200).json({
            "success": true,
            "message": "Avaliação adicionada com sucesso.",
            "data": reservaAvaliada
        });
    } catch (error) {
        res.status(500).json({
            "success": false,
            "message": "Erro ao realizar avaliação."
        });
    }
};
