import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameTwoUnit, GameTwoUnitState } from '../../shared-model/classes';

@Component({
  selector: 'app-typer-replay',
  templateUrl: './typer-replay.component.html',
  styleUrls: ['./typer-replay.component.scss']
})
export class TyperReplayComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.typerText = data.typerText;
    this.replayData = data.trailList;
  }
  
  replayData: number[] = [];
  bestScore: number;
  typerText: string;
  replayIndex: number = 0;
  hasStartedTyping: boolean = false;
  gameTwoUnits: GameTwoUnit[] = [];
  index: number = 0;

  trackByItems(index: number, item: GameTwoUnit): number { return item.state; }

  ngOnInit(): void {
    this.createTyper(this.typerText);
    console.log(this.data);
  }

  createTyper(data: string) {
    let arr = data.split("");
    for (let i = 0; i < arr.length; i++) {
      let unit = new GameTwoUnit();
      unit.val = arr[i];
      i == 0 ? unit.state = GameTwoUnitState.blink : GameTwoUnitState.undone;
      this.gameTwoUnits.push(unit);
    }
    if(this.data.length!=0){
    setTimeout(()=>this.startReplay(),2000);
    }
    else{}
  }

  startReplay() {
    let e = this.data[this.replayIndex];
    let intervalId = setInterval(() => {
     this.gameTwoUnits[this.replayIndex].state = GameTwoUnitState.done;
     this.replayIndex++;
     this.gameTwoUnits[this.replayIndex].state = GameTwoUnitState.blink;
      clearInterval(intervalId);
      if (this.replayIndex < this.data.length)
      this.startReplay();
    }, e);
  }
}