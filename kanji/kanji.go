package kanji

import (
	"io/ioutil"
	"log"
	"net/http"
	"sync"

	"encoding/json"
)

var (
	list  []Kanji
	vlist []Vocab
	user  User
	mtx   sync.RWMutex
	once  sync.Once
)

func init() {
	once.Do(initialiseList)
}
func initialiseList() {
	user = User{}
	list = []Kanji{}
	vlist = []Vocab{}
}

//Get the intention here is to return a list
func Get() User {
	return user
}

//Kanji struct
type Kanji struct {
	Characters string `json:"characters"`
}

//Vocab struct
type Vocab struct {
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
func Add(userPassedAPIKey string) User {
	initialiseList()
	t := newAPI(userPassedAPIKey)
	return t
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
	return queryForLists(user)

}

func queryForLists(user User) User {
	url := "https://api.wanikani.com/v2/subjects/"
	var bearer = "Bearer " + user.Message
	counter := 0
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

	str := "kanji"
	str2 := "vocabulary"
	for i := range collectionHolder.Data {
		if collectionHolder.Data[i].Object == str && collectionHolder.Data[i].Data.Level <= user.Level {
			addKanjiToKanjiList(collectionHolder.Data[i].Data.Characters)
		}
	}
	for i := range collectionHolder.Data {
		if collectionHolder.Data[i].Object == str2 && collectionHolder.Data[i].Data.Level <= user.Level {
			addVocabToVocabList(collectionHolder.Data[i].Data.Characters)
		}
	}
	log.Println("got through first page of query")
	log.Println(list)

	for {
		url := collectionHolder.Pages.NextURL
		println("url for query changed" + url)
		req, err := http.NewRequest("GET", url, nil)
		req.Header.Add("Authorization", bearer)
		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			log.Println("Error on response.\n[ERRO] -", err)
		}
		body, _ := ioutil.ReadAll(resp.Body)
		jsonData := []byte(body)
		err2 := json.Unmarshal(jsonData, &collectionHolder)
		if err2 != nil {
			log.Println(err2)
		}
		for i := range collectionHolder.Data {
			if collectionHolder.Data[i].Object == str && collectionHolder.Data[i].Data.Level <= user.Level {
				addKanjiToKanjiList(collectionHolder.Data[i].Data.Characters)
			}
		}
		for i := range collectionHolder.Data {
			if collectionHolder.Data[i].Object == str2 && collectionHolder.Data[i].Data.Level <= user.Level {
				addVocabToVocabList(collectionHolder.Data[i].Data.Characters)
			}
		}
		counter = counter + 1
		log.Println("after the query : ", counter)
		log.Println(len(list))
		if !compareURLs(collectionHolder, url) {
			break
		}
	}
	return addListsToUser(user, list, vlist)

}

type KanjiList []struct {
	Kanji struct {
		Characters string `json:"characters"`
	} `json:"kanji"`
}
type VocabList []struct {
	Vocab struct {
		Characters string `json:"characters"`
	} `json:"vocab"`
}

func addListsToUser(user User, kanjiList []Kanji, vocabList []Vocab) User {
	log.Println(len(kanjiList))
	tmp := make(KanjiList, len(kanjiList))
	voc := make(VocabList, len(vocabList))

	for i := range tmp {
		tmp[i].Kanji = Kanji{kanjiList[i].Characters}
	}
	for i := range voc {
		voc[i].Vocab = Vocab{vocabList[i].Characters}
	}

	user.KanjiList = tmp
	user.VocabList = voc
	log.Println(user.KanjiList[25].Kanji.Characters)
	log.Println(user.VocabList[25].Vocab.Characters)
	return user
}

func newKanji(kanjiString string) Kanji {
	return Kanji{Characters: kanjiString}
}
func addKanjiToKanjiList(kanjiString string) {
	k := newKanji(kanjiString)
	mtx.Lock()
	list = append(list, k)
	mtx.Unlock()
}
func addVocabToVocabList(vocabString string) {
	v := newVocabTerm(vocabString)
	mtx.Lock()
	vlist = append(vlist, v)
	mtx.Unlock()
}
func newVocabTerm(vocabString string) Vocab {
	return Vocab{
		Characters: vocabString,
	}
}

//checkNextUrl checks if the nextUrl field in the struct is set to null or not
func compareURLs(collectionHolder CollectionHolder, url string) bool {
	println("next:{} last: {}", collectionHolder.Pages.NextURL, url)
	if string(collectionHolder.Pages.NextURL) == url {
		return false
	}
	return true
}

//User the user struct we are trying to pass up and parse
type User struct {
	Message   string `json:"message"`
	UserName  string `json:"user"`
	Level     int    `json:"level"`
	KanjiList []struct {
		Kanji struct {
			Characters string `json:"characters"`
		} `json:"kanji"`
	} `json:"kanjiList"`
	VocabList []struct {
		Vocab struct {
			Characters string `json:"characters"`
		} `json:"vocab"`
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
