//métodos: index (listagem de sessões), store (criar uma sessão),
//update (alterar uma sessão), destroy (remover uma sessão)

const User = require("../models/User");

// funções  assíncronas precisam ser definidas com async, no caso, usa-se o await para determinar o momento de instrução
module.exports = {
    async store(req,res) {
        const { email } = req.body;

        let user = await User.findOne({ email });

        if(!user) {
            user = await User.create({ email });
        }

       // const user = await User.create({email});

        return res.json(user);
    }
};