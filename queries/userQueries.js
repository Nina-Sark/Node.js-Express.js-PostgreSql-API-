exports.FIND_USER_BY_EMAIL =
  "SELECT user_id, email, password, role FROM users WHERE email = $1";
exports.CREATE_USER =
  "INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING user_id, email, role";