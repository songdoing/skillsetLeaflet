/*
(() => {

})(); 
익명함수를 즉시 호출, 그 안에 있는 변수는 전역변수가 아니구 보호됨 */
(() => {
    const leaflet = document.querySelector('.leaflet');

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

    leaflet.addEventListener('click', e => {
        console.log(e.target); /* 최하위의 page-face를 선택됨 
        그래서 parentNode를 올리면서 맞는 elem(page)가 나올때까지 while문*/
                
        let pageElem = getTarget(e.target, 'page');       

        console.log(pageElem);

        if(pageElem) {
            pageElem.classList.add('page-flipped');
        }
    });
})(); 