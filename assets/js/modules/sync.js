import qS from './querySelector'
import io from 'socket.io-client'

class Sync {
  static init (slideShow, syncId) {
    slideShow.isSynchronized = true
    const setRemoteEventListeners = function (socket) {
      socket.on('switch', sw => {
        switch (sw) {
          case 'next':
            slideShow.next(false)
            break
          case 'prev':
            slideShow.prev(false)
            break
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
    let socket
    slideShow.enableSync = function () {
      remoteButton.classList.remove('fa-wifi')
      remoteButton.classList.add('fa-exchange-alt')
      const customServ = slideShow.slider.getAttribute('cjs-sync-server')
      const server = customServ || 'https://sync-colorjs.cf:443'
      socket = io.connect(server)
      socket.emit('config', { id: syncId })
      setRemoteEventListeners(socket)
      slideShow.isConnected = true
    }
    slideShow.disableSync = function () {
      remoteButton.classList.remove('fa-wifi')
      remoteButton.classList.add('fa-exchange-alt')
      socket.disconnect()
      slideShow.isConnected = false
    }
    slideShow.toggleSync = function () {
      if (slideShow.isConnected) {
        slideShow.disableSync()
      } else {
        slideShow.enableSync()
      }
    }

    const remoteButton = document.createElement('span')
    remoteButton.classList.add('fa', 'fa-wifi')
    qS('#cjs-control').appendChild(remoteButton)
    remoteButton.addEventListener('click', () => slideShow.toggleSync())
  }
}
export default Sync
