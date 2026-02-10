new p5();




let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let elink = getElementById("exportlink");
let belink = getElementById("backupexportlink");
let zval = getElementById("Z");




function Color(val){
    if ((val * 5) % 1 < 0.5) out = 0;
    else out = 255;

    return [out, out, out, 255];
}


let w = 500;
let h = 500;
let scale = 5;
let layers = 1;
let detail = 0.1;
let seed = 12340;

function gen(){
    noiseSeed(seed);
    noiseDetail(layers, detail);

    canvas.width = w;
    canvas.height = h;

    let draw = ctx.createImageData(w, h);

    for (var x = 0; x < w; x++) {
        for (var y = 0; y < h; y++) {
            let C = Color(noise((x * scale) / w, (y * scale) / h));
            let i = 4 * (y * w + x);

            draw.data[i] = C[0];
            draw.data[i + 1] = C[1];
            draw.data[i + 2] = C[2];
            draw.data[i + 3] = C[3];
        }
    }

    ctx.putImageData(draw, 0, 0);
}





gen();

/*
function reloadUI(){
    gen();
    zval.innerHTML = " "+scale+" ";
}

reloadUI();

function Export(){
    let link = canvas.toDataURL("image/png");
    elink.href = link;
    belink.innerHTML = link;
}*/