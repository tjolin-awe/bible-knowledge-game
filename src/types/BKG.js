export var BKG = {};

BKG.Sfx = {
	manage: function(type, mode, game, button, label) {
		switch(mode) {
			case 'init': {
        BKG.Storage.initUnset('BKG-'+type, true);
        BKG.Sfx.status = BKG.Sfx.status || [];
        BKG.Sfx.status[type] = BKG.Storage.get('BKG-'+type);

        console.log(type)
        if(type == 'sound') {
          BKG.Sfx.sounds = [];
          BKG.Sfx.sounds['click'] = game.sound.add('click');
        }
        else { // music
          if(!BKG.Sfx.music || !BKG.Sfx.music.isPlaying) {
            BKG.Sfx.music = [];
            BKG.Sfx.music['opening'] = game.sound.add('opening');
            BKG.Sfx.music['question-music'] = game.sound.add('question_music');
            BKG.Sfx.music['opening'].volume = 0.5;
          }
        }
				break;
			}
			case 'on': {
				BKG.Sfx.status[type] = true;
				break;
			}
			case 'off': {
				BKG.Sfx.status[type] = false;
				break;
			}
			case 'switch': {
				BKG.Sfx.status[type] =! BKG.Sfx.status[type];
				break;
			}
			default: {}
    }
    BKG.Sfx.update(type, button, label);

    if(type == 'music' && BKG.Sfx.music) {
      if(BKG.Sfx.status['music']) {
        if(!BKG.Sfx.music.isPlaying) {
          BKG.Sfx.music['opening'].play({loop:true});
        }
      }
      else {
        BKG.Sfx.music['opening'].stop();
      }
    }

    BKG.Storage.set('BKG-'+type, BKG.Sfx.status[type]);
	},
  stopMusic: function(audio){
    if(BKG.Sfx.status['music'] && BKG.Sfx.music && BKG.Sfx.music[audio].isPlaying) {
      BKG.Sfx.music[audio].stop()
    }
  },
  resume: function(audio){
    if(BKG.Sfx.status['music'] && BKG.Sfx.music && !BKG.Sfx.music[audio].isPlaying) {
      BKG.Sfx.music[audio].resume()
    }
  },
  playMusic: function(audio) {
   
      if(BKG.Sfx.status['music'] && BKG.Sfx.music && !BKG.Sfx.music[audio].isPlaying) {
        BKG.Sfx.music[audio].play({loop:true});
      }
    
  },
	play: function(audio) {
   
   
      if (BKG.Sfx.status['sound'] && BKG.Sfx.sounds && BKG.Sfx.sounds[audio]) {
        BKG.Sfx.sounds[audio].play();
      }
      
    
  },
  update: function(type, button, label) {
    if(button) {
      if(BKG.Sfx.status[type]) {
        button.setTexture('button-'+type+'-on');
      }
      else {
        button.setTexture('button-'+type+'-off');
      }
    }
    if(label) {
      if(BKG.Sfx.status[type]) {
        label.setText(BKG.Lang.text[BKG.Lang.current][type+'-on']);
      }
      else {
        label.setText(BKG.Lang.text[BKG.Lang.current][type+'-off']);
      }
    }
  }
};
BKG.fadeOutIn = function(passedCallback, context) {
  context.cameras.main.fadeOut(250);
  context.time.addEvent({
    delay: 250,
    callback: function() {
      context.cameras.main.fadeIn(250);
      passedCallback(context);
    },
    callbackScope: context
  });  
}
BKG.fadeOutScene = function(sceneName, context, data) {
  context.cameras.main.fadeOut(250);
  context.time.addEvent({
      delay: 250,
      callback: function() {
        context.scene.start(sceneName, data);
      },
      callbackScope: context
  });
};

export class Button extends Phaser.GameObjects.Image {
  constructor(x, y, texture, callback, scene, noframes) {
    super(scene, x, y, texture, 0);
    this.setInteractive({ useHandCursor: true });
    
    this.on('pointerup', function() {
      if(!noframes) {
        this.setFrame(1);
      }
    }, this);

    this.on('pointerdown', function() {
      if(!noframes) {
        this.setFrame(2);
      }
      callback.call(scene);
    }, this);

    this.on('pointerover', function() {
      if(!noframes) {
        this.setFrame(1);
      }
    }, this);

    this.on('pointerout', function() {
      if(!noframes) {
        this.setFrame(0);
      }
    }, this);

    scene.add.existing(this);
  }
};

BKG.Storage = {
	availability: function() {
		if(!(!(typeof(window.localStorage) === 'undefined'))) {
			console.log('localStorage not available');
			return null;
		}
	},
	get: function(key) {
		this.availability();
		try {
			return JSON.parse(localStorage.getItem(key));
		}
		catch(e) {
			return window.localStorage.getItem(key);
		}
	},
	set: function(key, value) {
		this.availability();
		try {
			window.localStorage.setItem(key, JSON.stringify(value));
		}
		catch(e) {
			if(e == QUOTA_EXCEEDED_ERR) {
				console.log('localStorage quota exceeded');
			}
		}
	},
	initUnset: function(key, value) {
		if(this.get(key) === null) {
			this.set(key, value);
		}
	},
	getFloat: function(key) {
		return parseFloat(this.get(key));
	},
	setHighscore: function(key, value) {
		if(value > this.getFloat(key)) {
			this.set(key, value);
		}
	},
	remove: function(key) {
		this.availability();
		window.localStorage.removeItem(key);
	},
	clear: function() {
		this.availability();
		window.localStorage.clear();
	}
};

BKG.Lang = {
  current: 'en',
  options: ['en', 'pl'],
  parseQueryString: function(query) {
    var vars = query.split('&');
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (typeof query_string[pair[0]] === 'undefined') {
        query_string[pair[0]] = decodeURIComponent(pair[1]);
      } else if (typeof query_string[pair[0]] === 'string') {
        var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
        query_string[pair[0]] = arr;
      } else {
        query_string[pair[0]].push(decodeURIComponent(pair[1]));
      }
    }
    return query_string;
  },
  updateLanguage: function(lang) {
    var query = window.location.search.substring(1);
    var qs = BKG.Lang.parseQueryString(query);
    if(qs && qs['lang']) {
      console.log('LANG: '+qs['lang']);
      BKG.Lang.current = qs['lang'];
    } else {
      if(lang) {
        BKG.Lang.current = lang;
      }
      else {
        BKG.Lang.current = navigator.language;
      }
    }
    if(BKG.Lang.options.indexOf(BKG.Lang.current) == -1) {
      BKG.Lang.current = 'en';
    }
  },
  text: {
    'en': {
      'FONT': 'Berlin',
      'GAMEFONT':'swiss921',
      'login-title': 'please enter your name',
      'settings': 'SETTINGS',
      'sound-on': 'Sound: ON',
      'sound-off': 'Sound: OFF',
      'music-on': 'Music: ON',
      'music-off': 'Music: OFF',
      'keyboard-info': 'Press K for keyboard shortcuts',
      'credits': 'CREDITS',
      'server':'Game Server',
      'server-address': 'Enter Server IP Address',
      'madeby': 'BKG made by',
      'team': 'THE TEAM',
      'coding': 'coding',
      'design': 'creator',
      'testing': 'testing',
      'musicby': 'Music Composed/Authored by',
      'key-title': 'KEYBOARD SHORTCUTS',
      'key-settings-title': 'Settings',
      'key-settings-onoff': 'S - show/hide settings',
      'key-audio': 'A - turn sound on/off',
      'key-music': 'M - turn music on/off',
      'key-credits': 'C - show/hide credits',
      'key-shortcuts': 'K - show/hide keyboard shortcuts',
      'key-menu': 'Main menu',
      'key-start': 'Enter - start game',
      'key-continue': 'Enter - continue',
      'key-gameplay': 'Gameplay',
      'key-button': 'Enter - activate CLICK ME button',
      'key-pause': 'P - turn pause screen on/off',
      'key-pause-title': 'Pause screen',
      'key-back': 'B - back to main menu',
      'key-return': 'P - return to the game',
      'key-gameover': 'Game over screen',
      'key-try': 'T - try again',
      'gameplay-score': 'Score: ',
      'gameplay-timeleft': 'Time left: ',
      'gameplay-paused': 'PAUSED',
      'gameplay-gameover': 'GAME OVER',
      'menu-highscore': 'Score: ',
      'screen-story-howto': 'Story / how to play\nscreen'
    },
    
  }
};

/* Usage tracking - remember to replace with your own!
var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.onload = function() {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-30485283-26');
}
script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-30485283-26';
head.appendChild(script);*/