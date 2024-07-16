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
  private obstacles: { x: number, y: number, width: number, height: number, speed: number }[];
  private obstacleSpawnInterval: number;
  private isJumping: boolean;
  public isGameOver: boolean;
  public isGameStarted: boolean;
  public score: number;
  private startTime!: number;
  public elapsedTime: number;
  private obstacleSpeed: number;
  private initialObstacleSpeed: number;
  private obstacleAcceleration: number;
  private minObstacleGap: number;
  private maxObstacleGap: number;

  constructor() {
    this.gravity = 0.5;
    this.obstacles = [];
    this.obstacleSpawnInterval = 0;
    this.isJumping = false;
    this.isGameOver = false;
    this.isGameStarted = false;
    this.player = { x: 50, y: 0, width: 50, height: 50, dy: 0 };
    this.score = 0;
    this.elapsedTime = 0;
    this.obstacleSpeed = 2;
    this.initialObstacleSpeed = 2;
    this.obstacleAcceleration = 0.1;
    this.minObstacleGap = 80;
    this.maxObstacleGap = 100;
  }

  ngOnInit(): void {}

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
    this.obstacleSpawnInterval = 0;
    this.score = 0;
    this.elapsedTime = 0;
    this.startTime = Date.now();
    this.obstacleSpeed = this.initialObstacleSpeed;

    setTimeout(() => {
      this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
      this.ctx = this.canvas.getContext('2d')!;
      this.player = { x: 50, y: this.canvas.height - 50, width: 50, height: 50, dy: 0 };
      this.gameLoop();
    }, 0);
  }

  gameLoop() {
    if (this.isGameOver) {
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

    this.obstacleSpawnInterval++;
    if (this.obstacleSpawnInterval > this.calculateObstacleInterval()) {
      let obstacleSpeed = this.initialObstacleSpeed + this.obstacleAcceleration * this.elapsedTime;
      this.obstacles.push({ x: this.canvas.width, y: this.canvas.height - 50, width: 20, height: 50, speed: obstacleSpeed });
      this.obstacleSpawnInterval = 0;
    }

    this.obstacles.forEach(obstacle => {
      obstacle.x -= obstacle.speed;
      if (this.checkCollision(this.player, obstacle)) {
        this.isGameOver = true;
      }
    });

    this.obstacles = this.obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);

    this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
  }

  calculateObstacleInterval(): number {
    let minGap = this.minObstacleGap;
    let maxGap = this.maxObstacleGap;
    let progress = this.elapsedTime / 10; // Ajustar este valor según la velocidad deseada de incremento
    let gap = maxGap - (maxGap - minGap) * Math.exp(-progress);
    return Math.floor(gap);
  }

  checkCollision(
    player: { x: number; y: number; width: number; height: number },
    obstacle: { x: number; y: number; width: number; height: number }
  ): boolean {
    return (
      player.x < obstacle.x + obstacle.width &&
      player.x + player.width > obstacle.x &&
      player.y < obstacle.y + obstacle.height &&
      player.y + player.height > obstacle.y
    );
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);

    this.ctx.fillStyle = 'red';
    this.obstacles.forEach(obstacle => {
      this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    this.ctx.fillStyle = 'black';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 10, 20);

    this.ctx.fillText(`Time: ${this.elapsedTime}s`, this.canvas.width - 100, 20);
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
