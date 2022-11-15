import CONFIG from '../config.js';

window.addEventListener('load', () => {
  const notification = new Notification(CONFIG);
  window.addEventListener('message', (event) => {
    switch (event.data.type) {
      case 'SHOW': {
        const { message, key } = event.data.body;
        notification.show(message, key);
      }
        break;
      case 'HIDE':
        notification.hide();
        break;
      case 'UPDATE_TEXT': {
        const { message, key } = event.data.body;
        notification.setKey(key);
        notification.setText(message);
      }
    }
  });
});

class Notification {
  active = false;
  sound = null;
  container = null;
  main = null
  flexCont = null;
  key = null;
  text = null;
  duration = 1.5;
  easing = 'power4.inOut';
  colors ={
    r: '#ff0000',
    g: '#00ff00',
    b: '#0000ff',
    y: '#ffff00',
    p: '#ff00ff',
    c: '#00ffff',
    w: '#ffffff',
    o: '#ff7f00',
    s: '#ffffffcc'
  }

  constructor(config) {
    this.sound = document.getElementById('sound');
    this.container = document.querySelector('.container');
    this.main = document.querySelector('.ui-container');
    this.flexCont = document.querySelector('.data-flex');
    this.text = document.querySelector('.ui-text');
    this.key = document.querySelector('.ui-key');
    this.setup(config);
  }

  setup(config) {
    this.container.style.justifyContent = config.X;
    this.container.style.alignItems = config.Y;
    this.flexCont.style.backgroundColor = config.BG_COLOR;
    this.flexCont.style.borderRadius = `${config.BORDER_RADIUS}px`;
    this.flexCont.style.boxShadow = `0 0 12px 4px ${config.BOX_SHADOW}`;
    this.flexCont.style.margin = `${config.MARGIN}`;
    this.text.style.color = config.TEXT_COLOR;
    this.key.style.backgroundColor = config.KEY_BG_COLOR;
    this.key.style.color = config.KEY_COLOR;
    this.key.style.borderColor = config.KEY_BORDER_COLOR;
    this.duration = config.DURATION;
    this.easing = config.EASING;
    this.colors.w = config.TEXT_COLOR;
  }

  show(message, key) {
    if (this.active) {
      return;
    }
    this.setText(message);
    this.setKey(key)
    this.startAnimation();
  }

  hide() {
    if (!this.active) {
      return;
    }
    const position = this.getPosition();
    switch (position) {
      case 'fadeIn':
        gsap.fromTo(this.main, {
          opacity: 1,
        }, {
          opacity: 0,
          ease: this.easing,
          duration: this.duration,
          onComplete: () => {
            this.setKey('');
            this.setText('');
            this.active = false;
          }
        });
        break;
      case 'slideInLeft':
        gsap.fromTo(this.main, {
          x: 0,
          opacity: 1,
        }, {
          x: -300,
          opacity: 0,
          ease: this.easing,
          duration: this.duration,
          onComplete: () => {
            this.setKey('');
            this.setText('');
            this.active = false;
          }
        });
        break;
      case 'slideInRight':
        gsap.fromTo(this.main, {
          x: 0,
          opacity: 1,
        }, {
          x: 300,
          opacity: 0,
          ease: this.easing,
          duration: this.duration,
          onComplete: () => {
            this.setKey('');
            this.setText('');
            this.active = false;
          }
        });
        break;
      case 'slideInUp':
        gsap.fromTo(this.main, {
          y: 0,
          opacity: 1,
        }, {
          y: 300,
          opacity: 0,
          ease: this.easing,
          duration: this.duration,
          onComplete: () => {
            this.setKey('');
            this.setText('');
            this.active = false;
          }
        });
        break;
      case 'slideInDown':
        gsap.fromTo(this.main, {
          y: 0,
          opacity: 1,
        }, {
          y: -300,
          opacity: 0,
          ease: this.easing,
          duration: this.duration,
          onComplete: () => {
            this.setKey('');
            this.setText('');
            this.active = false;
          }
        });
        break;
    }
  }

  setKey(newKey) {
    this.key.textContent = newKey;
  }

  setText(newText) {
    let text = newText;
    // Check if text contains a span tag
    if (text.includes('<span')) {
      text = text.replace(/~r~/g, `<span style="color: ${this.colors.r}">`);
      text = text.replace(/~g~/g, `<span style="color: ${this.colors.g}">`);
      text = text.replace(/~b~/g, `<span style="color: ${this.colors.b}">`);
      text = text.replace(/~y~/g, `<span style="color: ${this.colors.y}">`);
      text = text.replace(/~p~/g, `<span style="color: ${this.colors.p}">`);
      text = text.replace(/~c~/g, `<span style="color: ${this.colors.c}">`);
      text = text.replace(/~w~/g, `<span style="color: ${this.colors.w}">`);
      text = text.replace(/~o~/g, `<span style="color: ${this.colors.o}">`);
      text = text.replace(/~s~/g, `<span style="color: ${this.colors.s}">`);
      text = text.replace(/~\/~/g, '</span>');
      this.text.innerHTML = text;
    } else {
      this.text.textContent = text;
    }
  }

  getPosition() {
    const x = this.container.style.justifyContent;
    const y = this.container.style.alignItems;
    if (x === 'center' && y === 'center') {
      return 'fadeIn';
    } else if (x === 'left') {
      return 'slideInLeft';
    } else if (x === 'right') {
      return 'slideInRight';
    } else if (x === 'center' && y === 'start') {
      return 'slideInDown';
    } else if (x === 'center' && y === 'end') {
      return 'slideInUp';
    }
  }

  startAnimation() {
    const position = this.getPosition();
    switch (position) {
      case 'fadeIn':
        gsap.fromTo(this.main, {
          opacity: 0,
        }, {
          opacity: 1,
          onComplete: () => {
            this.active = true;
          }
        });
        break;
      case 'slideInLeft':
        gsap.fromTo(this.main, {
          x: -300,
        }, {
          x: 0,
          opacity: 1,
          ease: this.easing,
          duration: this.duration,
          onComplete: () => {
            this.active = true;
          }
        });
        break;
      case 'slideInRight':
        gsap.fromTo(this.main, {
          x: 300,
        }, {
          x: 0,
          opacity: 1,
          ease: this.easing,
          duration: this.duration,
          onComplete: () => {
            this.active = true;
          }
        });
        break;
      case 'slideInDown':
        gsap.fromTo(this.main, {
          y: -300,
        }, {
          y: 0,
          opacity: 1,
          ease: this.easing,
          duration: this.duration,
          onComplete: () => {
            this.active = true;
          }
        });
        break;
      case 'slideInUp':
        gsap.fromTo(this.main, {
          y: 300,
        }, {
          y: 0,
          opacity: 1,
          ease: this.easing,
          duration: this.duration,
          onComplete: () => {
            this.active = true;
          }
        });
        break;
    }
  }

  debug(data) {
    if (!window.invokeNative) {
      this.setText(data.message);
      this.setKey(data.key);
      this.startAnimation();
    }
  }
}
