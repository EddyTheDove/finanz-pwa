// eslint-disable-next-line
import tz from 'moment-timezone'

export default {
    install: function (Vue) {
        Vue.prototype.$helpr = {
            timezone () {
                return window.moment.tz.guess()
            }
        }
    }
}
