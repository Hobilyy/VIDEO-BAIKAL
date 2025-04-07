export default class Scenes extends Phaser.Scene {
    constructor() {
        super({ key: 'Scenes' });
    }

    init(data) {
        this.videoKey = data.videoKey;  // Recibe el nombre del video
        this.nextLevel = data.nextLevel;  // Recibe el nombre del siguiente nivel
    }

    preload() {
        // Cargar solo el video necesario para esta escena
        this.load.video(this.videoKey, `/Assets/Scenes/${this.videoKey}.mp4`);
    }

    create() {
        // Detiene todos los sonidos en ejecución antes de reproducir el video
        this.sound.stopAll(); 
    
        let video = this.add.video(this.cameras.main.width / 2, this.cameras.main.height / 2, this.videoKey);
        video.setOrigin(0.5, 0.5);
    
        video.setScale(0.5);
    
        video.on('loadeddata', () => {
            let bounds = video.getBounds();
            let scaleX = this.cameras.main.width / bounds.width;
            let scaleY = this.cameras.main.height / bounds.height;
            let scale = Math.min(scaleX, scaleY);
    
            video.setScale(scale);
            video.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
        });
    
        video.setDepth(100);
        video.play();
        video.setMute(false); // Asegura que el sonido no esté silenciado
    
        video.on('complete', () => {
            this.scene.start(this.nextLevel);
        });
    }
    
}
