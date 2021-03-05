import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  model : any = {};
  command :any = {PLACE : 'PLACE',MOVE:'MOVE',LEFT : 'LEFT',RIGHT : 'RIGHT',REPORT:'REPORT'};
  direction : any ={NORTH:'NORTH',SOUTH: 'SOUTH',EAST : 'EAST',WEST : 'WEST'};
  max_position :any =  {	'X': 4, 'Y': 4 };
  robotMovement : any;
  rows : any = [0,1,2,3,4];
  coloumns : any = [0,1,2,3,4];

  constructor() {
    this.model.start = false;
  }

  execute(){
    
    if (this.model.command) {

			let commandArray = this.model.command.split(' ');
			if (this.model.start || commandArray[0].toUpperCase() == this.command.PLACE) {
				this.run(commandArray);
        

			} else {
				this.model.message = 'The initial command must be PLACE command.\n';
			}
			
		} else {
			this.model.message += 'The command is empty, please try again.\n';
		}
  }
  getValue(event){
    this.model.command = event.target.value;
  }
  run(commandArray){
    switch(commandArray[0].toUpperCase()) {
			case this.command.PLACE:
			let placeCommand = commandArray.join(' ');
      console.log(placeCommand);
      let regex = /^PLACE\s+([0-4]),([0-4]),(NORTH|SOUTH|EAST|WEST)$/i;
			if (regex.test(placeCommand)) {
				let matches = regex.exec(placeCommand);
				this.place(matches[1], matches[2], matches[3]);
			} else {
				this.model.message = 'The PLACE command is invalid, please try again.\n';
			}
			break;

			case this.command.MOVE:
			 this.move();
			break;

			case this.command.LEFT:
			  this.rotate(this.command.LEFT);
			break;

			case this.command.RIGHT:
        this.rotate(this.command.RIGHT);
			break;

			case this.command.REPORT:
        this.report();
			break;

			default:
        this.model.message = 'The command is invalid, please try again.\n';
			break;
		}
  }
  checkPosition(x,y){
    if (x >= 0 && x <= this.max_position.X && y >= 0 && y <= this.max_position.Y) {
			return true;
		} else {
			this.model.message = 'The robot is out of range.\n';
			return false;
		}
  }
  place(x,y,facing){
    this.robotMovement = {
      x : x,
      y : y,
      facing : facing
    }
    this.model.message = 'The PLACE command is executed successfully.\n';
    this.model.start = true;
  }
  move(){
    switch(this.robotMovement.facing) {
      case this.direction.NORTH:
      let north = Number(this.robotMovement.y) + 1;
      if (this.checkPosition(this.robotMovement.x, north)) {
        this.robotMovement.y = north;
        break;
      } else {
        return;
      }				
      case this.direction.SOUTH:
      let south = Number(this.robotMovement.y) - 1;
      if (this.checkPosition(this.robotMovement.x, south)) {
        this.robotMovement.y = south;
        break;
      } else {
        return;
      }
      case this.direction.EAST:
      let east = Number(this.robotMovement.x) + 1;
      if (this.checkPosition(east, this.robotMovement.y)) {
        this.robotMovement.x = east;
        break;
      } else {
        return;
      }
      case this.direction.WEST:
      let west = Number(this.robotMovement.x) - 1;
      if (this.checkPosition(west, this.robotMovement.y)) {
        this.robotMovement.x = west;
        break;
      } else {
        return;
      }
      default:
      break;

    }
    this.model.message = 'The MOVE command is executed successfully.\n';
  }
  rotate(direction){
    if (direction === this.command.LEFT) {
      switch (this.robotMovement.facing) {
        case this.direction.NORTH:
          this.robotMovement.facing = this.direction.WEST;
        break;
        case this.direction.SOUTH:
          this.robotMovement.facing = this.direction.EAST;
        break;
        case this.direction.EAST:
          this.robotMovement.facing = this.direction.NORTH;
        break;
        case this.direction.WEST:
          this.robotMovement.facing = this.direction.SOUTH;
        break;
        default:
        break;
      }
    } else if (direction === this.command.LEFT) {
      switch (this.robotMovement.facing) {
        case this.direction.NORTH:
          this.robotMovement.facing = this.direction.EAST;
        break;
        case this.direction.SOUTH:
          this.robotMovement.facing =this.direction.WEST;
        break;
        case this.direction.EAST:
          this.robotMovement.facing = this.direction.SOUTH;
        break;
        case this.direction.WEST:
          this.robotMovement.facing = this.direction.NORTH;
        break;
        default:
        break;
      }
    }
    this.model.message = 'The ' + direction + ' command is executed successfully.\n';
  }

  report(){
    this.model.message = 'Output: ' + this.robotMovement.x + ', ' + this.robotMovement.y + ', ' + this.robotMovement.facing + '\n';
  }

}
