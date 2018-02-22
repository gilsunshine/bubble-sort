var wave;
//var arp = [0, 0, 2, 4, 6, 7, 5, 3, 1, 0, 2, 3, 8, 5, 3, 1];
var arp = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
//var arp = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83];
var shuffledIndex = shuffle(arp);
var tempArray = []
var note = 0;
var k = 0;
var fft;
var w;
var vect;
var count = 0;
var g = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(20);
    wave = new p5.Oscillator();
    wave.setType('triangle');
    wave.start();
    wave.freq(0);
    wave.amp(0.5);
    delay = new p5.Delay();
    delay.process(wave, .15, .3, 2800);
    fft = new p5.FFT(.9, 64);
    w = width / 64;
    vect = new p5.Vector(0,0,10);
}

function draw() {
    translate(width/2, height/2);
    rotate(radians(frameCount), vect);
    background(255);
    playNote();
    updateNote();
    // if (count % 29 == 0){
    oneSort(shuffledIndex);
  // };
  // count++;
    var spectrum = fft.analyze();
    for (var i = 0; i < spectrum.length; i++){
        var angle = map(i, 0, spectrum.length, 0, 360);
        var amp = spectrum[i];
        var r = map(amp, 20, spectrum.length, 0, 80);
        var x = r * cos(angle);
        var y = r * sin(angle);

        // var x = 0;
        // var y = 0;
        noStroke();
        fill(r+200, r-200, r-120, r/2);
        ellipse(x, y, r, r);

    }

}

function playNote() {
  var freqs = [130.81, 146.83, 164.81, 174.61, 196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50, 1174.66, 1318.51, 1396.91, 1567.98, 1760.00, 1975.53, 2093.00];

    wave.freq(freqs[shuffledIndex[note]])
}

function updateNote(){
    note = k % 29;
    k++;
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function oneSort(arr){
    // for (var i = 0; i < arr.length; i++){
    if (g < arr.length){
        if (arr[g] > arr[g + 1]){
            var temp = arr [g];
            arr[g] = arr[g + 1];
            arr[g + 1] = temp;
            // break;
        }

    }
    if (g == arr.length){
      g = 0;
    }
    g++;
    return arr;
}
