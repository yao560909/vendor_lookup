package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"github.com/yao560909/go-oui/pkg/oui"
)

// App struct
type App struct {
	ctx context.Context
	db *oui.Database
}

// NewApp creates a new App application struct
func NewApp() *App {
	db := oui.NewDatabase()
	if err := db.Load(); err != nil {
		log.Fatalf("failed to load OUI database: %v", err)
	}
	return &App{db: db}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) Search(mac string) (*oui.OUI,error){
	if mac == "" {
		return nil, errors.New("mac address is empty")
	}
	if o, err := a.db.Lookup(mac); err != nil {
		return nil,err
	} else {
		return &o,nil
	}
}