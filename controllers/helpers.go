package controllers

import (
	"log"
	"github.com/srs-project/app/config"
	"github.com/srs-project/app/models"
	"net/http"

	"runtime/debug"

	jwt "github.com/dgrijalva/jwt-go"
	"gopkg.in/labstack/echo.v2"
)

// Return201 helper
func Return201(context echo.Context) error {
	return context.JSONBlob(http.StatusCreated, []byte(`{"success": true}`))
}

// Return200 helper
func Return200(context echo.Context) error {
	return context.JSONBlob(http.StatusOK, []byte(`{"success": true}`))
}

// Return400 helper
func Return400(context echo.Context, err error) error {
	handleError(err)
	return Serve400(context)
}

// Serve400 helper
func Serve400(context echo.Context) error {
	return context.JSONBlob(http.StatusBadRequest, []byte(`{"success": false, "errorCode": 400, "errorMessage": "400 bad request"}`))
}

// Return404 helper
func Return404(context echo.Context, err error) error {
	handleError(err)
	return Serve404(context)
}

// Serve404 helper
func Serve404(context echo.Context) error {
	return context.JSONBlob(http.StatusNotFound, []byte(`{"success": false, "errorCode": 404, "errorMessage": "404 page not found"}`))
}

// Serve405 helper
func Serve405(context echo.Context) error {
	return context.JSONBlob(http.StatusMethodNotAllowed, []byte(`{"success": false, "errorCode": 405, "errorMessage": "405 method not allowed"}`))
}

// Return500 helper
func Return500(context echo.Context, err error) error {
	handleError(err)
	return Serve500(context)
}

// Serve500 helper
func Serve500(context echo.Context) error {
	return context.JSONBlob(http.StatusInternalServerError, []byte(`{"success": false, "errorCode": 500, "errorMessage": "500 internal server error"}`))
}

// getUser helper
func getUser(context echo.Context) *models.User {
	return (context.Get("user").(*jwt.Token).Claims).(*models.JwtClaims).User
}

func handleError(err error) {
	log.Println(err.Error())

	if config.GetConfig().Debug {
		debug.PrintStack()
	}
}
