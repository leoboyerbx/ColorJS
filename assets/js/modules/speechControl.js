class SpeechControl {
    static init(slideShow) {
        let checkKeyWord = function(transcript, keyWord) {
            console.log(transcript)
            return transcript.includes(keyWord)
        }
        slideShow.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)()
        slideShow.recognition.lang = 'fr-FR'
        slideShow.recognition.interimResults = true
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
        slideShow.bindSpeech = function(slide) {
            slideShow.recognition.abort()
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