package models

import (
	"srs-project/app/models/enums"
	"errors"
	"fmt"

	"golang.org/x/crypto/bcrypt"

	jwt "github.com/dgrijalva/jwt-go"
)

// UserCollection array of users
type UserCollection struct {
	Users []User `json:"users"`
}

// User model
type User struct {
	ID          uint64     `json:"id" db:"id"`
	Username    string     `json:"username" db:"username"`
	DisplayName string     `json:"display_name" db:"display_name"`
	Password    string     `json:"password" db:"password"`
	Role        enums.Role `json:"role" db:"role"`
}

// JwtClaims json web token claim
type JwtClaims struct {
	User *User `json:"user"`
	jwt.StandardClaims
}

// Length returns the amount of users in the collection
func (userCollection *UserCollection) Length() int {
	return len(userCollection.Users)
}

// Validate the User model
func (user *User) Validate() error {
	if len(user.Username) == 0 {
		return errors.New("Invalid `Username` supplied.")
	}
	if len(user.DisplayName) == 0 {
		return errors.New("Invalid `DisplayName` supplied.")
	}
	if len(user.Role) == 0 || !user.Role.IsValid() {
		return errors.New("Invalid `Role` supplied")
	}
	if user.ID == 0 && len(user.Password) == 0 {
		return errors.New("Invalid `Password` supplied.")
	}

	return nil
}

// HashPassword hash the currently set password
func (user *User) HashPassword() error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	user.Password = string(hashedPassword)
	return nil
}

// GetAll returns all users
func (userCollection *UserCollection) GetAll() error {
	db := GetDatabase()
	defer db.Close()

	err := db.Select(&userCollection.Users, `
        SELECT
            id,
            username,
            display_name,
						role
        FROM user
    `)

	return err
}

// Get a user by id
func (userCollection *UserCollection) Get(id uint64) (*User, error) {
	db := GetDatabase()
	defer db.Close()

	// Init user
	user := User{}

	// Get user
	stmt, err := db.Preparex(`
				SELECT
					id,
					username,
					display_name,
					role
				FROM user
				WHERE
					id = ?
    `)
	if err != nil {
		return nil, err
	}

	stmt.Get(&user, id)
	return &user, nil
}

// GetAuthenticationData get data needed to generate jwt token
func (userCollection *UserCollection) GetAuthenticationData(username string) (*User, error) {
	db := GetDatabase()
	defer db.Close()

	user := User{}

	stmt, err := db.Preparex(`
        SELECT
            id,
						username,
            display_name,
						role,
            password
        FROM user
        WHERE username = ?
    `)
	if err != nil {
		return nil, err
	}

	stmt.Get(&user, username)

	return &user, err
}

// Add a user to the database
func (userCollection *UserCollection) Add(user *User) error {
	db := GetDatabase()
	defer db.Close()

	query := `
        INSERT INTO user
        SET
            username = :username,
            display_name = :display_name,
            password = :password,
						role = :role
    `
	_, err := db.NamedExec(query, user)

	return err
}

// Update a user
func (userCollection *UserCollection) Update(user *User) error {
	db := GetDatabase()
	defer db.Close()

	query := `
        UPDATE user
        SET
						username = :username,
						display_name = :display_name,
						role = :role
        WHERE id = :id
    `
	result, err := db.NamedExec(query, user)
	if err != nil {
		return err
	}

	rows, err := result.RowsAffected()
	if rows == 0 {
		err = fmt.Errorf("No user found with id %v", user.ID)
	}

	return err
}
