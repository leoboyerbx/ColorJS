class SpeechControl {
    static init(slideShow) {
        let checkKeyWord = function(transcript, keyWord) {
            console.log(transcript)
            return transcript.includes(keyWord)
        }
        
        slideShow.keyWordForNextSlide = keyWord => {
        
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
                            slideShow.next()
                        } else {
                            window.setTimeout(() => {
                                recognition.start()
                            }, 10);
                        }
                    }
                }
            }
        }

        slideShow.bindSpeech = slide => {
            console.log(slide)
        }
    }
}

export default SpeechControl