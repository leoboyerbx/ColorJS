import qS from './querySelector'
import io from 'socket.io-client'

class Sync {
    static init (slideShow, syncId) {
        slideShow.isSynchronized = true
        let setRemoteEventListeners = function(socket) {
            socket.on('switch', sw => {
                switch (sw) {
                    case "next":
                        slideShow.next(false)
                        break;
                    case 'prev':
                        slideShow.prev(false)
                        break;
                    default:
                        return false
                }
            })
                .on('goto', slide => {
                    slideShow.goto(slide)
                })
                
            slideShow.slider.addEventListener('cjsSwitch', e => {
                if (e.detail.emitEvent) {
                    socket.emit('switch', e.detail.direction)
                }
            })
            slideShow.slider.addEventListener('cjsGoto', e => {
                socket.emit('goto', e.detail.slideNum)
            })
        }
        slideShow.enableSync = function() {
            let socket = io.connect('https://colorjs-server-leoboyerbx.c9users.io')
            socket.emit('config', {"id": syncId})
            setRemoteEventListeners(socket)
        }
        
        let remoteButton = document.createElement('span')
        remoteButton.classList.add('fa', 'fa-wifi')
        qS('#cjs-control').appendChild(remoteButton)
        remoteButton.addEventListener('click', () => slideShow.enableSync())
        
    }
}
export default Sync