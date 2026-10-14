import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. Missing token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sis-export-demo');
    req.user = { username: decoded.username };
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
  }
};
function requirePermission(...needed) {
  return (req, res, next) => {
    const role = String(req.user?.role || '').toLowerCase();
    if (role === 'admin' || role === 'super_admin') return next();

    const perms = Array.isArray(req.user?.permissions) ? req.user.permissions.map(String) : [];
    const ok = needed.some((p) => perms.includes(p) || perms.includes('*'));
    if (!ok) {
      return res.status(403).json({
        success: false,
        message: `Missing permission: ${needed.join(' or ')}`,
      });
    }
    next();
  };
}

module.exports = { authRequired, optionalAuth, requireModule, requirePermission };
