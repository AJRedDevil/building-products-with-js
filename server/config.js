exports.db = {
  host: process.env.EXPERTS_DB_URL || 'localhost',
  port: process.env.EXPERTS_DB_PORT || 28015,
  db: 'expertsdb',
};

exports.auth = {
  passwordSalt: process.env.EXPERTS_AUTH_PASSALT ||
    'UIqG34oNQDoT3BYKpJCVngv4wM2OihkaJaE@6zV!qf8C&RV&t2Gr2PquIV*CQZ7O',
  sessionSecret: process.env.EXPERTS_AUTH_SESSECRET ||
    'rSshR4iClKnk0G45k@sBhx3!rbu0Z8lasGR38goRy8m!A#Yiuw#tEAP1OM2t@5Bi',
  jwtSecret: process.env.EXPERTS_AUTH_JSWSECRET ||
    'hlQfxVALKFgx2Xtq7eK#iX3kkNhoA$f3f@04G4ci90yV&JVsWgAjba76H3fo&Kfr',
};
