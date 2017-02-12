package controllers_test

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/srs-project/app/controllers"
	"github.com/srs-project/app/models"
	"github.com/srs-project/app/models/enums"
	"github.com/srs-project/app/utils"

	"github.com/labstack/echo"
	"github.com/stretchr/testify/assert"
)

type LoginBody struct {
	Token string      `json:"token"`
	User  models.User `json:"user"`
}

func init() {
	utils.SetupTesting()
}

func TestCreateUser(t *testing.T) {
	// Setup registration request
	e := echo.New()
	req, err := http.NewRequest(echo.POST, "/register", strings.NewReader(`{"username": "register_test", "display_name": "ms", "password": "password"}`))
	if !assert.NoError(t, err) {
		return
	}
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	if assert.NoError(t, controllers.APIUserRegister(c)) {
		assert.Equal(t, http.StatusCreated, rec.Code)
		assert.Equal(t, `{"success": true}`, rec.Body.String())
	}
}

func TestLoginUser(t *testing.T) {
	// Setup user to test login with
	user := models.User{Username: "login_test", DisplayName: "srs_user", Password: "password", Role: enums.RoleStaff}
	user.HashPassword()
	userCollection := models.UserCollection{}
	userCollection.Add(&user)

	// Setup login request
	e := echo.New()
	req, err := http.NewRequest(echo.POST, "/login", strings.NewReader(`{"username": "login_test", "password": "password"}`))
	if !assert.NoError(t, err) {
		return
	}
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	if assert.NoError(t, controllers.APIUserLogin(c)) {
		// Check login response
		var body LoginBody
		assert.Equal(t, http.StatusOK, rec.Code)
		err = json.Unmarshal(rec.Body.Bytes(), &body)

		// Check if the user has information
		assert.Nil(t, err)
		assert.NotEmpty(t, body.Token)
		assert.NotNil(t, body.User)

		// Check if the user has the correct information
		assert.Equal(t, "login_test", body.User.Username)
		assert.Equal(t, "srs_user", body.User.DisplayName)
		assert.Equal(t, enums.RoleStaff, body.User.Role)

		// Make sure password is not sent back to the client
		assert.Empty(t, body.User.Password)
	}
}
