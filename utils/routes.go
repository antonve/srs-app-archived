package utils

import (
	"github.com/srs-project/app/controllers"

	"gopkg.in/labstack/echo.v2"
)

// SetupRouting Define all routes here
func SetupRouting(e *echo.Echo) {
	routesAPI := e.Group("/api")
	routesAPI.Post("/login", echo.HandlerFunc(controllers.APIUserLogin))
	routesAPI.Post("/register", echo.HandlerFunc(controllers.APIUserRegister))
}
