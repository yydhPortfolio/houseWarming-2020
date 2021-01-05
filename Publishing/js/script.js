window.onload = function () {
    $.getJSON("./store/store.json", (e) => {
        let app = new App(e);
    });

    document.addEventListener("scroll", function () {
        scrollEvent();
    });

    let viewAllBtn = document.querySelector("#viewAll > p");

    viewAllBtn.addEventListener("click", function (e){
        $("#myShoppingCartss").fadeIn();
    });

    $("#cancelSecsss").on("click", function (e){
        $("#myShoppingCartss").fadeOut();
    });

    $("#cartCancel").on("click", function (e){
        $("#myShoppingCartss").fadeOut();
    });

}

function scrollEvent() {
    let scroll = $(this).scrollTop();

    let header = $("header");
    let mainHead = $("#mainHead");
    let mainMent = $("#mainMent");
    let centers = $("#centers");
    let navigate = $("#navigate");

    let shoppingCart = $("#shoppingBox");
    let autoShoppingScroll = scroll - 43 - 30 - 20;

    if (scroll > 0) {
        $(header).css({
            height: "80px",
            transition: "all 0.5s"
        });

        $(mainHead).css({
            height: "80px",
            transition: "all 0.5s"
        });

        $(mainMent).css({
            height: "0",
            fontSize: "0",
            transition: "all 0.5s",
            top: "-80px"
        });

        $(centers).css({
            height: "80px",
            transition: "all 0.5s"
        });

        $(navigate).css({
            height: "80px",
            transition: "all 0.5s"
        });

        // console.log(scroll);
    }

    if (scroll == 0) {
        $(header).css({
            height: "160px",
            transition: "all 0.5s"
        });

        $(mainHead).css({
            height: "160px",
            transition: "all 0.5s"
        });

        $(mainMent).css({
            height: "80px",
            fontSize: "25px",
            top: "0px"
        });

        $(centers).css({
            height: "160px"
        });

        $(navigate).css({
            height: "80px"
        });
    }

    if(scroll > 80) {
        $(shoppingCart).css({
            top: autoShoppingScroll,
            padding: 0,
        });
    } else {
        $(shoppingCart).css({
            top: "0",
            padding: 0
        });
    }
}

class App {
    constructor(e) {
        this.productList = []; // 사용자가 장바구니 안에 넣은 아이템들을 저장하는 배열
        this.jsonList = e; // jsonList 안에 getJson을 한 Json객체들을 삽입
        this.main(); // 파일을 실행하자마자 실행
        this.price = 0; // 사용자가 구매를 희망한 물건의 개수 * 물건 단가 가격
        this.itemSum = 0; // 물건 전체 합계
    }

    main() {
        this.jsonList.forEach((e) => {
            let product = this.form(e); // foreach로 만들어진 div태그들을 pruduct로 지정
            document.getElementById("storeContainer").appendChild(product); // storeContainer에 product를 하나씩 넣어줌
            
            $(product).draggable({
                revert : true, // 움직인 위치를 처음위치로 자동으로 되돌리는 여부 결정
                containment : "body", // body 밖에는 이동 못하게 막음
                zIndex : 10,
                helper : "clone", // 자신이 움직일때 그자리에 똑같은 객체를 생성할껀지 결정
                cancel : ".dragCancel", // .dragCancel 클래스가 존재하면 드래그를 막음 
                cursor : "pointer",
                drag(){
                    $("#carts").css({
                        height: "200px",
                        transition : "all 0.3s"
                    });
                },
                stop(){
                    $("#carts").css("height", "55px");
                }
            });

            $("#carts").droppable({
                accept : ".itemBoard",
                drop : (e, ui) => {
                    let id = ui.draggable[0].dataset.id; // 드래그하는 객체의 아이디 속성을 가져와서 id에 삽입
                    let item = this.jsonList[id - 1]; // 선택된 아이디의 아이템을 가지고옴

                    let find = this.productList.find(function(e){ // product객체 안에있는 것들을 다 검사 find가 자체 for문
                        return e.id == item.id; // 선택된 아이디와 리스트의 아이디가 겹치는게 있으면 true 아니면 undefined
                    });

                    if(find === undefined) this.drop(item); // 겹치는게 없기때문에 item을 넣어줌
                    else alert("이미 장바구니에 담긴 상품입니다");
                }
            });
        });

    }

    form(data) {
        let div = document.createElement("div"); // json에 있는 아이템들을 아이템리스트에 추가
        div.classList.add("itemBoard"); // div 만들때마다 div에 itemBoard라는 클래스 지정
        div.dataset.id = data.id; // div 각각에 data-id 지정
        div.innerHTML = ` 
            <div class="itemList">
            <div class="itemName dragCancel"><h3>${data.brand}</h3></div>
            <hr>
            <div class="itemImg"><img src="./store/itemImg/${data.photo}" alt="${data.photo}" draggable="false"></div>
            <hr>
            <div class="product_name dragCancel">${data.product_name}</div>
            <hr>
            <div class="itemCost dragCancel"><h3>￦${data.price}원</h3></div>
        </div>
        `; // createElement 한 div 안에 이 속성들을 집어넣음
        return div;
    }

    drop(data){
        this.productList.push(data); // 사용자가 선택한 제품들이 있는 배열에 새로운 상품을 추가함
        let div = document.createElement("div"); // 장바구니에 리스트 추가
        div.classList.add("dropBoard"); // 생성된 모든 div에 dropBoard 클래스를 넣음
        div.innerHTML = `<div class="itemssssss">
                            <div class="itemImgssssssssss"><img src="./store/itemImg/${data.photo}" alt=""></div>
                            <div class="lines"></div>
                            <div class="itemTextssssssss">${data.product_name}</div>
                        </div>`;
        let div1 = document.createElement("div"); // 장바구니에 리스트 추가
        div1.classList.add("itemssssss"); // 생성된 모든 div에 dropBoard 클래스를 넣음
        div1.classList.add("cartItemss"); // 생성된 모든 div에 dropBoard 클래스를 넣음
        div1.innerHTML = `<div class="itemImgssssssssss cartItemImgss"><img src="./store/itemImg/${data.photo}" alt="">
                            </div>
                            <div class="lines"></div>
                            <div class="itemTextssssssss cartItemName">${data.product_name}</div>
                            <div class="cartItemCount">
                                <input class="proPrice" type="number" name="" id="" value="1">개
                            </div>
                            <div class="itemCosts">￦<input type="text" name="" id="" value="${data.price}" readonly>원</div>
                            <div class="cancelCartBtnsss">
                                <button>삭제</button>
                            </div>`;

        // 상품 하나하나의 개수에 따른 가격변화, 총 금액 변화 (실시간)
        div1.querySelector(".proPrice").addEventListener("input",(e)=>{

            if(div1.querySelector(".cartItemCount > input").value <= 0) {
                alert("최소 1개 이상 주문해야 합니다.\n주문을 원치않으시면 삭제버튼을 눌러주세요.");
                div1.querySelector('.cartItemCount > input').value = 1;
                return;
            }
            
            if(div1.querySelector(".cartItemCount > input").value > 999) {
                alert("상품수량은 최대 999개 까지만 주문 가능합니다.");
                div1.querySelector('.cartItemCount > input').value = 999;
                return;
            }

            this.price = 0;
            this.itemSum = `${data.price}`.replace(/[,]/g, "") * div1.querySelector(".cartItemCount > input").value;
            div1.querySelector(".itemCosts > input").value = this.itemSum.toLocaleString();
            let allPay = document.querySelectorAll(".itemCosts > input");

            allPay.forEach(e => {
                this.price = this.price + (e.value.replace(/[,]/g, "") * 1);
            });

            document.querySelector("#cartTotalCost > input[type=text]").value = "총 금액 : " + this.price.toLocaleString() + "원"
        });
        
        if(this.productList.length < 6){
            document.querySelector("#dragItemSec").appendChild(div); // 장바구니 div 안에 위에 만들어진 div값들을 넣음
            document.querySelector("#cartItemTotalList").appendChild(div1); // 장바구니 div 안에 위에 만들어진 div값들을 넣음
        } else {
            $("#moreDragSec").css({
                display : "block"
            });
            document.querySelector("#cartItemTotalList").appendChild(div1); // 장바구니 div 안에 위에 만들어진 div값들을 넣음
        }

        // 장바구니 클릭시 이벤트
        let seeAllBtn = document.querySelector("#viewAll > p");

        seeAllBtn.addEventListener("click", function (e){
            this.price = 0;
            // this.itemSum = `${data.price}`.replace(/[,]/g, "") * div1.querySelector(".cartItemCount > input").value;
            // div1.querySelector(".itemCosts > input").value = this.itemSum.toLocaleString();
            let allPay = document.querySelectorAll(".itemCosts > input");

            allPay.forEach(e => {
                this.price = this.price + (e.value.replace(/[,]/g, "") * 1);
            });

            document.querySelector("#cartTotalCost > input[type=text]").value = "총 금액 : " + this.price.toLocaleString() + "원"
        });
    }

}