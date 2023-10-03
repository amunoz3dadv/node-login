const isAdminRole = (req, res, next) => {
  
  if(!req.user){
    return res.status(500).json({
      message: 'Se quiere verificar el role sin validar el token'
    })
  }

  const { rol, name } = req.user;

  if(rol !== 'ADMIN'){
    return res.status(401).json({
      message: `${name} no es administrador, no puede realizar esta accion`
    })
  }

  next();
}

const isInRoleGroup = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        message: 'Se quiere verificar el role sin validar el token'
      })
    }

    if(!roles.includes(req.user.rol)){
      return res.status(401).json({
        message: `El usuario no pertenece a ninguno de los siguiente roles ${roles}`
      })
    }

    next();
  }
}

export {
  isAdminRole,
  isInRoleGroup
}