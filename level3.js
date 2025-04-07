import Player from '../player.js';
import Enemies from '../enemies.js';
import UI from '../ui.js';
import Platforms from '../plataforms.js';
import Scenes from './scenes.js';

export default class level3 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level3' });
    }

    preload() {
    this.load.image('background3', 'BG_lv3_2.png');

    this.load.spritesheet('heart', 'heart_hurt.png', { frameWidth: 16, frameHeight: 16 });
    this.load.image('pause_normal', 'PauseNormal.png');
    this.load.image('pause_hover', 'PauseHover.png');
    this.load.image('pause_focus', 'PauseFocus.png');

    this.load.image('restart_normal', 'ReplayNormal.png');
    this.load.image('restart_hover', 'ReplayHover.png');
    this.load.image('restart_focus', 'ReplayFocus.png');

    this.load.image('menu_normal', 'MenuNormal.png');
    this.load.image('menu_hover', 'MenuHover.png');
    this.load.image('menu_focus', 'MenuFocus.png');

    this.load.image('exit_normal', 'LeaveNormal.png');
    this.load.image('exit_hover', 'LeaveHover.png');
    this.load.image('exit_focus', 'LeaveFocus.png');

    // Plataformas
    this.load.image('lv3_p1', 'lv3_p1.png');
    this.load.image('lv3_p2', 'lv3_p2.png');
    this.load.image('lv3_p3', 'lv3_p3.png');
    this.load.image('lv3_p4', 'lv3_p4.png');
    this.load.image('lv3_p5', 'lv3_p5.png');
    this.load.image('lv3_p6', 'lv3_p6.png');
    this.load.image('lv3_p7', 'lv3_p7.png');
    this.load.image('lv3_p8', 'lv3_p8.png');
    this.load.image('lv3_p9', 'lv3_p9.png');
    this.load.image('lv3_p10', 'lv3_p10.png');
    this.load.image('lv3_p11', 'lv3_p11.png');
    this.load.image('lv3_p12', 'lv3_p12.png');
    this.load.image('lv3_p13', 'lv3_p13.png');
    this.load.image('lv3_p14', 'lv3_p14.png');
    this.load.image('lv3_p15', 'lv3_p15.png');
    // this.load.image('lv3_p16', 'lv3_p16.png'); 

    this.load.image('exit3', 'Portal Lv3.png');
}
    
    create() {
        this.music = this.sound.add('Levels_Music', { loop: true, volume: 0.5 });
        this.music.play();

        // Fondo
        this.background = this.add.image(0, 0 , 'background3').setOrigin(0.1 , 0.16).setScale(0.1);
        this.background.setScrollFactor(1);
        this.background.setDepth(-1); // Asegura que esté detrás de los demás elementos
                    
        // Plataformas
        this.platforms = new Platforms(this);
        this.platforms.createPlatforms(3);

        // UI
        this.ui = new UI(this);
        this.ui.create();

        // Crear el jugador
        this.player = new Player(this, this.ui);
        this.player.player.setVisible(true);
        
        this.enemies = []; // Array para almacenar enemigos
        this.generateScientificEnemies(5); // 4 enemigos (ajusta el número si quieres)
        this.generateMilitaryEnemies(5); // Generar enemigos militares
        
        // Colisiones
        this.physics.add.collider(this.player.player, this.platforms.plataforms);
        this.enemies.forEach(enemyGroup => {
            this.physics.add.collider(enemyGroup.enemies, this.platforms.plataforms);
        });
    
        // Hacer que la cámara siga al jugador
        this.cameras.main.startFollow(this.player.player);
        this.cameras.main.setZoom(2.5); // Ajusta el valor según lo que necesites
    
        // Limitar la cámara al tamaño del mapa
        // Puedes obtener el tamaño del mapa según el tilemap, por ejemplo, o las dimensiones que definas.
        const mapaAncho = 440;  // Cambia según el tamaño de tu mapa
        const mapaAlto = 9000;   // Cambia según el tamaño de tu mapa
        
        // Salida del nivel al llegar a un lugar
        this.exitZone = this.physics.add.staticSprite(370, 30, 'exit3').setScale(0.1);
        this.exitZone.setSize(30, 30);  // Ajuste de tamaño de colisión
        this.exitZone.setOffset(120, 110);    // Ajuste de la zona de colisión
        this.physics.add.overlap(this.player.player, this.exitZone, () => {
            this.player.walkSound.stop();
            this.music.stop();
            this.scene.start('Scenes', { videoKey: 'final_scene', nextLevel: 'MainMenu' });
        });
    
        // Tecla T para hacer daño
        this.keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

        // Tecla P para pausar el juego
        this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        // Configuración de teclado para pausar y reanudar
        this.input.keyboard.on('keydown-P', () => this.pauseGame(), this); // Pausar con P
        this.input.keyboard.on('keydown-R', () => this.resumeGame(), this); // Reanudar con R
    }
    
    
    update() {
        // Actualizar el jugador
        if (this.player) this.player.update();
    
        // Limitar el movimiento del jugador dentro de los límites
        const mapaAncho = 440;  // Cambia según el tamaño de tu mapa
        const mapaAlto = 9000;   // Cambia según el tamaño de tu mapa
    
        // Limitar el movimiento del jugador
        this.player.player.x = Phaser.Math.Clamp(this.player.player.x, 120, mapaAncho);
        this.player.player.y = Phaser.Math.Clamp(this.player.player.y, 0, mapaAlto);
    
        // Actualizar enemigos
        this.enemies.forEach(enemy => {
            if (enemy.update) { // Verifica si el enemigo tiene el método update()
                enemy.update();
            }
    
            // Limitar la posición de los enemigos dentro de los límites del mapa
            enemy.enemies.children.iterate(child => {
                child.x = Phaser.Math.Clamp(child.x, 120, mapaAncho);
                child.y = Phaser.Math.Clamp(child.y, 0, mapaAlto);
            });
        });
    
        // Actualizar UI
        if (this.ui) this.ui.updateHearts(this.player.lives);
    
        // Verificar si la tecla T se presiona
        if (Phaser.Input.Keyboard.JustDown(this.keyT)) {
            console.log("Tecla T presionada");
            this.player.takeDamage(); // Se usa 'this.player' en lugar de 'player'
        }
        // Detectar cuando se presiona la tecla 'P' para alternar el estado de pausa
        if (Phaser.Input.Keyboard.JustDown(this.pauseKey)) {
            if (this.isPaused) {
                this.resumeGame();  // Reanudar el juego si está pausado
            } else {
                this.pauseGame();  // Pausar el juego si no está pausado
            }
        }

        if (!this.isPaused) {
            // Solo se actualiza cuando el juego no está pausado
            this.player.update();

            // Actualizar enemigos
            this.enemies.forEach(enemy => {
                if (enemy.update) { // Verifica si el enemigo tiene el método update()
                    enemy.update();
                }
            });
            this.ui.updateHearts(this.player.lives);
        }
    }

    generateScientificEnemies() {
            const enemyPositions = [
                {x: 350, y: 470},  // Sobre lv2_p1
                {x: 540, y: 370},  // Sobre lv2_p9
                {x: 370, y: 210},  // Sobre lv2_p14
                {x: 590, y: 40},    // Sobre lv2_p24
                {x: 10, y: 10}    // Sobre lv2_p24
            ];
        
            enemyPositions.forEach(pos => {
                const enemy = new Enemies(
                    this,
                    this.player,
                    'cientifico',
                    pos.x,
                    pos.y
                );
                this.enemies.push(enemy);
            });
    }

    // Generar enemigos militares
    generateMilitaryEnemies(quantity) {
        const enemyPositions = [
            {x: 200, y: 500},
            {x: 600, y: 350},
            {x: 450, y: 220},
            {x: 700, y: 100},
            {x: 50, y: 50}
        ];

        for (let i = 0; i < quantity; i++) {
            const pos = enemyPositions[i % enemyPositions.length];
            const enemy = new Enemies(this, this.player, 'militar', pos.x, pos.y);
            this.enemies.push(enemy);
        }
    }

    restartGame() {
        this.scene.restart();
        console.log('Juego reiniciado');
    }

    goToMenu() {
        if (this.music) {
            this.music.stop();
        }
        this.scene.stop();
        console.log('Volver al menú');
        this.scene.start('MainMenu');
    }
    

    exitGame() {
        window.close();
    }
}
