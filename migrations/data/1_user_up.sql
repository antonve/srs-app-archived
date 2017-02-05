CREATE TABLE `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `password` binary(60) NOT NULL,
  `role` enum('ADMIN','MOD','STAFF','DISABLED') NOT NULL DEFAULT 'DISABLED',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
