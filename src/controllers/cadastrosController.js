
const db = require("../config/firebase");

exports.create = async (req, res) => {
    try {
        const { nomeUsuario, telefoneUsuario, enderecoUsuario, dataCadastroUsuario, tipoUsuario } = req.body;
        const docRef = await db.collection("cadastros").add({ nomeUsuario, telefoneUsuario, enderecoUsuario, dataCadastroUsuario, tipoUsuario });
        res.json({ 
            "success": true,
            "message": "Usuário cadastrado com sucesso.", 
            "data": {
                "Id": docRef.id
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar o cadastro" });
    }
};

exports.listAll = async (req, res) => {
    try {
        const snapshot = await db.collection("cadastros").get();
        const cadastros = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json({ 
            "success": true,
            "message": "Lista de usuário cadastrados:", 
            "data": cadastros
        });
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar os cadastros" });
    }
};

exports.getId = async (req, res) => {
    try {
        const doc = await db.collection("cadastros").doc(req.params.id).get();
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
        const { nomeUsuario, telefoneUsuario, enderecoUsuario, dataCadastroUsuario, tipoUsuario } = req.body;
        await db.collection("cadastros").doc(req.params.id).update({ nomeUsuario, telefoneUsuario, enderecoUsuario, dataCadastroUsuario, tipoUsuario });
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
        await db.collection("cadastros").doc(req.params.id).delete();
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
