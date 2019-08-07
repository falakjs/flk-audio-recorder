class AudioRecorder {
    /**
     * Constructor
     * Put your required dependencies in the constructor parameters list  
     */
    constructor() {
        this.name = 'audio-recorder';
    }

    /**
     * Initialize the component
     * This method is triggered before rendering the component
     */
    init() {
        this.recorderDuration = 0; // time in seconds
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.isRecording = false;
        this.recordIsEnabled = null;
        this.checkAudioPermissions();
    }

    /**
     * Check audio permissions
     */
    checkAudioPermissions() {
        navigator.mediaDevices.getUserMedia({
            audio: true,
        }).then(stream => {
            this.recordIsEnabled = true;
            this.mediaRecorder = new MediaRecorder(stream);
        }).catch(domException => {
            this.recordIsEnabled = false;
        });

        navigator.permissions.query({ name: 'microphone' })
            .then((permissionObj) => {
                this.recordIsEnabled = true;
            })
            .catch((error) => {
                this.recordIsEnabled = false;
            });
    }

    /**
     * Handle the stop event when recorder is finished 
     */
    onStop() {
        this.mediaRecorder.addEventListener("stop", e => {
            const audioBlob = new Blob(this.audioChunks);

            const audioUrl = URL.createObjectURL(audioBlob);

            let onRecordEvent = this.inputs.getEvent('record');

            this.recordingSource = audioUrl;

            if (onRecordEvent) {
                let audioOptions = {
                    blob: audioBlob,
                    url: audioUrl,
                    duration: this.recorderDuration,
                };
                onRecordEvent(audioOptions);
            }
        });
    }

    /**
     * Stop recording
     */
    stop() {
        this.isRecording = false;
        clearInterval(this.recorderInterval);        
        this.mediaRecorder.stop();
    }

    /**
     * Start recording.
     */
    record() {
        this.audioChunks = [];
        this.mediaRecorder.addEventListener('dataavailable', e => {
            this.audioChunks.push(e.data);
        });
        this.onStop();
        this.isRecording = true;
        this.mediaRecorder.start();
        this.recorderDuration = 0;
        this.recorderInterval = setInterval(() => {
            this.recorderDuration++;
        }, 1000);

        let onStartEvent = this.inputs.getEvent('start');

        if (onStartEvent) {
            onStartEvent();
        }
    }

    /**
     * The component is ready to do any action after being rendered in dom
     */
    ready() { }
}