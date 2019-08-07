# Audio Recorder

A component to record audio. 

# Installation
`flk install flk-audio-recorder`

# Usage

`hello-world.component.html`

```html
<flk-audio-recorder (start)="this.clearRecord()" (record)="this.captureRecord(e)"></flk-audio-recorder>
```

`hello-world.component.js`

```js
class HelloWorld {
    init() {
      this.recordData = null;
      this.recordSrc = null;
    }

    /**
     * Capture the given record object
     * 
     * @param {object} record
     */
    captureRecord(record) {
        this.recordSrc = record.url;
        this.recordData = record.blob;
    }

    /**
     * Clear record info
     */
    clearRecord() {
        this.recordSrc = null;
        this.recordData = null;
    }
}
```

The `this.recordData` is the data to be sent to the backend as the recorded data.

If you're using [Audio player](https://github.com/falakjs/flk-audio-player) you can pass the `this.recordSrc` to it to play it.


`hello-world.component.html`

```html
<flk-audio-recorder (start)="this.clearRecord()" (record)="this.captureRecord(e)" ></flk-audio-recorder>

<flk-audio-player *if="this.recordSrc" [src]="this.recordSrc"></flk-audio-player>
```

# Events

## start
**name**: `start` 

Triggered when the audio recorder is started.


## record
**name**: `record` 

Triggered when the audio recorder is done.
