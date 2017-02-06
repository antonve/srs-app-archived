package models

import (
	"database/sql"
	"log"
	"srs-project/app/config"

	// sqlx needs the mysql driver
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// GetDatabase Returns database connection from pool
func GetDatabase() *sqlx.DB {
	db, err := sqlx.Open("mysql", config.GetConfig().GetCompleteConnectionString())
	if err != nil {
		log.Fatalln("Couldn't connect to data store")

		return nil
	}

	return db
}

// GetSQLDatabase Returns database connection from pool with the default sql package
func GetSQLDatabase() *sql.DB {
	db, err := sql.Open("mysql", config.GetConfig().GetCompleteConnectionString())
	if err != nil {
		log.Fatalln("Couldn't connect to data store")

		return nil
	}

	return db
}

// GetConnection Returns database connection without a database
func GetConnection() *sqlx.DB {
	db, err := sqlx.Open("mysql", config.GetConfig().ConnectionString)
	if err != nil {
		log.Fatalln("Couldn't connect to data store")

		return nil
	}

	return db
}

// GetSQLConnection Returns database connection without a database with the default sql package
func GetSQLConnection() *sql.DB {
	db, err := sql.Open("mysql", config.GetConfig().ConnectionString)
	if err != nil {
		log.Fatalln("Couldn't connect to data store")

		return nil
	}

	return db
}
