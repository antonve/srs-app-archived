package utils

import (
	"fmt"
	"io"
	"log"
	"os"

	"gopkg.in/labstack/echo.v2"
	"gopkg.in/labstack/echo.v2/middleware"
)

// SetupStaticAssets Serve our static assets, the JS application
func SetupStaticAssets(e *echo.Echo) {
	staticPath := os.Getenv("SRS_STATIC_FILES")
	log.Printf("Serving static files from: %v", staticPath)

	// Any file we can't find we redirect to the index
	e.File("/*", staticPath+"/index.html")

	// This is to serve assets like css and javascript
	e.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root:   staticPath,
		Browse: true,
	}))
}

// SetupErrorLogging Log to both file and stderr
func SetupErrorLogging(e *echo.Echo) func() {
	// Create or open log file
	logFile, err := os.OpenFile("error.log", os.O_CREATE|os.O_APPEND|os.O_RDWR, 0666)
	if err != nil {
		log.Panicln(err)
	}

	// Setup logging to stderr and our log file
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "time=${time_rfc3339}, remote_ip=${remote_ip}, method=${method}, " +
			"path=${path}, status=${status}, took=${response_time}, sent=t=${response_size} bytes\n",
		Output: io.MultiWriter(os.Stderr, logFile),
	}))

	// Return a function that will close the file handle once we exit the application
	return func() {
		e := logFile.Close()
		if e != nil {
			fmt.Fprintf(os.Stderr, "Problem closing the log file: %s\n", e)
		}
	}
}
