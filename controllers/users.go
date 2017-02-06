package controllers

import (
	"github.com/srs-project/app/config"
	"github.com/srs-project/app/models"
	"github.com/srs-project/app/models/enums"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"golang.org/x/crypto/bcrypt"

	jwt "github.com/dgrijalva/jwt-go"
	"gopkg.in/labstack/echo.v2"
)

// APIUserLogin checks if user exists in database and returns jwt token if valid
func APIUserLogin(context echo.Context) error {
	// Attempt to bind request to User struct
	user := &models.User{}
	err := context.Bind(user)
	if err != nil {
		return Return500(context, err)
	}

	// Get authentication data
	userCollection := models.UserCollection{Users: make([]models.User, 0)}
	dbUser, err := userCollection.GetAuthenticationData(user.Username)
	if err != nil {
		return echo.ErrUnauthorized
	}

	// Compare passwords
	err = bcrypt.CompareHashAndPassword([]byte(dbUser.Password), []byte(user.Password))
	if err != nil {
		return echo.ErrUnauthorized
	}

	// Set custom claims
	dbUser.Password = ""
	claims := models.JwtClaims{
		dbUser,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
		},
	}

	// Create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and send it as response.
	encodedToken, err := token.SignedString([]byte(config.GetConfig().JWTKey))
	if err != nil {
		return Return500(context, err)
	}

	return context.JSON(http.StatusOK, map[string]interface{}{
		"token": encodedToken,
		"user":  dbUser,
	})
}

// APIUserRegister registers new user
func APIUserRegister(context echo.Context) error {
	user := &models.User{}

	// Attempt to bind request to User struct
	err := context.Bind(user)
	if err != nil {
		return Return500(context, err)
	}

	user.HashPassword()

	// Set default role
	user.Role = enums.RoleStaff

	// Validate request
	err = user.Validate()
	if err != nil {
		return Return400(context, err)
	}

	// Save to database
	userCollection := models.UserCollection{}
	err = userCollection.Add(user)
	if err != nil {
		return Return500(context, err)
	}

	return Return201(context)
}

// APIUserGetAll gets all users
func APIUserGetAll(context echo.Context) error {
	userCollection := models.UserCollection{Users: make([]models.User, 0)}
	err := userCollection.GetAll()

	if err != nil {
		return Return500(context, err)
	}

	return context.JSON(http.StatusOK, userCollection)
}

// APIUserGetByID get the profile of a user
func APIUserGetByID(context echo.Context) error {
	userCollection := models.UserCollection{}

	id, err := strconv.ParseUint(context.Param("id"), 10, 64)
	if err != nil {
		return Return500(context, err)
	}

	user, err := userCollection.Get(id)
	if err != nil {
		return Return500(context, err)
	}

	if user == nil {
		return Return404(context, fmt.Errorf("No User found with id %v", id))
	}

	return context.JSON(http.StatusOK, user)
}

// APIUserUpdate updates a user
func APIUserUpdate(context echo.Context) error {
	user := &models.User{}

	// Attempt to bind request to User struct
	err := context.Bind(user)
	if err != nil {
		return Return500(context, err)
	}

	// Parse out id
	id, err := strconv.ParseUint(context.Param("id"), 10, 64)
	if err != nil {
		return Return500(context, err)
	}
	user.ID = id

	// Update
	userCollection := models.UserCollection{}
	err = userCollection.Update(user)
	if err != nil {
		return Return500(context, err)
	}

	return Return201(context)
}
