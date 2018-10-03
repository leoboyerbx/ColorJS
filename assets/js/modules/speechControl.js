import qS from './querySelector'

class SpeechControl {
    static init(slideShow, lang) {
        let checkKeyWord = function(transcript, keyWord) {
            console.log(transcript)
            return transcript.includes(keyWord)
        }
        slideShow.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)()
        slideShow.recognition.lang = lang
        slideShow.recognition.interimResults = true
        let recognizing = false
        slideShow.recognition.onstart = function () {
            recognizing = true
        }
        slideShow.recognition.onend = function () {
            recognizing = false
        }

        slideShow.recognition.onerror = function (event) {
            recognizing = false
        }
        let grammar = '#JSGF V1.0; grammar keyword; public <keyword> = '
        qS('[cjs-keyword]', 1).forEach(el => {
            grammar += el.getAttribute('cjs-keyword') + " | "
        })
        grammar = grammar.substring(0, grammar.length-3) + ";"
        console.log(grammar)
        let speechRecognitionList = new (window.SpeechGrammarList || window.webkitSpeechGrammarList || window.mozSpeechGrammarList || window.msSpeechGrammarList)()
        speechRecognitionList.addFromString(grammar, 1)
        slideShow.recognition.grammars = speechRecognitionList
        
        slideShow.keyWordForNextSlide = function(keyWord) {
            return new Promise((resolve, reject) => {
                slideShow.recognition.start()
                slideShow.recognition.onresult = event => {
                    let result = ""
                    for(let i = event.resultIndex; i < event.results.length; i++) {
                        let transcript = event.results[i][0].transcript
                        if (event.results[i].isFinal) {
                            result = transcript
                            slideShow.recognition.stop()
                            if (checkKeyWord(transcript, keyWord)) {
                                resolve()
                            } else {
                                window.setTimeout(() => {
                                    slideShow.recognition.start()
                                }, 100);
                            }
                        }
                    }
                }
            })
        }

        /**
         * Foncion qui démarre l'écoute si la slide nécessite un speech reco
         * @param {HTMLElement} slide La slide de départ
         */
        slideShow.bindSpeech = function(slide, timeout = 3000) {
            slideShow.recognition.abort()
            let keyWord = slide.getAttribute('cjs-keyword')
            if (keyWord) {
                window.setTimeout(() => {
                    this.keyWordForNextSlide(keyWord).then(function() {
                        slideShow.next()
                    }).catch(e => {
                        if (e.name == "InvalidStateError") {
                            console.log("multiple changement")
                        } else {
                            console.error(e)
                        }
                    })
                }, timeout)
            }
        }
        slideShow.relanchSpeechRec = function() {
            if (!recognizing) {
                slideShow.bindSpeech(slideShow.allSlides[slideShow.currentSlide], 0)
            }
            
        }
    }
}

export default SpeechControl