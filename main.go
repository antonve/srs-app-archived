package main

import (
	"github.com/srs-project/app/utils"

	"gopkg.in/labstack/echo.v2"
	"gopkg.in/labstack/echo.v2/engine/standard"
	"gopkg.in/labstack/echo.v2/middleware"

	"log"
)

func main() {
	// Echo instance
	e := echo.New()
	log.Println("Starting SRS API")

	// Middleware
	e.Use(middleware.Recover())
	defer utils.SetupErrorLogging(e)()

	// Serve static assets
	utils.SetupStaticAssets(e)

	// Routes
	utils.SetupRouting(e)

	// Start server
	e.Run(standard.New(":3000"))
}
