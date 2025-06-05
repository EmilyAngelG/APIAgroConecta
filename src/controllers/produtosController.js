
const db = require("../config/firebase");

exports.create = async (req, res) => {
    try {
        const { idProdutor, nomeProduto, precoProduto, quantidadeProduto, undMedida, dataCriacaoProduto, modoProducao, categoriaProduto } = req.body;
        const docRef = await db.collection("produtos").add({ idProdutor, nomeProduto, precoProduto, quantidadeProduto, undMedida, dataCriacaoProduto, modoProducao, categoriaProduto });
        res.json({ 
            "success": true,
            "message": "Produto cadastrado com sucesso.", 
            "data": {
                "Id": docRef.id
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar o produto" });
    }
};

exports.listAll = async (req, res) => {
    try {
        const snapshot = await db.collection("produtos").get();
        const produtos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json({ 
            "success": true,
            "message": "Lista de produtos cadastrados:", 
            "data": produtos
        });
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar os produtos" });
    }
};

exports.listFilter = async (req, res) => {
    try {
        const filtros = req.body;

        let query = db.collection("produtos");

        for (const key in filtros) {
            query = query.where(key, "==", filtros[key]);
        }

        const snapshot = await query.get();
        const produtos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (produtos.length === 0) {
            return res.status(404).json({ message: "Nenhum produto encontrado com os filtros aplicados." });
        }

        res.status(200).json({ 
            "success": true,
            "message": "Produtos encontradas.",
            "data": produtos 
        });
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar reservas", details: error.message });
    }
};

exports.getId = async (req, res) => {
    try {
        const doc = await db.collection("produtos").doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ 
                "success": false,
                "message": "Produto não encontrado" 
        });
        }
        res.json({ 
            "success": true,
            "message": "Produto encontrado.",
            "data": doc.id, ...doc.data() 
        });
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar o produto" });
    }
};

exports.update = async (req, res) => {
    try {
        const { idProdutor, nomeProduto, precoProduto, quantidadeProduto, undMedida, dataCriacaoProduto, modoProducao, categoriaProduto } = req.body;
        await db.collection("produtos").doc(req.params.id).update({ idProdutor, nomeProduto, precoProduto, quantidadeProduto, undMedida, dataCriacaoProduto, modoProducao, categoriaProduto });
        res.json({
            "success": true,
            "message": "Produto atualizado com sucesso."
        });
    } catch (error) {
        res.status(500).json({
            "success": false,
            "message": "Erro ao atualizar o produto."
        });
    }
};

exports.delete = async (req, res) => {
    try {
        await db.collection("produtos").doc(req.params.id).delete();
        res.json.json({
            "success": true,
            "message": "Produto excluído com sucesso."
        });
    } catch (error) {
        res.status(500).json({
            "success": false,
            "message": "Erro ao excluir o produto."
        });
    }
};
