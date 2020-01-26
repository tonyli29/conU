async function quickstart() {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // Performs label detection on the image file
    var FACIAL_VALUE, R, G, B;
    const [result] = await client.labelDetection('./pic1.jpg');
    const [result2] = await client.faceDetection('./pic3.jpg');
   
    // 
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));

    console.log('\nFacial Recognition:');
    const faces = result2.faceAnnotations;

    let joy, angry, sorrow, surprise;
    var emotionDicts = {
        'joy': `${joy}`,
        'angry': `${angry}`,
        'sorrow': `${sorrow}`,
        'surprise': `${surprise}`
    }

    FACIAL_VALUE = null;
    function popularEmotion(likeli){
        faces.forEach((face, i) => {
            console.log(`  Face #${i + 1}:`);
            console.log(`  Joy: ${face.joyLikelihood}`);
            console.log(`  Anger: ${face.angerLikelihood}`);
            console.log(`  Sorrow: ${face.sorrowLikelihood}`);
            console.log(`  Surprise: ${face.surpriseLikelihood}`);

            if(face.joyLikelihood === likeli)FACIAL_VALUE = 'joy'
            else if(face.angerLikelihood === likeli)FACIAL_VALUE = 'angry'
            else if(face.sorrowLikelihood === likeli)FACIAL_VALUE = 'sorrow'
            else if(face.surpriseLikelihood === likeli)FACIAL_VALUE = 'surprise'
            
            if(FACIAL_VALUE != null)
            console.log("\nMost popular Emotion: " + FACIAL_VALUE)
            // FACIAL_VALUE = sortedFaces[0]
        });
    }

    popularEmotion("VERY_LIKELY");
    if(FACIAL_VALUE==null)popularEmotion("LIKELY");
    if(FACIAL_VALUE==null)popularEmotion("UNLIKELY");
    if(FACIAL_VALUE==null)popularEmotion("VERY_UNLIKELY");


    console.log("\nMost popular Emotion: " + FACIAL_VALUE)

    console.log('\nColors: ')
    
    var bigColor = {"a": "s"};
    var bigNum = 0;
    const [result3] = await client.imageProperties('./pic1.jpg');
    const colors = result3.imagePropertiesAnnotation.dominantColors.colors;

    colors.forEach(color => {
        if(color.pixelFraction > bigNum){
            bigNum = color.pixelFraction;
            bigColor = color;
        }
        console.log("\npixel fraction: " + color.pixelFraction)
        console.log("score: " + color.score)
        console.log("red: " + color.color.red)
        console.log("green: " + color.color.green)
        console.log("blue: " + color.color.blue)
    })

    R = bigColor.color.red
    G = bigColor.color.green
    B = bigColor.color.blue
    console.log("\nMost Popular Colors: " + FACIAL_VALUE);

    var ret = {"facialExpression" : `${FACIAL_VALUE}`,
    "color": {
        "r": `${R}`,
        "g": `${G}`,
        "b": `${B}`
    }}

    console.log(ret)
    console.log()

    return ret;

}

  var valueTing = quickstart();
  console.log(valueTing.facialExpression)
  console.log(valueTing.color);
