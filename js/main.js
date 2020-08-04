/*
(() => {

})(); 
익명함수를 즉시 호출, 그 안에 있는 변수는 전역변수가 아니구 보호됨 */
(() => {
    const leaflet = document.querySelector('.leaflet');
    const pageElems = document.querySelectorAll('.page');
    let pageCount = 0;

    function getTarget(elem, className) {
        while ( !elem.classList.contains(className)) {
            elem = elem.parentNode;

            if (elem.nodeName == 'BODY') {
                elem = null;
                return;
            }
        }
        return elem;
    }

    function closeLeaflet() {
        pageCount = 0;
        document.body.classList.remove('leaflet-opened');
        pageElems[2].classList.remove('page-flipped');
        setTimeout(()=> {
            pageElems[0].classList.remove('page-flipped');                
        }, 500);
    }

    function zoomIn(elem) {
        console.log(elem.getBoundingClientRect());
         /*DOMrect 객체정보, 크기위치 등등 */

        const rect = elem.getBoundingClientRect();
        console.log(rect.left, rect.top);
        const dx = window.innerWidth/2 - (rect.x + rect.width/2);
        const dy = window.innerHeight/2 - (rect.y + rect.height/2);
        let angle;

        switch (elem.dataset.page *1) { /*문자를 숫자로 바꾸는 가장 간단한 *1 */
            case 1 : 
                angle = -30;
                break;
            case 2:
                angle = 0;
                break;
            case 3:
                angle = 30;
                break;                
        }

        leaflet.style.transform = `translate3d(${dx}px, ${dy}px, 50vw) rotateY(${angle}deg)`;
        /*너무 갑자기 움직이지 않도록 css의 leaflet에 transition 걸어두기 */
    }

    leaflet.addEventListener('click', e => {
        console.log(e.target); /* 최하위의 page-face를 선택됨 
        그래서 parentNode를 올리면서 맞는 elem(page)가 나올때까지 while문*/
                
        let pageElem = getTarget(e.target, 'page');       

        console.log(pageElem);

        if(pageElem) {
            pageElem.classList.add('page-flipped');
            pageCount++;

            if (pageCount ==2) { /*페이비가 모두 열렸을때 */
                document.body.classList.add('leaflet-opened');
            }
        }

        let closeBtnElem = getTarget(e.target, 'close-btn');
        if(closeBtnElem) {
            closeLeaflet();
            
        }

        let skillItemElem = getTarget(e.target, 'skill-item');
        if (skillItemElem) {
            zoomIn(skillItemElem);
        }
    });
})(); 