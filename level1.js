import Player from './player.js';
import Enemies from './enemies.js';
import UI from './ui.js';
import Platforms from './plataforms.js';
import Scenes from './scenes.js';

export default class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level1' });
        this.isPaused = false;
        this.ui = null;
    }

    preload() {
        // Fondo y salida del nivel
        this.load.image('background1', './Lv1_Big.png');  // Verifica que la imagen esté en la raíz
        this.load.image('exit1', './Portal Lv1.png');     // Verifica que la imagen esté en la raíz

        // UI (botones)
        this.load.spritesheet('heart', './heart_hurt.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('pause_normal', './PauseNormal.png');
        this.load.image('pause_hover', './PauseHover.png');
        this.load.image('pause_focus', './PauseFocus.png');

        this.load.image('restart_normal', './ReplayNormal.png');
        this.load.image('restart_hover', './ReplayHover.png');
        this.load.image('restart_focus', './ReplayFocus.png');

        this.load.image('menu_normal', './MenuNormal.png');
        this.load.image('menu_hover', './MenuHover.png');
        this.load.image('menu_focus', './MenuFocus.png');

        this.load.image('exit_normal', './LeaveNormal.png');
        this.load.image('exit_hover', './LeaveHover.png');
        this.load.image('exit_focus', './LeaveFocus.png');

        // Plataformas
        this.load.image('lv1_p1', './lv1_p1.png');
        this.load.image('lv1_p2', './lv1_p2.png');
        this.load.image('lv1_p3', './lv1_p3.png');
        this.load.image('lv1_p4', './lv1_p4.png');
        this.load.image('lv1_p5', './lv1_p5.png');
        this.load.image('lv1_p6', './lv1_p6.png');
        this.load.image('lv1_p7', './lv1_p7.png');
        this.load.image('lv1_p8', './lv1_p8.png');
        this.load.image('lv1_p9', './lv1_p9.png');
        this.load.image('lv1_p10', './lv1_p10.png');
        this.load.image('lv1_p11', './lv1_p11.png');
        this.load.image('lv1_p12', './lv1_p12.png');
        this.load.image('lv1_p13', './lv1_p13.png');
        this.load.image('lv1_p14', './lv1_p14.png');
        this.load.image('lv1_p15', './lv1_p15.png');
        this.load.image('lv1_p16', './lv1_p16.png');
        this.load.image('lv1_p17', './lv1_p17.png');
        this.load.image('lv1_p18', './lv1_p18.png');
        this.load.image('lv1_p19', './lv1_p19.png');
        this.load.image('lv1_p20', './lv1_p20.png');
        this.load.image('lv1_p21', './lv1_p21.png');
        this.load.image('lv1_p22', './lv1_p22.png');
        this.load.image('lv1_p23', './lv1_p23.png');
        this.load.image('lv1_p24', './lv1_p24.png');
        this.load.image('lv1_pl1', './lv1_pl1.png');
        this.load.image('lv1_pl2', './lv1_pl2.png');

        // Militar
        this.load.spritesheet('mili_right', 'Mili_Right.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('mili_left', 'Mili_left.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('mili_idle', './Mili_idle.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('mili_attack', './Mili_ataque.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('mili_death', './Mili_oof.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('mili_bullet_sprite', './Mili_bullet.png', { frameWidth: 110, frameHeight: 110 });
    }

    create() {
        this.music = this.sound.add('Levels_Music', { loop: true, volume: 0.5 });
        this.music.play();

        // Fondo
        this.background = this.add.image(0, 0, 'background1').setOrigin(-0.1, 0.16).setScale(0.5);
        this.background.setScrollFactor(1);
        this.background.setDepth(-1);
    
        // Plataformas
        this.platforms = new Platforms(this);
        this.platforms.createPlatforms(1);

        // UI
        this.ui = new UI(this);
        this.ui.create();
    
        // Crear el jugador
        this.player = new Player(this, this.ui);
        this.player.player.setVisible(true);

        this.enemies = []; // Array para almacenar enemigos
        this.generateScientificEnemies(5); // 4 enemigos (ajusta el número si quieres)
    
        // Colisiones
        this.physics.add.collider(this.player.player, this.platforms.plataforms);
        this.enemies.forEach(enemyGroup => {
            this.physics.add.collider(enemyGroup.enemies, this.platforms.plataforms);
        });
    
        // Hacer que la cámara siga al jugador
        this.cameras.main.startFollow(this.player.player);
        this.cameras.main.setZoom(2.5);
    
        // Limitar la cámara al tamaño del mapa
        // Puedes obtener el tamaño del mapa según el tilemap, por ejemplo, o las dimensiones que definas.
        const mapaAncho = 650;  // Cambia según el tamaño de tu mapa
        const mapaAlto = 3500;   // Cambia según el tamaño de tu mapa
    
        // Salida del nivel al llegar a un lugar
        this.exitZone = this.physics.add.staticSprite(367, 40, 'exit1').setScale(0.16);
        this.exitZone.setSize(30, 30);  // Ajuste de tamaño de colisión
        this.exitZone.setOffset(120, 110);    // Ajuste de la zona de colisión
        this.physics.add.overlap(this.player.player, this.exitZone, () => {
            this.player.walkSound.stop();
            this.music.stop();
            this.scene.start('Scenes', { videoKey: 'Recuerdos_1', nextLevel: 'Level2' });
        });
    
        // Controles
        this.keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.resumeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // Evento de pausa
        this.input.keyboard.on('keydown-P', () => this.togglePause(), this); // Pausar con P
    }

    update() {
        // Actualizar el jugador
        if (this.player) this.player.update();
    
        // Limitar el movimiento del jugador dentro de los límites
        const mapaAncho = 650;  // Cambia según el tamaño de tu mapa
        const mapaAlto = 3500;   // Cambia según el tamaño de tu mapa

        // Limitar el movimiento del jugador
        this.player.player.x = Phaser.Math.Clamp(this.player.player.x, 240, mapaAncho);
        this.player.player.y = Phaser.Math.Clamp(this.player.player.y, 0, mapaAlto);
    
        // Actualizar enemigos
        this.enemies.forEach(enemy => {
            if (enemy.update) { // Verifica si el enemigo tiene el método update()
                enemy.update();
            }
    
            // Limitar la posición de los enemigos dentro de los límites del mapa
            enemy.enemies.children.iterate(child => {
                child.x = Phaser.Math.Clamp(child.x, 240, mapaAncho);
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
                    'militar',
                    pos.x,
                    pos.y
                );
                this.enemies.push(enemy);
            });
        }   
    
        restartGame() {
            this.music.stop();
            this.scene.restart();
            console.log('Juego reiniciado');
        }
    
        goToMenu() {
            this.music.stop();
            this.scene.stop();
            console.log('Volver al menú');
            this.scene.start('MainMenu');
        }
    
        exitGame() {
            window.close();
        }
    }
