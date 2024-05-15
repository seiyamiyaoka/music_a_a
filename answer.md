```js

// 一つずつ呼び出して定義
const music_c = document.getElementById('music_c');

music_c.addEventListener('click', () => {
  play(48, 1);
})


// まとめて定義
window.onload = function() {
  document.querySelectorAll('input').forEach((keyboard, index) => {
    keyboard.addEventListener('click', () => {
        play(music_num[index], 1);
    });
  });
}

```