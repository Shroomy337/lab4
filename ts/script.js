var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//Базовый класс
var Product = /** @class */ (function () {
    function Product(id, name, price, description, inStock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.inStock = inStock;
    }
    //Инициализация карточки
    Product.prototype.Init = function () {
        var h5 = document.createElement("h5");
        h5.setAttribute("class", "card-title");
        h5.innerHTML = this.name;
        var divprice = document.createElement("div");
        divprice.setAttribute("class", "col-6 p-0 text-primary font-weight-bold");
        divprice.innerHTML = this.price + " грн.";
        var divavail = document.createElement("div");
        if (this.IsAvailable()) {
            divavail.setAttribute("class", "col-6 p-0 text-right text-success");
            divavail.innerHTML = "Есть в наличии: " + this.inStock.toString() + " экземпляров";
        }
        else {
            divavail.setAttribute("class", "col-6 p-0 text-right text-danger");
            divavail.innerHTML = "Нет в наличии";
        }
        var divrow = document.createElement("div");
        divrow.setAttribute("class", "row");
        divrow.appendChild(divprice);
        divrow.appendChild(divavail);
        var divcon = document.createElement("div");
        divcon.setAttribute("class", "container");
        divcon.appendChild(divrow);
        var p = document.createElement("p");
        p.setAttribute("class", "card-text");
        p.innerHTML = this.description;
        var a = document.createElement("a");
        a.setAttribute("id", this.id.toString());
        a.setAttribute("href", "#buyModal");
        a.setAttribute("class", "btn btn-primary");
        a.setAttribute("data-toggle", "modal");
        a.setAttribute("onclick", "WantBuy(this.id)");
        a.innerHTML = "Купить";
        var divfu = document.createElement("div");
        divfu.setAttribute("class", "card-footer");
        divfu.appendChild(a);
        var divcardb = document.createElement("div");
        divcardb.setAttribute("class", "card-body mh-100");
        divcardb.setAttribute("style", "height: 200px");
        divcardb.appendChild(h5);
        divcardb.appendChild(divcon);
        divcardb.appendChild(p);
        var divcard = document.createElement("div");
        divcard.setAttribute("class", "card");
        divcard.appendChild(divcardb);
        divcard.appendChild(divfu);
        var divcol = document.createElement("div");
        divcol.setAttribute("class", "col-md-6 col-xl-4 p-1");
        divcol.appendChild(divcard);
        return divcol;
    };
    //Добавление карточки в строку
    Product.prototype.Embed = function (obj) {
        var prods = document.getElementById('rowts');
        prods.appendChild(obj);
    };
    //Определение есть ли товар в наличии
    Product.prototype.IsAvailable = function () {
        return (this.inStock > 0) ? true : false;
    };
    return Product;
}());
//Перечисление доступных цветов
var Color;
(function (Color) {
    Color["Black"] = "\u0427\u0451\u0440\u043D\u044B\u0439";
    Color["Gray"] = "\u0421\u0435\u0440\u044B\u0439";
    Color["Pink"] = "\u0420\u043E\u0437\u043E\u0432\u044B\u0439";
    Color["Green"] = "\u0417\u0435\u043B\u0435\u043D\u044B\u0439";
    Color["Yellow"] = "\u0416\u0435\u043B\u0442\u044B\u0439";
})(Color || (Color = {}));
;
//Класс со сложными особенностями
var FeltBoots = /** @class */ (function (_super) {
    __extends(FeltBoots, _super);
    function FeltBoots(id, name, price, description, inStock, list) {
        var _this = _super.call(this, id, name, price, description, inStock) || this;
        _this.id = id;
        _this.name = name;
        _this.price = price;
        _this.description = description;
        _this.inStock = inStock;
        _this.list = list;
        _this.CalculateFlags();
        _this.Init();
        return _this;
    }
    FeltBoots.prototype.Init = function () {
        var obj = _super.prototype.Init.call(this);
        //Если есть большие размеры, то добавляем информацию об этом в карточку
        if (this.isBigSizes) {
            var p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Есть большие размеры";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        //Если есть информация о цвете, то добавляем её в карточку
        if (this.haveColors.length > 0) {
            var p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            var str = this.haveColors[0];
            for (var i = 1; i < this.haveColors.length; i++) {
                str += ", " + this.haveColors[i];
            }
            p.innerHTML = "Есть цвета: " + str;
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        this.Embed(obj);
    };
    //Вычисление сложных особенностей
    FeltBoots.prototype.CalculateFlags = function () {
        //Поиск больших размеров
        this.isBigSizes = false;
        if (this.list != null)
            for (var i = 0; i < this.list.length; i++)
                if (this.list[i].dimension > 43 && this.list[i].quantity > 0) {
                    this.isBigSizes = true;
                    break;
                }
        //Поиск доступных цветов
        var k = 0;
        this.haveColors = [];
        if (this.list != null)
            for (var i = 0; i < this.list.length; i++)
                if (this.haveColors.indexOf(this.list[i].color) == -1)
                    this.haveColors[k++] = this.list[i].color;
    };
    return FeltBoots;
}(Product));
var Refrigies = /** @class */ (function (_super) {
    __extends(Refrigies, _super);
    function Refrigies(id, name, price, description, inStock, list) {
        var _this = _super.call(this, id, name, price, description, inStock) || this;
        _this.id = id;
        _this.name = name;
        _this.price = price;
        _this.description = description;
        _this.inStock = inStock;
        _this.list = list;
        _this.CalculateFlags();
        _this.Init();
        return _this;
    }
    Refrigies.prototype.Init = function () {
        var obj = _super.prototype.Init.call(this);
        if (this.haveColdBox) {
            var p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Есть сушка";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        if (this.haveColors.length > 0) {
            var p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            var str = this.haveColors[0];
            for (var i = 1; i < this.haveColors.length; i++) {
                str += ", " + this.haveColors[i];
            }
            p.innerHTML = "Доступные цвета: " + str;
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        if (document.getElementById('haveColdBox') == null && this.haveColdBox != null && this.haveColdBox) {
            var inp = document.createElement("input");
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("id", "haveColdBox");
            inp.setAttribute("onclick", "CheckBox(this.checked)");
            var lab = document.createElement("p");
            lab.appendChild(inp);
            lab.innerHTML += "Есть сушка<br>";
            var div = document.getElementById('myTools');
            div.appendChild(lab);
        }
        this.Embed(obj);
    };
    //Вычисление сложных особенностей
    Refrigies.prototype.CalculateFlags = function () {
        this.haveColdBox = false;
        if (this.list != null)
            for (var i = 0; i < this.list.length; i++)
                if (this.list[i].haveColdBox && this.list[i].power > 0) {
                    this.haveColdBox = true;
                    break;
                }
        var k = 0;
        this.haveColors = [];
        if (this.list != null)
            for (var i = 0; i < this.list.length; i++)
                if (this.haveColors.indexOf(this.list[i].color) == -1)
                    this.haveColors[k++] = this.list[i].color;
    };
    return Refrigies;
}(Product));
function CheckBox(flag) {
    document.getElementById('rowts').innerHTML = "";
    if (flag) {
        for (var i = 0; i < this.productList.length; i++)
            if (productList[i] instanceof Refrigies && productList[i].haveColdBox)
                productList[i].Init();
    }
    else {
        for (var i = 0; i < this.productList.length; i++)
            productList[i].Init();
    }
}
var Jackets = /** @class */ (function (_super) {
    __extends(Jackets, _super);
    function Jackets(id, name, price, description, inStock, list) {
        var _this = _super.call(this, id, name, price, description, inStock) || this;
        _this.id = id;
        _this.name = name;
        _this.price = price;
        _this.description = description;
        _this.inStock = inStock;
        _this.list = list;
        _this.CalculateFlags();
        _this.Init();
        return _this;
    }
    Jackets.prototype.Init = function () {
        var obj = _super.prototype.Init.call(this);
        if (this.havePocket) {
            var p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Есть спец. тех.";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        if (this.haveColors.length > 0) {
            var p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            var str = this.haveColors[0];
            for (var i = 1; i < this.haveColors.length; i++) {
                str += ", " + this.haveColors[i];
            }
            p.innerHTML = "Есть цвета: " + str;
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        if (document.getElementById('havePocket') == null && this.havePocket != null && this.havePocket) {
            var inp = document.createElement("input");
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("id", "havePocket");
            inp.setAttribute("onclick", "CheckPocket(this.checked)");
            var lab = document.createElement("p");
            lab.appendChild(inp);
            lab.innerHTML += "Специальная технологія<br>";
            var div = document.getElementById('myTools');
            div.appendChild(lab);
        }
        this.Embed(obj);
    };
    //Вычисление сложных особенностей
    Jackets.prototype.CalculateFlags = function () {
        this.havePocket = false;
        if (this.list != null)
            for (var i = 0; i < this.list.length; i++)
                if (this.list[i].havePocket && this.list[i].size > 0) {
                    this.havePocket = true;
                    break;
                }
        //Поиск доступных цветов
        var k = 0;
        this.haveColors = [];
        if (this.list != null)
            for (var i = 0; i < this.list.length; i++)
                if (this.haveColors.indexOf(this.list[i].color) == -1)
                    this.haveColors[k++] = this.list[i].color;
    };
    return Jackets;
}(Product));
function CheckPocket(flag) {
    document.getElementById('rowts').innerHTML = "";
    if (flag) {
        for (var i = 0; i < this.productList.length; i++)
            if (productList[i] instanceof Jackets && productList[i].havePocket)
                productList[i].Init();
    }
    else {
        for (var i = 0; i < this.productList.length; i++)
            productList[i].Init();
    }
}
//Класс с группировкой
var Headphones = /** @class */ (function (_super) {
    __extends(Headphones, _super);
    function Headphones(id, name, price, description, inStock, isWireless) {
        var _this = _super.call(this, id, name, price, description, inStock) || this;
        _this.id = id;
        _this.name = name;
        _this.price = price;
        _this.description = description;
        _this.inStock = inStock;
        _this.isWireless = isWireless;
        _this.Init();
        return _this;
    }
    Headphones.prototype.Init = function () {
        var obj = _super.prototype.Init.call(this);
        //Если наушники беспроводные, то добавляем информацию об этом в карточку
        if (this.isWireless) {
            var p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Беспроводные";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        //Если эти конкретные наушники беспроводные и нет чекбокса группировки, то добавляем его
        if (document.getElementById('isWireless') == null && this.isWireless != null && this.isWireless) {
            var inp = document.createElement("input");
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("id", "isWireless");
            inp.setAttribute("onclick", "CheckWireless(this.checked)");
            var lab = document.createElement("p");
            lab.appendChild(inp);
            lab.innerHTML += "Только беспроводные<br>";
            var div = document.getElementById('myTools');
            div.appendChild(lab);
        }
        this.Embed(obj);
    };
    return Headphones;
}(Product));
//Группировка по беспроводным наушникам
function CheckWireless(flag) {
    document.getElementById('rowts').innerHTML = "";
    if (flag) {
        for (var i = 0; i < this.productList.length; i++)
            if (productList[i] instanceof Headphones && productList[i].isWireless)
                productList[i].Init();
    }
    else {
        for (var i = 0; i < this.productList.length; i++)
            productList[i].Init();
    }
}
//Класс пока не имеющий отличий от базового
var Balalaika = /** @class */ (function (_super) {
    __extends(Balalaika, _super);
    function Balalaika(id, name, price, description, inStock) {
        var _this = _super.call(this, id, name, price, description, inStock) || this;
        _this.id = id;
        _this.name = name;
        _this.price = price;
        _this.description = description;
        _this.inStock = inStock;
        _this.Init();
        return _this;
    }
    Balalaika.prototype.Init = function () {
        this.Embed(_super.prototype.Init.call(this));
    };
    return Balalaika;
}(Product));
var Basket = /** @class */ (function () {
    function Basket() {
        this.list = []; //Список товаров в корзине
    }
    //Добавить товар в корзину. Возвращает результат операции
    Basket.prototype.Add = function (val) {
        var num = +document.getElementById('inputquantity').value;
        //Проверка введенного количества товара. Если ввели ерунду, то выводится сообщение об ошибке. Иначе товар добавляется в корзину
        if (isNaN(num) || !((num ^ 0) === num) || num == 0 || productList[val].inStock < num) {
            if (productList[val].inStock < num)
                document.getElementById('modlalMessag').innerHTML = "Столько на складе нет";
            else
                document.getElementById('modlalMessag').innerHTML = "Введите целое число";
            return false;
        }
        else {
            document.getElementById('modlalMessag').innerHTML = "";
            productList[val].inStock -= num;
            this.list[this.list.length] = { id: val, quantity: num };
            this.SameElements();
            this.CalculateBasket();
            return true;
        }
    };
    Basket.prototype.SameElements = function () {
        var _this = this;
        if (this.list.length >= 2) {
            var _loop_1 = function (i) {
                var equalsElement = this_1.list.filter(function (el) { return el.id == _this.list[i].id; });
                console.log(equalsElement);
                if (equalsElement.length > 1) {
                    var quantity = equalsElement[1].quantity;
                    this_1.list[this_1.list.indexOf(equalsElement[0])].quantity += quantity;
                    this_1.list.splice(this_1.list.indexOf(equalsElement[1]), 1);
                }
            };
            var this_1 = this;
            for (var i = 0; i < this.list.length; i++) {
                _loop_1(i);
            }
        }
    };
    //Пересчитать товары в корзине
    Basket.prototype.CalculateBasket = function () {
        if (this.list.length > 0) {
            var id = void 0;
            var total = 0;
            var message = "В даннвй момент в корзине:<br>";
            for (var i = 0; i < this.list.length; i++) {
                message += productList[this.list[i].id].name + " - " + this.list[i].quantity + "<br>";
                total += productList[this.list[i].id].price * this.list[i].quantity;
            }
            message += "<br><br>На общую сумму " + total + " грн.";
            document.getElementById('myBasket').innerHTML = message;
        }
        else
            document.getElementById('myBasket').innerHTML = "В данный момент корзина пустая";
    };
    return Basket;
}());
//Действие на кнопке "добавить в корзину"
function myByBtn(val) {
    if (basket.Add(val))
        $('#buyModal').modal('hide');
}
//Действие на кнопке "купить"
function WantBuy(val) {
    document.getElementById('modlalBtn').setAttribute("value", val);
    document.getElementById('Sklad').innerHTML = String(productList[val].inStock);
}
//Инициализация корзины
var basket = new Basket();
//Список продуктов
var productList = [
    new Jackets(0, "Утюжочек-утюжок", 160, "Для маленьких девочек", 5, [
        { havePocket: false, color: Color.Yellow, size: 50 }
    ]),
    new Jackets(1, "Утюг для бородачей", 7000, "А для бородачей только так и можно", 1, [
        { havePocket: true, color: Color.Green, size: 44 },
        { havePocket: false, color: Color.Black, size: 50 }
    ]),
    new Refrigies(2, "Стиралка от сименс", 750, "Умеет читать рэп", 10, [
        { haveColdBox: true, color: Color.Gray, power: 90 },
        { haveColdBox: false, color: Color.Black, power: 150 }
    ]),
    new Refrigies(3, "Стиралка от нокиа", 850, "Не умеет читать рэп", 3, [
        { haveColdBox: false, color: Color.Black, power: 150 }
    ]),
    new Jackets(4, "Утюг водный", 1488, "Паровыпарывающая функция есть", 13, [
        { havePocket: true, color: Color.Gray, size: 44 },
        { havePocket: false, color: Color.Black, size: 50 }
    ]),
    new Refrigies(5, "Пральна машина державна", 1117, "Лише для нац.корпусу", 6, [
        { haveColdBox: true, color: Color.Pink, power: 90 },
        { haveColdBox: false, color: Color.Black, power: 150 }
    ]),
    new Jackets(6, "Праска", 2500, "2000 градусов АРРЛЕ", 20, [
        { havePocket: true, color: Color.Gray, size: 44 },
        { havePocket: false, color: Color.Black, size: 50 }
    ]),
];
