package kanji

import (
	"io/ioutil"
	"log"
	"net/http"
	"sync"

	"encoding/json"
)

var (
	list []Kanji
	user User
	mtx  sync.RWMutex
	once sync.Once
)

func init() {
	once.Do(initialiseList)
}
func initialiseList() {
	list = []Kanji{}
}

//Get the intention here is to return a list
func Get() []Kanji {
	return list
}

//Kanji hold the kanji
type Kanji struct {
	Characters string `json:"characters"`
}

//UserHolder this is a stripped down struct holder for the json returned by the url call
type UserHolder struct {
	Object string `json:"object"`
	Data   struct {
		Username string `json:"username"`
		Level    int    `json:"level"`
	} `json:"data"`
}

//Add gets user name by calling local api call function
func Add(userPassedAPIKey string) string {
	t := newAPI(userPassedAPIKey)
	return t.UserName
}

//local function used to return user data from api call to wanikani
func newAPI(msg string) User {
	url := "https://api.wanikani.com/v2/user"

	var bearer = "Bearer " + msg
	req, err := http.NewRequest("GET", url, nil)
	req.Header.Add("Authorization", bearer)
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Println("Error on response.\n[ERRO] -", err)
	}
	body, _ := ioutil.ReadAll(resp.Body)
	jsonData := []byte(body)
	var userHolder UserHolder
	err2 := json.Unmarshal(jsonData, &userHolder)
	if err2 != nil {
		log.Println(err2)
	}

	log.Println(userHolder.Data.Username + " pinged the user function")
	user.Message = msg
	user.UserName = userHolder.Data.Username
	user.Level = userHolder.Data.Level
	log.Println(user.Level)
	queryForLists(user)
	return User{
		Message:  msg,
		UserName: userHolder.Data.Username,
		Level:    userHolder.Data.Level,
	}
}

func queryForLists(user User) {
	url := "https://api.wanikani.com/v2/subjects/"
	var bearer = "Bearer " + user.Message

	req, err := http.NewRequest("GET", url, nil)
	req.Header.Add("Authorization", bearer)
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Println("Error on response.\n[ERRO] -", err)
	}
	var collectionHolder CollectionHolder
	body, _ := ioutil.ReadAll(resp.Body)
	jsonData := []byte(body)
	err2 := json.Unmarshal(jsonData, &collectionHolder)
	if err2 != nil {
		log.Println(err2)
	}
	var kanjiList []string
	var vocabList []string
	str := "kanji"
	str2 := "vocabulary"
	for i := range collectionHolder.Data {
		if collectionHolder.Data[i].Object == str && collectionHolder.Data[i].Data.Level < user.Level {
			addKanjiToKanjiList(collectionHolder.Data[i].Data.Characters)
		}
		if collectionHolder.Data[i].Object == str2 && collectionHolder.Data[i].Data.Level < user.Level {
			vocabList = append(vocabList, collectionHolder.Data[i].Data.Characters)
		}
	}
	log.Println(kanjiList)
}

func newKanji(kanjiString string) Kanji {
	return Kanji{
		Characters: kanjiString,
	}
}
func addKanjiToKanjiList(kanjiString string) {
	k := newKanji(kanjiString)
	mtx.Lock()
	list = append(list, k)
	mtx.Unlock()
}

//User the user struct we are trying to pass up and parse
type User struct {
	Message   string `json:"message"`
	UserName  string `json:"user"`
	Level     int    `json:"level"`
	KanjiList []struct {
		Characters string `json:"characters"`
	} `json:"kanjiList"`
	VocabList []struct {
		Characters string `json:"characters"`
	} `json:"vocabList"`
}

//CollectionHolder stripped down unmarshalling object
type CollectionHolder struct {
	Object string `json:"object"`
	URL    string `json:"url"`
	Pages  struct {
		PerPage     int         `json:"per_page"`
		NextURL     string      `json:"next_url"`
		PreviousURL interface{} `json:"previous_url"`
	} `json:"pages"`
	Data []struct {
		ID     int    `json:"id"`
		Object string `json:"object"`
		Data   struct {
			Level      int    `json:"level"`
			Characters string `json:"characters"`
		} `json:"data"`
	} `json:"data"`
}
