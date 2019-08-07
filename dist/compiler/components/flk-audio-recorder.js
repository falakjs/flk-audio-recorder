const Component = require(COMPONENT_CLASS_PATH);

class AudioRecorderComponent extends Component {}

module.exports = {
    selector: 'flk-audio-recorder',
    isChild: false,
    handler: AudioRecorderComponent,
    isUnique: false,
    component: 'AudioRecorder',
    htmlFile: __dirname + '/../../flk-audio-recorder.component.html',
};