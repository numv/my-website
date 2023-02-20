import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatInputComponent } from '../chat-input/chat-input.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  ngOnInit(): void {
    this.audio.load();
    this.audio.onended = (ev) => { this.onSongFinished() };
  }

  onSongFinished() {
    this.loopNum = 0
    this.phrases = [
      `you listend for ${this.audio.currentTime} seconds`,
      "and you kinda reached the end",
      "i don't have anything planned after this yet",
      "soo i will now leave you with my most visited website",
      "here we go 💻"
    ]
    this.chatInput.writeTick();
  }


  @ViewChild(ChatInputComponent)
  private chatInput!: ChatInputComponent;

  phrases = [
    "🐈 meow",
    "Oh, Hello there 👋.",
    "How did you stumble onto this random site?",
    "i see.. you should be more careful",
    "you never know where you might end up",
    "and this is probably the wrong site.",
    "oh well.. seems you are not leaving",
    "do you want me to introduce myself?",
    "let me first turn on some music🎵", 
    "i used the emoji as a trigger for the music",
    "thought i might let you know",
    "Yes, I am a developer..", 
    "I love to design", 
    "and i love to be creative", 
    "i have done most my work with c# .net",
    "but this site is done in angular",
    "i don't mind the language",
    "i only care about a nice typing experience ⌨️",
    "it is a corne with choc switches",
    "since you are still here",
    "if you want to write me something",
    "send me an email: hello@numv.xyz",
    "but for now i will let you enjoy the music",
  ]

  chathistory : Array<string> =[]

  loopNum = 0
  audio = new Audio("../assets/Lazy-Afternoon.mp3");

  onWritten(done: boolean)
  {
    if(!done) return;

    if(!this.chatInput.input.startsWith("🐈"))
      this.chathistory.push(this.chatInput.input);

    if(this.chatInput.input.endsWith("🎵"))
    {
      this.chathistory.push(
        "<small class='cc'>Lazy Afternoon by Purrple Cat <br>| https://purrplecat.com/ Music promoted by https://www.chosic.com/free-music/all/ <br>Creative Commons CC BY-SA 3.0 https://creativecommons.org/licenses/by-sa/3.0/</small>"
      );
      this.audio.play();
    }

    if(this.chatInput.input.endsWith("⌨️"))
    {
      this.chathistory.push(
        "<img src='../assets/keyboard.jpg' width='450px'/>"
      );
    }

    if(this.chatInput.input.endsWith("💻"))
    {
      document.location="https://google.com"
    }

    if(this.loopNum >= this.phrases.length-1)
      return;

    this.loopNum++;
    var i = this.loopNum % this.phrases.length;
    this.chatInput.input = this.phrases[i]
    this.chatInput.writeTick();
  }
}
