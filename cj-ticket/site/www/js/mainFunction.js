$(window).on('load', function(){
    if( $('.event-slide') ) {
        slidePopup('.event-slide')
    }
    handleSelectMap()
    if ( $('.reservationList') ) {
        slideProgram('.reservationList')
    }
    if ( $('.boardGroup') ) {
        toggleBoard('.boardGroup')
    }
    responseEventPopup()
})

function slidePopup( slideObject ){
    const $slideObject = $(slideObject)
    const $slideList = $slideObject.find('.slide-list')
    const $controller = $slideObject.find('.controller')
    const $buttonPrev = $controller.find('.prev')
    const $buttonNext = $controller.find('.next')
    const $buttonCtrl = $controller.find('.slideControl')
    const $count = $controller.find('.count')
    const $total = $count.find('.total')
    const $current = $count.find('.current')

    const $eventPopupObject = $('.event')
    console.log($eventPopupObject)
    $slideList.slick({
        infinite: true,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        arrows: true,
        prevArrow: $buttonPrev,
        nextArrow: $buttonNext,
        responsive: [
            {
                breakpoint: 1490,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    })

    const formatNumber = (num) => String(num).padStart(2, '0')
    $total.text(formatNumber($slideList.slick('getSlick').slideCount))
    $slideList.on('afterChange', function(event, slick, currentSlide) {
        $current.text(formatNumber(currentSlide + 1))
    })
    $current.text(formatNumber(1))

    $buttonCtrl.on('click', function() {
        if ($slideList.slick('slickGetOption', 'autoplay')) {
            $slideList.slick('slickPause')
            $slideList.slick('slickSetOption', 'autoplay', false, true)
            $(this).removeClass('ctrlStop').addClass('ctrlPlay')
        } else {
            $slideList.slick('slickSetOption', 'autoplay', true, true)
            $slideList.slick('slickPlay')
            $(this).removeClass('ctrlPlay').addClass('ctrlStop')
        }
    })
}
function handleSelectMap(){
    const selectAllArea = document.querySelector('select[data-select="gu"]')
    const selectDetailArea = document.querySelector('select[data-select="dong"]')
    const mapSvgs = Array.from(document.querySelectorAll('svg[data-map-value]'))
    const detailMaps = Array.from(document.querySelectorAll('.detail-map'))

/*    const getGuFromDongCode = (dongCode) => dongCode.slice(0, 3)
    const guToDetailClass = (gu) => 'dm'*/

    const DONG_MAP = {
        cwg: [
            { value: 'cwgOc', label: '오창읍' },
            { value: 'cwgBi', label: '북이면' },
            { value: 'cwgNs', label: '내수읍' },
            { value: 'cwgOgj', label: '오근장동' },
            { value: 'cwgYs', label: '율량, 사천동' },
            { value: 'cwgNd1', label: '내덕1동' },
            { value: 'cwgNd2', label: '내덕2동' },
            { value: 'cwgUa', label: '우암동' },
        ],
        hdg: [
            { value: 'hdgOsm', label: '옥산면' },
            { value: 'hdgGs2', label: '강서2동' },
            { value: 'hdgBmsj', label: '봉명2, 송절동' },
            { value: 'hdgUcsb', label: '운천, 신봉동' },
            { value: 'hdgBm1', label: '봉명1동' },
            { value: 'hdgOse', label: '오송읍' },
            { value: 'hdgGn', label: '강내면' },
            { value: 'hdgGs1', label: '강서1동' },
            { value: 'hdgBd1', label: '복대1동' },
            { value: 'hdgBd2', label: '복대2동' },
            { value: 'hdgGg', label: '가경동' }
        ],
        sdg: [
            { value: 'sdgMw', label: '미원면' },
            { value: 'sdgNs', label: '낭성면' },
            { value: 'sdgYms', label: '용암,명암,산성동' },
            { value: 'sdgJa', label: '중앙동' },
            { value: 'sdgTd', label: '탑, 대성동' },
            { value: 'sdgSa', label: '성안동' },
            { value: 'sdgGc', label: '금천동' },
            { value: 'sdgYu', label: '영운동' },
            { value: 'sdgYa1', label: '용암1동' },
            { value: 'sdgYa2', label: '용암2동' },
            { value: 'sdgNi', label: '남일면' },
            { value: 'sdgGd', label: '가덕면' },
            { value: 'sdgMu', label: '문의면' }
        ],
        swg: [
            { value: 'swgSj1', label: '사직1동' },
            { value: 'swgSc', label: '사창동' },
            { value: 'swgSj2', label: '사직2동' },
            { value: 'swgMc', label: '모충동' },
            { value: 'swgSgj', label: '성화, 개신, 죽림동' },
            { value: 'swgSg2', label: '수곡2동' },
            { value: 'swgSg1', label: '수곡1동' },
            { value: 'swgSn', label: '산남동' },
            { value: 'swgBp', label: '분평동' },
            { value: 'swgNi', label: '남이면' },
            { value: 'swgHd', label: '현도면' }
        ]
    }
    function clearSelection(){
        mapSvgs.forEach(mapSvg => {
            mapSvg.classList.remove('is-selected')
            const a = mapSvg.querySelector('a')
            if (a) a.removeAttribute('aria-current')
        })
    }
    function selectDistrict(code) {
        clearSelection()
        const target = mapSvgs.find(mapSvg => mapSvg.dataset.mapValue === code)
        if (target) {
            target.classList.add('is-selected')
            const a = target.querySelector('a')
            if (a) a.setAttribute('aria-current', 'true')
        }
    }
    function resetDong() {
        selectDetailArea.innerHTML = '<option>읍/면/동 선택</option>'
    }
    function populateDong(guCode) {
        resetDong();
        const list = DONG_MAP[guCode]
        if (!list) return
        const frag = document.createDocumentFragment()
        list.forEach(({ value, label }) => {
            const opt = document.createElement('option')
            opt.value = value
            opt.textContent = label
            frag.appendChild(opt)
        })
        selectDetailArea.appendChild(frag)
    }
    selectAllArea.addEventListener('change', () => {
        const code = selectAllArea.value
        if (!code || code === '구 선택') {
            clearSelection()
            resetDong()
            return
        }
        selectDistrict(code)
        populateDong(code)
    })
    mapSvgs.forEach(mapSvg => {
        mapSvg.addEventListener('click', (e) => {
            const carrier = e.target.closest('[data-map-value]')
            const code = carrier?.dataset?.mapValue || svg.dataset.mapValue
            if (!code) return
            selectDistrict(code)
            if (selectAllArea.value !== code) {
                selectAllArea.value = code
            }
            populateDong(code)
            if (carrier && carrier.tagName.toLowerCase() === 'a') e.preventDefault()
        })
    })
    if (!selectAllArea.value || selectAllArea.value === '구 선택') {
        clearSelection()
        resetDong()
    } else {
        selectDistrict(selectAllArea.value)
        populateDong(selectAllArea.value)
    }
    document.querySelector('.initialSelect').addEventListener('click', () => {
        selectAllArea.value='구 선택'
        resetDong()
        clearSelection()
    })
}
function slideProgram( slideObject ){
    const $slideObject = $(slideObject)
    const $slideList = $slideObject.find('.reserve-item-list')
    const $controller = $slideObject.find('.controller')
    const $buttonPrev = $controller.find('.prev')
    const $buttonNext = $controller.find('.next')

    $slideList.slick({
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: false,
        arrows: true,
        prevArrow: $buttonPrev,
        nextArrow: $buttonNext,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 360,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '15px'
                }
            }
        ]
    })
}
function toggleBoard( toggleObject ){
    const $toggleObject = $(toggleObject)
    const $toggleButton = $toggleObject.find('.tab-button')

    $toggleButton.on('click', function(){
        $toggleObject.find('.current').removeClass('current')
        $(this).addClass('current')
    })
}
function responseEventPopup() {
    const $eventPopupObject = $('.event')
    console.log($eventPopupObject)
}