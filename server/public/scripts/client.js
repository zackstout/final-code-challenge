
var app = angular.module('app', []);

app.controller("MessageController", function($http) {
  console.log('controller created w00t');
  var vm = this;
  vm.newMessage = {};
  vm.messages = [];
  getMessages();

  vm.addMessage = function(msg) {
    $http.post('/messages', msg).then(function(response) {
      console.log('well done!');
      getMessages();
    }).catch(function(err) {
      console.log('whoops');
    });
  };

  function getMessages() {
    $http.get('/messages').then(function(response) {
      console.log(response.data);
      vm.messages = response.data;
    }).catch(function(err) {
      console.log('nuts');
    });
  }

});
