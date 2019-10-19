package kanji

import (
	"io/ioutil"
	"log"
	"net/http"
	"sync"

	"github.com/rs/xid"
)

var (
	list []Kanji
	mtx  sync.RWMutex
	once sync.Once
)

func init() {
	once.Do(initialiseList)
}
func initialiseList() {
	list = []Kanji{}
}

func Get() []Kanji {
	return list
}

type Kanji struct {
	Symbol string `json:"kanji"`
}

func Add(message string) string {
	t := newApi(message)
	url := "https://api.wanikani.com/v2/subjects"

	var bearer = "Bearer " + message
	req, err := http.NewRequest("GET", url, nil)
	req.Header.Add("Authorization", bearer)
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Println("Error on response.\n[ERRO] -", err)
	}
	body, _ := ioutil.ReadAll(resp.Body)
	log.Println(string([]byte(body)))
	return t.ID
}

func newApi(msg string) ApiKey {
	return ApiKey{
		ID:      xid.New().String(),
		Message: msg,
	}
}

type ApiKey struct {
	ID      string `json:"id"`
	Message string `json:"message"`
}
