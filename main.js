let audio;

const music_num = [
  48, 50, 52, 53, 55, 57, 59, 60 // ド レ ミ ファ ソ ラ シ ド
]

// ここに関数を実装してください


// 変更しないでください
/**
 *
 * @param {number} node - 48-60
 * @param {number} sec
 * @returns void
 */
function play(node, sec) {
    stop();
    if(node>=96)return;

    Hz=11025;//サンプリングレート

    //Waveデータ
    var bytes=new Uint8Array(Math.floor(Hz*sec)+100);

    //Waveヘッダー作成
    var header="524946460000000057415645666D74201000000001000100112B0000112B0000010008006461746100000000";
    for(fp = 0; fp < header.length/2; fp++){
        bytes[fp]=parseInt(header.substr(fp*2,2),16);
    }

    //音階(ドド#レ…シ)の周波数(1オクターブ下がると1/2倍)
    var freqs=[4180, 4428, 4708, 4968, 5264, 5592, 5884, 6300, 6676, 6988, 7476, 7848];

    //1サンプルあたりの位相計算
    octave = Math.floor(node/12); //オクターブ
    freq = freqs[node%12] / (1<<(7-octave)); //周波数
    phase = 6.28 / (Hz / freq);

    //波形作成
    for (t = 0; t < Math.floor(Hz*sec); t++){
        bytes[fp++] = Math.floor(Math.sin(phase*t)*127)+128;
    }

    //データ補正
    setLittleEndian(bytes,4,fp-8);  //ファイルサイズ
    setLittleEndian(bytes,24,Hz);   //サンプリングレート
    setLittleEndian(bytes,40,fp-44);//波形サイズ

    //BASE64変換してオーディオ作成
    str="";
    for (i=0;i<fp;i++){str+=String.fromCharCode(bytes[i]);}
    audio=new Audio("data:audio/wav;base64,"+btoa(str));
    audio.play();
}

// 変更しないでください
function stop() {
  if (audio&&!audio.ended){
    audio.pause();
    audio.currentTime=0;
  }
}

// 変更しないでください
function setLittleEndian(bytes,p,data) {
  bytes[p] = (data & 0xFF);
  bytes[p+1] = ((data >> 8) & 0xFF);
  bytes[p+2] = ((data >> 16) & 0xFF);
  bytes[p+3] = ((data >> 24) & 0xFF);
}
