import React, {useEffect} from 'react'

    let width = 360 
    let height = 0; 

    let streaming = false;
    let localstream;
    let video ;
    let canvas
function ImageCapture({setDataURI}) {
    useEffect(() =>{
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        })
        .then((stream) => {
            video.srcObject = stream;
            localstream = stream;
            video.play();
        })
        .catch((err) => {
            console.log("An error occurred: " + err);
        });

        
    }, [])

    const handlePlay = () =>{
        if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);

            if (isNaN(height)) {
                height = width / (4 / 3);
            }

            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
        }
    };

    const handleClick = (e) =>{
        takepicture();
        localstream.getTracks()[0].stop();
        e.preventDefault();
    }
    function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            var data = canvas.toDataURL('image/png');
            setDataURI(data)
        } else {
            clearphoto();
        }
    }

    function clearphoto() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        setDataURI(data)
    }

    return(
        <div>
            <h1>Welcome to Img Cap</h1>
            <h1>Using Javascript to capture Photo</h1>
        <div className="camera">
            <video onCanPlay={handlePlay} id="video">Video stream not available.</video>
        </div>
        <div><button onClick={handleClick} id="startbutton">Take photo</button></div>
        <canvas id="canvas"></canvas>
        </div>
    )
}

export default ImageCapture
