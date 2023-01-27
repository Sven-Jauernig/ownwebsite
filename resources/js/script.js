const menu = document.getElementById("menu"),
    button = document.getElementById("burger"),
    address = document.getElementById("address"),
    input = document.getElementById("address-input"),
    amountButtonAdd = document.querySelector(".amount button[data-buttonmenu=\"add\"]"),
    amountButtonSubs = document.querySelector(".amount button[data-buttonmenu=\"subs\"]"),
    header = document.getElementById("header"),
    salat = document.getElementById("salat"),
    burger = document.getElementById("burgerfood"),
    main = document.getElementById("main"),
    linkArray = [
        "https://www.travlinmad.com/blog/traditional-food-around-the-world",
        "https://www.lecker.de/rasanter-salat-mit-ei-und-feta-75011.html",
        "https://www.swrfernsehen.de/kaffee-oder-tee/rezepte/sommer-burger-100.html",
    ];

let novegan = document.querySelectorAll("#noVegan"),
    novegetarian = document.querySelectorAll("#noVegetarian"),
    buttonAmountCounter = 0,
    totalPrice = 0;

button.addEventListener("click", burgermenu);
header.addEventListener("click", function () { openLink(0) });
salat.addEventListener("click", function () { openLink(1) });
burger.addEventListener("click", function () { openLink(2) });
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        let input2 = input.value;
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
    main.setAttribute("onclick", "wiederweg()");
    header.setAttribute("onclick", "wiederweg()");
    button.setAttribute("style", "display: none;");
    menu.setAttribute("style", "display: block;");

    window.setTimeout(function () {

        menu.style.opacity = 1;
    }, 0);
}

function wiederweg() {
    menu.style.opacity = 0;
    menu.style.display = 'none';

    header.removeAttribute("onclick", "wiederweg()");
    main.removeAttribute("onclick", "wiederweg()");
    button.removeAttribute("style", "display: block;");
}

function addToCart(para) {

    let node = document.createElement("li"),
        node2 = document.createElement("p"),
        buttonMenu = document.createElement("button"),
        amount = document.createElement("p"),
        buttonMenu2 = document.createElement("button"),
        divAmount = document.createElement("div"),
        divPrice = document.createElement("p"),
        innerDivAmount = document.createElement("div");

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


    node.setAttribute("id",  "node");
    node.setAttribute("data-node", para);
    node2.setAttribute("class", "productList");
    node2.setAttribute("id", "node2");
    innerDivAmount.setAttribute("style", "display: flex;");
    divAmount.setAttribute("id", "divAmount");
    buttonMenu.setAttribute("id", ("buttonMenu" + buttonAmountCounter));
    buttonMenu.setAttribute("data-buttonmenu", "add");
    buttonMenu.setAttribute("onClick", `getName(${para})`);
    amount.setAttribute("id", ("amount" + para).toString());
    buttonMenu2.setAttribute("id", ("buttonMenu" + buttonAmountCounter).toString());
    buttonMenu2.setAttribute("data-buttonmenu", "subs");
    buttonMenu2.setAttribute("onclick", `removeAmount(${para})`);
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

    const productName = document.querySelector(("main .products .box[data-product=\"" + para + "\"] h1").toString()),
        productList = document.getElementsByClassName("productList"),
        amount = document.getElementById(("amount" + para).toString());

    let node = document.createElement("li");
    node.setAttribute("class", "productList");

    menu.querySelector("ul").appendChild(node);
    console.log(productList.length);

    for (let i = 0; i < productList.length; i++) {
        if ((productName.innerText + ":").toString() === productList[i].innerText.toString()) {

            const divPrice = document.querySelector(("main .products .box[data-product=\"" + para + "\"] #price").toString()).innerText.toString(),
                price = parseFloat(divPrice);
            let amountCount = parseInt(amount.innerText);

            totalPrice += price;
            document.querySelector("nav .nav-right h3").innerHTML = "Price total: " + totalPrice.toFixed(2) + "€";

            amountCount++;
            amount.innerHTML = amountCount.toString();

            menu.querySelector("ul").removeChild(node);

            break;

        } else if (isEqualTo(productList[i]) === true) {

        } else {
            addToCart(para);

            menu.querySelector("ul").removeChild(node);

            break;
        }
    }
}

function removeAmount(para) {
    const productName = document.querySelector(("main .products .box[data-product=\"" + para + "\"] h1").toString()),
        productList = document.getElementsByClassName("productList"),
        nodeToRemove = document.querySelector(("nav .nav-right .menu #node[data-node= \"" + para + "\"").toString()),
        amount = document.getElementById(("amount" + para).toString());

    let node = document.createElement("li");
    node.setAttribute("class", "productList");

    menu.querySelector("ul").appendChild(node);
    console.log(productList.length);

    for (let i = 0; i < productList.length; i++) {
        if ((productName.innerText + ":").toString() === productList[i].innerText.toString()) {

            const divPrice = document.querySelector(("main .products .box[data-product=\"" + para + "\"] #price").toString()).innerText.toString(),
                price = parseFloat(divPrice);
            let amountCount = parseInt(amount.innerText);

            totalPrice -= price;
            document.querySelector("nav .nav-right h3").innerHTML = "Price total: " + totalPrice.toFixed(2) + "€";

            amountCount--;
            if (amountCount > 0) {
                amount.innerHTML = amountCount.toString();
            }else{
                menu.querySelector("ul").removeChild(nodeToRemove);
            }
            menu.querySelector("ul").removeChild(node);


            break;

        } else if (isEqualTo(productList[i]) === true) { }
    }
}

    function isEqualTo(x) {

        let numb = document.getElementsByClassName("productList").length;

        for (let i = 0; i < numb; i++) {

            let product = document.querySelector(("main .products .box[data-product=\"" + i + "\"] h1").toString()).innerText.toString();

            if (x.innerText.toString() === (product + ":").toString()) {

                return true;

            } else if (x.innerText.toString() === "Einkaufswagen:") {

                return true;

            }
        }
    }