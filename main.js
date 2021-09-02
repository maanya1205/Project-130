leftWristX= 0;
leftWristY= 0;
rightWristY= 0;
rightWristX= 0;
song_1="";
song_2="";
score_left_wrist=0;
score_right_wrist=0;
statusLeft_song1="";
statusLeft_song2="";
statusRight_song1="";
statusRight_song2="";
function preload(){
    song_1= loadSound("Mabel - Don t Call Me Up.mp3");
    song_2= loadSound("Alan Walker & Ava Max - Alone, Pt. II.mp3");
}
function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}
function gotPoses(leg){
if(leg.length>0){
    console.log(leg);
    score_left_wrist=leg[0].pose.keypoints[9].score;
score_right_wrist= pillow[0].pose.keypoints[10].score;
    leftWristX= leg[0].pose.leftWrist.x;
    leftWristY= leg[0].pose.leftWrist.y;
    console.log("Left Wrist X = "+leftWristX+", Left Wrist Y = "+leftWristY);
    rightWristX= leg[0].pose.rightWrist.x;
    rightWristY= leg[0].pose.rightWrist.y;
    console.log("Right Wrist X = "+rightWristX+", Right Wrist Y = "+rightWristY);
}
}
function modelLoaded(){
    console.log("Model is Loaded!!");
}
function draw(){
    image(video,0,0,600,500);

    fill(255,20,147);
    stroke(75,0,130);
    circle(leftWristX,leftWristY,20);
    number_left_wrist_y= Number(leftWristY);
    remove_decimals= floor(number_left_wrist_y);
    volume= remove_decimals/500;
    document.getElementById("volume").innerHTML= "Volume = "+volume;
    song_1.setVolume(volume);
    song_2.setVolume(volume);
    statusLeft_song1= song_1.isPlaying(true);
    statusLeft_song2= song_2.isPlaying(false);
    if(score_left_wrist>0.2){
        circle(leftWristX,leftWristY,20);
        song_2.stop();
    }
    if(status_song1==false){
        song_1.play();
        document.getElementById("song_names").innerHTML= "Alone Pt.II"; 
    }
}
function play(){
    song_1.play();
    song_2.play();
song_1.setVolume(1);
song_2.setVolume(1);
song_1.rate(1);
song_2.rate(1);
}