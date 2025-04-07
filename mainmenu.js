class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
    this.load.audio('bgMusic', 'Cueva cute.ogg'); // Música de fondo del menú

    // Fondo del menú
    this.load.image('menu_background', 'fonda.jpg');
    this.load.image('titulo', 'titulo.png');

    // Botón Play
    this.load.image('play_normal', 'PlayNormal.png');
    this.load.image('play_focus', 'PlayFocus.png');
    this.load.image('play_hover', 'PlayHover.png');

    // Música del juego
    this.load.audio('Levels_Music', 'Cueva-misterio.ogg');

    // Sprites del jugador
    this.load.spritesheet('player_jump', 'Baikal_Salto.png', { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('player_damage', 'Auch_Baikal.png', { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('player_death', 'Baikal_Die.png', { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('player_attack', 'ATAQUE_baikal.png', { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('player_defense', 'Defenza-Baikal.png', { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('player_right', 'RightBaikal.png', { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('player_left', 'LeftBaikal.png', { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('player_idle', 'Baikai_Quieta.png', { frameWidth: 192, frameHeight: 192 });

    // Vida del jugador
    this.load.spritesheet('heart', 'heart_hurt.png', { frameWidth: 16, frameHeight: 16 });

    // Sonidos
    this.load.audio('jumpSound', 'jump.ogg');
    this.load.audio('walkSound', 'walk.ogg');
    this.load.audio('mili_shoot', 'shot.ogg');
    this.load.audio('cientifico_shoot', 'spin_geringa_1.ogg');

    // Portada animada
    this.load.spritesheet('background', 'Portada.png', {
        frameWidth: 640,
        frameHeight: 380
    });
}

    
    create() {
        this.music = this.sound.add('bgMusic', { loop: true, volume: 0.5 });
        this.music.play();
    
        // Animación inicial (se ejecuta una vez)
        this.anims.create({
            key: 'backgroundAnimation',
            frames: this.anims.generateFrameNumbers('background', { start: 0, end: 8 }), 
            frameRate: 10,
            repeat: 0
        });
    
        // Animación en bucle (se repetirá después de la primera animación)
        this.anims.create({
            key: 'backgroundLoop',
            frames: this.anims.generateFrameNumbers('background', { start: 9, end: 14 }), 
            frameRate: 10,
            repeat: -1
        });
    
        // Crear el sprite del fondo
        this.background = this.add.sprite(440, 275, 'background').setDisplaySize(880, 550);
    
        // Reproducir la animación inicial
        this.background.play('backgroundAnimation');
    
        // Esperar a que termine la animación inicial y luego reproducir la animación en loop
        this.background.on('animationcomplete', (anim) => {
            if (anim.key === 'backgroundAnimation') {
                this.background.play('backgroundLoop');
            }
        });
    
        // **Agregar la imagen del título**
        this.titleImage = this.add.image(440, 200, 'titulo').setOrigin(0.5);
    
        // Crear el botón "Play"
        this.playButton = this.add.image(440, 410, 'play_normal')
            .setInteractive()
            .on('pointerover', () => this.playButton.setTexture('play_focus'))  
            .on('pointerout', () => this.playButton.setTexture('play_normal'))  
            .on('pointerdown', () => {
                this.playButton.setTexture('play_hover');
                this.startGame();
            });
    }
    

    startGame() {
        console.log("Iniciando el juego...");
        this.scene.start('Level1'); // Cambia a la escena del primer nivel
        this.music.stop();
    }
}

export default MainMenu;
