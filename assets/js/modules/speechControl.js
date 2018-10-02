class SpeechControl {
    static init(slideShow) {
        let checkKeyWord = function(transcript, keyWord) {
            console.log(transcript)
            return transcript.includes(keyWord)
        }
        
        slideShow.keyWordForNextSlide = function(keyWord) {
            return new Promise((resolve, reject) => {
                let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)()
                recognition.lang = 'fr-FR'
                recognition.interimResults = true
                recognition.start()
            
                recognition.onresult = event => {
                    let result = ""
                    for(let i = event.resultIndex; i < event.results.length; i++) {
                        let transcript = event.results[i][0].transcript
                        if (event.results[i].isFinal) {
                            result = transcript
                            recognition.stop()
                            if (checkKeyWord(transcript, keyWord)) {
                                resolve()
                            } else {
                                window.setTimeout(() => {
                                    recognition.start()
                                }, 10);
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
        slideShow.bindSpeech = function(slide) {
            let keyWord = slide.getAttribute('cjs-keyword')
            if (keyWord) {
                this.keyWordForNextSlide(keyWord).then(function() {
                    slideShow.next()
                })
            }
            
        }
    }
}

export default SpeechControl