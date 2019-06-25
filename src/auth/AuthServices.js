const User = require('../models/User');
const jwt = require('jsonwebtoken');

class AuthServices {
  
  //Verifica se usuario esta autenticado
  login(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    console.log(req.body)
    User.findOne({ username: username })
    .exec(function (err, user) {
      if (err){
        console.log(err)
        return res.staus(501).send(err)
      }

      if (user && user.authUser(password)) {
        console.log(user.toJson())
        return res.status(200).send(user.toJson());
      }
      console.log({ status: 401, message: 'Usuário ou senha inválidos' })
      return res.send({ status: 401, message: 'Usuário ou senha inválidos' });
    })
  }

  //Verifica se usuario esta autenticado
    isAuthenticate(req, res, next) {
    const token = req.headers['x-access-token'];
    console.log(req.headers)
    if (!token)
      return res.status(401).send({ auth: false, message: 'Nenhum token fornecido' });

    jwt.verify(token, process.env.JWT_WORD || 'JWT_WORD', function (err, decoded) {
      return err && res.status(500).send({ auth: false, message: 'Falha ao autenticar token' }) || next()
    });
  }


  // Verifica se usuario é admin
  isAdmin(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token)
      return res.status(401).send({ auth: false, message: 'Nenhum token fornecido' });

    jwt.verify(token, process.env.JWT_WORD, function (err, decoded) {
      console.log(decoded)
      if (err)
        return res.status(500).send({ auth: false, message: 'Falha ao autenticar token' });
      User.findOne({ _id: decoded.id })
        .exec(function (err, user) {
          if (err)
            return res.status(501).json(err)

          console.log(user)
          if (user && user.admin) {
            return next(null, user);
          }
          return res.status(401).send({ auth: false, message: 'Usuário não é admin' });

        });
    });
  }
}

module.exports = new AuthServices();