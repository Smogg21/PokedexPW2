import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-poke-run',
  standalone: true,
  imports: [],
  templateUrl: './poke-run.component.html',
  styleUrl: './poke-run.component.css'
})
export class PokeRunComponent implements OnInit { 
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private player!: { x: number, y: number, width: number, height: number, dy: number };
  private gravity: number;
  private obstacles: { x: number, y: number, width: number, height: number, speed: number }[];;
  private obstacleInterval: number;
  private isJumping: boolean;
   isGameOver: boolean;
   isGameStarted: boolean;
   score: number;
   startTime!: number;
   elapsedTime: number;
   private obstacleSpeed: number;
   hasWon: boolean;
   private playerImage: HTMLImageElement = new Image();
  private obstacleImage: HTMLImageElement = new Image();

  constructor() {
    this.gravity = 0.5;
    this.obstacles = [];
    this.obstacleInterval = 0;
    this.isJumping = false;
	this.isGameOver = false;
	this.isGameStarted = false;
	this.player = { x: 50, y: 0, width: 50, height: 50, dy: 0 };
	this.score = 0;
	this.elapsedTime = 0;
	this.obstacleSpeed = 2;
	 this.hasWon = false;
  }

  ngOnInit(): void {
	this.playerImage.src = '../../assets/images/filter.png';
    this.obstacleImage.src = '../../assets/images/filter.png';
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space' && !this.isJumping && !this.isGameOver) {
      this.player.dy = -15;
      this.isJumping = true;
    }
  }

  startGame() {
    this.isGameStarted = true;
    this.isGameOver = false;
    this.obstacles = [];
    this.obstacleInterval = 0;
	this.score = 0;
	this.elapsedTime = 0;
    this.startTime = Date.now(); 
	this.obstacleSpeed = 2;
	 this.hasWon = false;

	setTimeout(() => {
		this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
		this.ctx = this.canvas.getContext('2d')!;
		this.player = { x: 50, y: this.canvas.height - 50, width: 50, height: 50, dy: 0 };
		this.gameLoop();
	}, 0);
	
  }

  gameLoop() {
    if (this.isGameOver || this.hasWon) {
      this.showGameOver();
      return;
    }

    this.update();
    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    this.player.y += this.player.dy;
    this.player.dy += this.gravity;

    if (this.player.y + this.player.height > this.canvas.height) {
      this.player.y = this.canvas.height - this.player.height;
      this.isJumping = false;
    }

    this.obstacleInterval++;
    if (this.obstacleInterval > 100) {
	  let obstacleSpeed = this.obstacleSpeed + this.elapsedTime * 0.05; 
	
      this.obstacles.push({ x: this.canvas.width, y: this.canvas.height - 50, width: 20, height: 50, speed: obstacleSpeed });
      this.obstacleInterval = 0;
    }

    this.obstacles.forEach(obstacle => {
      obstacle.x -= obstacle.speed;
	  if (this.checkCollision(this.player, obstacle)) {
        this.isGameOver = true;
      }
    });

    this.obstacles = this.obstacles.filter(obstacle => {
      if (obstacle.x + obstacle.width > 0) {
        return true;
      } else {
        this.score++;
        return false;
      }
    });

	this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);

	if (this.score >= 10) {
      this.isGameOver = true;
      this.hasWon = true;
    }
  }

   checkCollision(player: { x: number, y: number, width: number, height: number }, 
                 obstacle: { x: number, y: number, width: number, height: number }): boolean {
    return (
      player.x < obstacle.x + obstacle.width &&
      player.x + player.width > obstacle.x &&
      player.y < obstacle.y + obstacle.height &&
      player.y + player.height > obstacle.y
    );
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.drawImage(this.playerImage, this.player.x, this.player.y, this.player.width, this.player.height);

	this.obstacles.forEach(obstacle => {
		this.ctx.drawImage(this.obstacleImage, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
	});

	this.ctx.fillStyle = 'black';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 10, 20);

	this.ctx.fillText(`Tiempo: ${this.elapsedTime}s`, this.canvas.width - 100, 20);
  }

   showGameOver() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'black';
    this.ctx.font = '30px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Game Over', this.canvas.width / 2, this.canvas.height / 2);
	this.ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 40);
  }
}
