new p5();






const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const zval = document.getElementById("Z");
const dval = document.getElementById("D");
const lval = document.getElementById("L");

const dimage = document.getElementById("dimg");
const Dimage = document.getElementById("Dimg");




function Color(val){
    if ((val * 5) % 1 < 0.5) out = 0;
    else out = 255;

    return [out, out, out, 255];
}


const w = 2048;
const h = 1024;

const miniw = 256;
const minih = 128;

const base = 1024;

canvas.width = w;
canvas.height = h;

let mScale = min(w/miniw, h/minih);

dimage.width = w/mScale;
dimage.height = h/mScale;

let scale = 5;
let layers = 1;
let detail = 0.1;
let seed = 12340;


/*
2-3
0.5
*/


let draw = ctx.createImageData(w, h);

const offset = 100;

function gen(){
    noiseSeed(seed);
    noiseDetail(layers, detail);

    for (var x = 0; x < w; x++) {
        for (var y = 0; y < h; y++) {
            let C = Color(noise(((x/base)+offset-0.5) * scale, ((y/base)+offset-0.5) * scale));
            let i = 4 * (y * w + x);

            draw.data[i] = C[0];
            draw.data[i + 1] = C[1];
            draw.data[i + 2] = C[2];
            draw.data[i + 3] = C[3];
        }
    }

    ctx.putImageData(draw, 0, 0);
}


let link;

function reload(){//not replaced by reloadUI due for debugging purposes
    zval.innerHTML = " "+scale+" ";
    dval.innerHTML = " "+detail+" ";
    lval.innerHTML = " "+layers+" ";
    gen();

    canvas.toBlob((blob) => {dimage.src = URL.createObjectURL(blob);}, "image/png");
    canvas.toBlob((blob) => {Dimage.href = URL.createObjectURL(blob);}, "image/png");
}

function openimg(){window.open(canvas.toDataURL("image/png"), '_blank').focus();}
function copyimg(){navigator.clipboard.writeText(canvas.toDataURL("image/png"));}

reload();


