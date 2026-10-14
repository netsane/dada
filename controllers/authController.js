import jwt from 'jsonwebtoken';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password';

export const login = (req, res) => {
  const { username, password } = req.body || {};

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  const role = user.role_name || user.role_id || 'employee';
const modules = user.modules || user.role_modules || ['finance', 'hr', 'material'];
let permissions = user.permissions || [];
if (typeof permissions === 'string') {
  try { permissions = JSON.parse(permissions); } catch { permissions = []; }
}
if (!Array.isArray(permissions)) permissions = [];

const token = jwt.sign(
  {
    sub: user.id,
    username: user.username,
    name: user.display_name || user.username,
    role,
    modules,
    permissions,   // ← ADD THIS
  },
  process.env.JWT_SECRET || 'unity-sis-dev',
  { expiresIn: process.env.JWT_EXPIRES_IN || '12h' }
);

return res.json({
  success: true,
  token,
  user: {
    id: user.id,
    username: user.username,
    name: user.display_name || user.username,
    role,
    modules,
    permissions,   // ← ADD THIS
    employee_id: user.employee_id,
  },
});
