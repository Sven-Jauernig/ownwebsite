const menu = document.getElementById("menu");
const button = document.getElementById("burger");
const address = document.getElementById("address");
const input = document.getElementById("address-input");
var novegan = document.querySelectorAll("#noVegan");
var novegetarian = document.querySelectorAll("#noVegetarian");
const amountButtonAdd = document.querySelector(".amount button[data-buttonmenu=\"add\"]");
const amountButtonSubs = document.querySelector(".amount button[data-buttonmenu=\"subs\"]");
const header = document.getElementById("header");
const salat = document.getElementById("salat");
const burger = document.getElementById("burgerfood");

const linkArray = [
    "https://www.travlinmad.com/blog/traditional-food-around-the-world",
    "https://www.lecker.de/rasanter-salat-mit-ei-und-feta-75011.html",
    "https://www.swrfernsehen.de/kaffee-oder-tee/rezepte/sommer-burger-100.html",
]

var buttonAmountCounter = 0;
var totalPrice = 0;

button.addEventListener("click", burgermenu);
header.addEventListener("click", function () { openLink(0) });
salat.addEventListener("click", function () { openLink(1) });
burger.addEventListener("click", function () { openLink(2) });
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        var input2 = input.value;
        address.innerText = input2.toString();
        window.setTimeout(function () {
            document.getElementById("header").style.opacity = 0;
            document.getElementById("header").setAttribute("style", "Display: none;");
            document.getElementById("main").setAttribute("style", "display: flex;");
            document.getElementById("body").setAttribute("style", "overflow: auto;");
        }, 0);
    }
});

function burgermenu() {
    menu.setAttribute("onclick", "wiederweg()");
    button.setAttribute("style", "display: none;");
    menu.setAttribute("style", "display: block;");

    window.setTimeout(function () {

        menu.style.opacity = 1;

    }, 0);
}

function wiederweg() {
    menu.style.opacity = 0;
    menu.style.display = 'none';

    menu.removeAttribute("onclick", "wiederweg()");
    button.removeAttribute("style", "display: block;");
}

function addToCart(para) {

    var node = document.createElement("li");
    var node2 = document.createElement("p");
    var buttonMenu = document.createElement("button");
    var amount = document.createElement("p");
    var buttonMenu2 = document.createElement("button");
    var divAmount = document.createElement("div");
    var divPrice = document.createElement("p");
    var innerDivAmount = document.createElement("div")

    divPrice.innerText = document.querySelector(("main .products .box[data-product=\"" + para + "\"] #price").toString()).innerText.toString();
    divAmount.setAttribute("class", "amount");

    const price = parseFloat(divPrice.innerHTML.toString());

    buttonMenu.innerText = "+";
    amount.innerText = 1;
    buttonMenu2.innerText = "-";
    totalPrice += price;
    divPrice.innerText = price + "0 €";

    node2.innerText = document.querySelector(("main .products .box[data-product=\"" + para + "\"] h1").toString()).innerText.toString() + ":";
    node.appendChild(node2);
    innerDivAmount.appendChild(buttonMenu);
    innerDivAmount.appendChild(amount);
    innerDivAmount.appendChild(buttonMenu2);
    divAmount.appendChild(innerDivAmount);
    divAmount.appendChild(divPrice);
    node.appendChild(divAmount);
    menu.querySelector("ul").appendChild(node);


    node.setAttribute("id", "node");
    node2.setAttribute("class", "test");
    node2.setAttribute("id", "node2");
    innerDivAmount.setAttribute("style", "display: flex;");
    divAmount.setAttribute("id", "divAmount");
    buttonMenu.setAttribute("id", ("buttonMenu" + buttonAmountCounter));
    buttonMenu.setAttribute("data-buttonmenu", "add");
    amount.setAttribute("id", ("amount" + para).toString());
    buttonMenu2.setAttribute("id", ("buttonMenu" + buttonAmountCounter).toString());
    buttonMenu2.setAttribute("data-buttonmenu", "subs");
    buttonMenu2.setAttribute("onclick", ("addAmount" + buttonAmountCounter).toString());
    divPrice.setAttribute("id", "divPrice");

    document.querySelector("nav .nav-right h3").innerHTML = "Price total: " + totalPrice.toFixed(2) + "€";

    buttonAmountCounter++;

}

function removeNoVegan() {
    novegetarian.forEach(element => {

        element.setAttribute("style", "display: none;");

    });

    novegan.forEach(element => {

        element.setAttribute("style", "display: none;");

    });

    document.querySelector("main .filter li[onclick=\"removeNoVegan()\"").setAttribute("style", "background-color: rgba(196, 65, 65, 0.5);");

}

function removeNoVegetarian() {

    novegetarian.forEach(element => {

        element.setAttribute("style", "display: none;");

    });

    document.querySelector("main .filter li[onclick=\"removeNoVegetarian()\"").setAttribute("style", "background-color: rgba(196, 65, 65, 0.5);");

}

function resetRemove() {

    novegetarian.forEach(element => {

        element.setAttribute("style", "display: flex;");

    });

    novegan.forEach(element => {

        element.setAttribute("style", "display: flex;");

    });

    document.querySelector("main .filter li[onclick=\"removeNoVegetarian()\"").setAttribute("style", "background-color: rgba(167, 214, 0, 0.5);");
    document.querySelector("main .filter li[onclick=\"removeNoVegan()\"").setAttribute("style", "background-color: rgba(167, 214, 0, 0.5);");

}

function openLink(x) {

    if (event.ctrlKey) {

        window.open(linkArray[x], '_blank');

    }
}

function getName(para) {

    const x = document.querySelector(("main .products .box[data-product=\"" + para + "\"] h1").toString());
    const y = document.getElementsByClassName("test");
    const amount = document.getElementById(("amount" + para).toString());

    var node = document.createElement("li");
    node.setAttribute("class", "test");

    menu.querySelector("ul").appendChild(node);


    for (var i = 0; i < y.length; i++) {
        if (x.innerText.toString() === y[i].innerText.toString()) {

            const divPrice = document.querySelector(("main .products .box[data-product=\"" + para + "\"] #price").toString()).innerText.toString();
            const price = parseFloat(divPrice);
            let amountCount = parseInt(amount.innerText);

            // alert("1");

            totalPrice += price;
            document.querySelector("nav .nav-right h3").innerHTML = "Price total: " + totalPrice.toFixed(2) + "€";

            amountCount++;
            amount.innerHTML = amountCount.toString();

            menu.querySelector("ul").removeChild(node);

            break;

        } else if (isEqualTo(y[i]) === true) {

            // alert("2");

        } else {

            // alert("3");

            addToCart(para);

            menu.querySelector("ul").removeChild(node);

            break;
        }
    }
}

function isEqualTo(x) {

    let numb = document.getElementById("products").children.length;
    // alert(x.innerText.toString());

    for (var i = 0; i < numb; i++) {

        let product = document.querySelector(("main .products .box[data-product=\"" + i + "\"] h1").toString()).innerText.toString();

        // alert(product);

        if (x.innerText.toString() === product) {

            return true;

        } else if (x.innerText.toString() === "Einkaufswagen:") {

            return true;

        }
    }
}