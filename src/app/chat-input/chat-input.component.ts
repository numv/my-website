import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent  {

  stopWhenNotFocused = false

  chatinput = '.'
  period = 2500
  audio = new Audio()

  @Input() input = '.';
  @Output() written = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.audio.src = "../assets/typing.mp3"
    this.audio.load();
    this.audio.volume = 0.5;
    this.audio.loop = true;
    this.writeTick();
  }

  writeTick(){
    if(this.stopWhenNotFocused && !document.hasFocus())
    {
      this.audio.pause();
      setTimeout(() => {
        this.writeTick();
      }, 500);
      return;
    }

    if(this.input == this.chatinput)
    {
      this.chatinput = "";
      this.written.emit(true);
      return;
    }

    var delta = 200 - Math.random() * 100;
    var fullText = this.input
    this.chatinput = fullText.substring(0, this.chatinput.length+1)
    if(this.chatinput === fullText)
    {
      delta = this.period;
      this.audio.pause();
    }
    else{
      this.audio.play();
    }

    setTimeout(() => {
      this.writeTick();
    }, delta);
  }
}

