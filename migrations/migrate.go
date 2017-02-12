package migrations

import (
	"fmt"
	"os"

	"github.com/srs-project/app/config"
	"github.com/srs-project/app/models"

	"github.com/DavidHuie/gomigrate"
)

func getMigrator() (*gomigrate.Migrator, error) {
	return gomigrate.NewMigrator(models.GetSQLDatabase(), gomigrate.Mariadb{}, fmt.Sprintf("%s/src/github.com/srs-project/app/%s", os.Getenv("GOPATH"), config.GetConfig().MigrationsPath))
}

// Migrate migrates the database
func Migrate() error {
	migrator, err := getMigrator()

	if err != nil {
		return err
	}

	err = migrator.Migrate()

	return err
}

// Destroy the current environment's database
func Destroy() error {
	if config.GetConfig().Environment == config.Environments["prod"] {
		return fmt.Errorf("Cannot destroy production.")
	}

	db := models.GetSQLDatabase()
	defer db.Close()

	// Drop database
	_, err := db.Exec("DROP DATABASE " + config.GetConfig().Database)
	if err != nil {
		return err
	}

	return nil
}

// Create a new database
func Create() error {
	db := models.GetSQLConnection()
	defer db.Close()

	// Create database
	_, err := db.Exec("CREATE DATABASE IF NOT EXISTS " + config.GetConfig().Database)
	if err != nil {
		return err
	}

	return nil
}
