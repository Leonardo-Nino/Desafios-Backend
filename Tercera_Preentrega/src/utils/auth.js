const auth = function (req, res, next) {
  console.log(req.session.user.rol)
  if (req.session && req.session.user === 'jose' && req.session.admin)
    return next()
  else return res.sendStatus(401)
}
