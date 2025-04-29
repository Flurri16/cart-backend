const checkAdmin = (req, res, next) => {
    const user = req.user; // из токена (JWT)
    
    if (user.email !== 'admin@email.com') {
      return res.status(403).json({ message: 'Access denied' });
    }
  
    next();
  };
  