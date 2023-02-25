var btn = document.getElementById('btn_click');
var title = document.getElementById("title");

var count = 0;

btn.onclick = ev => {
    count++;
    title.textContent = count;
};
