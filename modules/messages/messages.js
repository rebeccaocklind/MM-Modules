Module.register('messages', {
    defaults: {
      //title: 'Meddelanden:',
      entries: [],
      firebaseConfig: {
        apiKey: 'AIzaSyA8KMyz4QmdFZiPp52LbNXNnXCaB4uLsKQ',
        authDomain: 'magicmirror-383ed.firebaseapp.com',
        databaseURL: 'https://magicmirror-383ed.firebaseio.com',
        projectId: 'magicmirror-383ed',
        storageBucket: 'magicmirror-383ed.appspot.com',
        messagingSenderId: '583861133769'
      }
    },
  
    getScripts: function() {
      return ['firebase.js'];
    },
  
    getDom: function() {
      var wrapper = document.createElement('div');
      //wrapper.innerHTML = this.config.title;
      this.config.entries.forEach(entry => {
        var text = document.createElement('p');
        text.innerHTML = entry;
        wrapper.appendChild(text);
      });
      return wrapper;
    },
  
    start: function() {
      Log.info('starting');
      firebase.initializeApp(this.config.firebaseConfig);
      var ref = firebase.database().ref('messages/');
      
      ref.on('value', snapshot => {
        this.config.entries = [];
        var keys = Object.keys(snapshot.val());
        Log.info(keys);
        if(keys.length > 5){
          keys.splice(keys.length-5, keys.length).map(key => {
          this.config.entries.push(snapshot.val()[key].msg);
        });
        }else {
          keys.map(key => {
            this.config.entries.push(snapshot.val()[key].msg);
          });
        }
        
        this.updateDom();
      });
    }
  });