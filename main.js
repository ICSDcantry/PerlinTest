new p5();






const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const belink = document.getElementById("backupexportlink");
const elink = document.getElementById("exportlink");

const zval = document.getElementById("Z");
const dval = document.getElementById("D");
const lval = document.getElementById("L");




function Color(val){
    if ((val * 5) % 1 < 0.5) out = 0;
    else out = 255;

    return [out, out, out, 255];
}


const w = 500;
const h = 500;

canvas.width = w;
canvas.height = h;

let scale = 5;
let layers = 1;
let detail = 0.1;
let seed = 12340;



let draw = ctx.createImageData(w, h);

function gen(){
    noiseSeed(seed);
    noiseDetail(layers, detail);

    for (var x = 0; x < w; x++) {
        for (var y = 0; y < h; y++) {
            let C = Color(noise((x/w) * scale, (y/h) * scale));
            let i = 4 * (y * w + x);

            draw.data[i] = C[0];
            draw.data[i + 1] = C[1];
            draw.data[i + 2] = C[2];
            draw.data[i + 3] = C[3];
        }
    }

    ctx.putImageData(draw, 0, 0);
}

function reload(){//not replaced by reloadUI due for debugging purposes
    zval.innerHTML = " "+scale+" ";
    dval.innerHTML = " "+detail+" ";
    lval.innerHTML = " "+layers+" ";
    gen();

    let link = canvas.toDataURL("image/png");
    belink.innerHTML = link;
    elink.href = link;
}

reload();