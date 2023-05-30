var temp = document.getElementById("class-temp");

temp.onclick = () => {
    let password = +prompt("密码：");

    if(password===114514){
        window.open("./res/html/class.html");
    }
    console.log(typeof(password));
};
