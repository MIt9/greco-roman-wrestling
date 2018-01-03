Vue.component('competition', {
    props: ['item', 'isreverse'],
    template: '<div class="row timeline-element separline" v-bind:class="{reverse: isreverse}">' +
    '                 <div class="timeline-date-panel col-xs-12 col-md-6  " v-bind:class="{\'align-left\': isreverse, \'align-right\': !isreverse}">' +
    '                    <div class="time-line-date-content">' +
    '                        <p class="mbr-timeline-date mbr-fonts-style display-5">' +
    '                            {{item.startingDay}} - {{item.endingDay}}' +
    '                        </p>' +
    '                    </div>' +
    '                </div>' +
    '           <span class="iconBackground"></span>' +
    '            <div class="col-xs-12 col-md-6">' +
    '                <div class="timeline-text-content">' +
    '                    <h4 class="mbr-timeline-title pb-3 mbr-fonts-style display-5" v-bind:class="{\'align-left\': isreverse, \'align-right\': !isreverse}">' +
    '                        {{item.title}}' +
    '                    </h4>' +
    '<dl class="row">' +
    '  <dt class="col-sm-5">Місто</dt>' +
    '  <dd class="col-sm-7">{{item.city}}</dd>' +
    '  <dt class="col-sm-5">Команда</dt>' +
    '  <dd class="col-sm-7">{{item.participants}}</dd>' +
    '</dl>' +
    '                 </div>' +
    '            </div>' +
    '            </div>'
});
var local = new Vue({
    el: '#local',
    data: {
        competitions: []
    }
});
var national = new Vue({
    el: '#national',
    data: {
        competitions: []
    }
});
axios.get(window.location.href.replace('/index.html','') + '/assets/json/competiton.json')
    .then(function (response) {
        redirectResult(response.data);
    })
    .catch(function (error) {
        console.error(error);
    });

function redirectResult(_data) {
    var nationalArray = [];
    var localArray = [];
    var options ={ day: "numeric", month: "numeric"};
    var data = _data.sort(function (a, b) {
        return new Date(a.startingDay).getTime() - new Date(b.startingDay).getTime();
    });
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        item.startingDay = new Date(item.startingDay).toLocaleString('uk-Ua', options);
        item.endingDay = new Date(item.endingDay).toLocaleString('uk-Ua', options);
        if (item.type === 'local') {
            localArray.push(item);
        } else {
            nationalArray.push(item);
        }
    }
    national.competitions = nationalArray;
    local.competitions = localArray;
}