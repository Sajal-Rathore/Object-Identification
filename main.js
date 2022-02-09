object = [];
status = "";

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    object_detector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelloaded(){
    console.log("model loaded");
    status = true;
}

function gotresult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object = results;
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status!=""){
        object_detector.detect(video, gotresult);
        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("no._of_objects").innerHTML = "No. Of Objects Detected Are :" + object.length;

            r = random(255);
            g = random(255);
            b = random(255);
            fill(r, g, b);
            percent = Math.floor(object[i].confidence * 100);
            text(object[i].label + "  " + percent +"%", object[i].x +15, object[i].y +15);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
           };
    };
}