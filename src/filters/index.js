import Vue from 'vue'

Vue.filter('currency', function (value = 0) {
    // value = value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
    value = parseFloat(value).toFixed(2)
    return '$' + value
})

Vue.filter('number', function (value) {
    value = parseInt(value)
    return value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
})

Vue.filter('date', function (date) {
    return window.moment(date).format('DD/MM/YYYY')
})

Vue.filter('time', function (date) {
    return window.moment(date).format('DD MMM YYYY HH:mm')
})
