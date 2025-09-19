document.addEventListener("DOMContentLoaded", () => {
    viewContrast()
    mainNavigation()
    funcZoom()
})

function funcZoom() {
    const body = document.body
    const zoomInButton = document.querySelector('.viewZoom.in')
    const zoomOutButton = document.querySelector('.viewZoom.out')

    zoomInButton.addEventListener('click', zoomIn)
    zoomOutButton.addEventListener('click', zoomOut)

    function zoomIn() {
        console.log('zoomIn')
        const currentZoom = parseFloat(body.style.zoom || 1)
        body.style.zoom = currentZoom + 0.1;
    }
    function zoomOut() {
        console.log('zoomOut')
        const currentZoom = parseFloat(body.style.zoom || 1)
        body.style.zoom = currentZoom - 0.1;
    }
}

function viewContrast() {
    const eventButton = document.querySelector('.contrast');
    const stateText = eventButton.querySelector('span');
    const body = document.querySelector('body');

    eventButton.addEventListener('click', function() {
        const isActive = this.classList.toggle('active');

        if( isActive ) {
            stateText.textContent = '고대비 모드 끄기';
            body.classList.add('activeContrast');
        } else {
            stateText.textContent = '고대비 모드 켜기';
            body.classList.remove('activeContrast');
        }
    });
}

function mainNavigation() {
    const body = document.body;
    const navigation = document.querySelector('.navigation');
    const menuButton = document.querySelector('.mobile-navigation'); // 모바일 전체메뉴 토글 버튼
    if (!navigation) return;

    // 동적으로 변할 수 있어서 함수로 매번 가져오기
    const getDepth1 = () => navigation.querySelectorAll('.navDepth1');

    // 모드 판별 (CSS와 동일 기준)
    const mqMobile = window.matchMedia('(max-width: 1000px)');
    const mqHover  = window.matchMedia('(hover: hover)');

    // ===== 공통 유틸 =====
    function openBy(elDepth1) {
        if (!elDepth1) return;
        body.classList.add('activeNavigation');
        getDepth1().forEach(n => n.classList.remove('current'));
        elDepth1.classList.add('current');
    }
    function closeAll() {
        body.classList.remove('activeNavigation');
        getDepth1().forEach(n => n.classList.remove('current'));
    }

    // aria-expanded를 해당 li의 a에 맞춰 세팅
    function setExpandedForLi(li, expanded) {
        const a = li.querySelector(':scope > a');
        if (a) a.setAttribute('aria-expanded', String(expanded));
    }

    // li 및 하위 전체 초기화 (active 제거 + aria-expanded=false)
    function clearBranch(rootLi) {
        if (!rootLi) return;
        // 자신 포함 하위 모든 li.active 제거
        rootLi.querySelectorAll('li.active, :scope').forEach(el => {
            if (el.tagName === 'LI' && el.classList.contains('active')) {
                el.classList.remove('active');
                setExpandedForLi(el, false);
            }
        });
        // 루트 li 자체도 처리 (위 루프에서 못 잡힐 수 있으니 보강)
        if (rootLi.classList.contains('active')) {
            rootLi.classList.remove('active');
            setExpandedForLi(rootLi, false);
        }
        // 하위 모든 a[aria-expanded="true"] → false
        rootLi.querySelectorAll('a[aria-expanded="true"]').forEach(a => a.setAttribute('aria-expanded', 'false'));
    }

    // 형제들의 active 및 하위 active를 모두 제거
    function closeSiblingsAndDesc(li) {
        const parent = li.parentElement;
        if (!parent) return;
        parent.querySelectorAll(':scope > li.active').forEach(sib => {
            if (sib !== li) clearBranch(sib);
        });
    }

    // 전체 초기화 (모바일 메뉴 닫힐 때)
    function clearMobileActives() {
        navigation.querySelectorAll('li.active').forEach(li => {
            li.classList.remove('active');
            setExpandedForLi(li, false);
        });
        navigation.querySelectorAll('a[aria-expanded="true"]').forEach(a => a.setAttribute('aria-expanded', 'false'));
    }

    // 하위메뉴 탐색(data-navigation 으로 확정)
    function getSubmenuForLink(link) {
        const next = link.nextElementSibling;
        if (next && (next.dataset?.navigation === 'depth2Wrap' || next.dataset?.navigation === 'depth3Wrap')) {
            return next;
        }
        const li = link.closest('li');
        if (!li) return null;
        return li.querySelector(':scope > [data-navigation="depth2Wrap"], :scope > [data-navigation="depth3Wrap"]');
    }
    function isLinkWithSubmenu(link) {
        return !!getSubmenuForLink(link);
    }

    // ===== 웹 전용 핸들러 =====
    function onMouseEnter(e) {
        const el = e.currentTarget;
        if (!el) return;
        openBy(el);
    }
    function onMouseLeave() {
        closeAll();
    }
    // 키보드: 컨테이너 위임
    function onFocusIn(e) {
        if (!navigation.contains(e.target)) return;
        const depth1 = e.target.classList?.contains('navDepth1')
            ? e.target
            : e.target.closest('li')?.querySelector('.navDepth1');
        if (depth1) openBy(depth1);
    }
    function onFocusOut(e) {
        const next = e.relatedTarget; // 밖이면 null 가능
        if (!next || !navigation.contains(next)) {
            closeAll();
        }
    }

    // ===== 모바일 전용: 전체메뉴 토글 =====
    function onMenuToggle() {
        const opened = navigation.classList.toggle('mNavActive');
        if (menuButton) menuButton.setAttribute('aria-expanded', String(opened));
        if (opened) {
            body.classList.add('activeNavigation');
        } else {
            body.classList.remove('activeNavigation');
            closeAll();
            clearMobileActives();
        }
    }
    function onEscToClose(e) {
        if (e.key === 'Escape') {
            navigation.classList.remove('mNavActive');
            if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
            body.classList.remove('activeNavigation');
            closeAll();
            clearMobileActives();
        }
    }

    // ===== 모바일 전용: 하위메뉴 있는 a를 버튼처럼(링크 차단 + 배타 토글) =====
    function onMobileNavActivate(e) {
        if (!navigation.classList.contains('mNavActive')) return; // 메뉴가 열린 상태에서만

        const link = e.target.closest('a');
        if (!link || !navigation.contains(link)) return;

        if (isLinkWithSubmenu(link)) {
            // 기본 이동 차단 (캡처 단계에서 선제)
            e.preventDefault();
            e.stopPropagation();
            if (e.stopImmediatePropagation) e.stopImmediatePropagation();

            const li = link.closest('li');
            const willOpen = !li.classList.contains('active');

            if (willOpen) {
                // 같은 레벨의 다른 항목들(형제) 모두 닫고 그 하위도 함께 초기화
                closeSiblingsAndDesc(li);
                // 내 하위는 새로 열기 전에 깨끗하게 (혹시 잔여 상태가 있으면)
                clearBranch(li);
                // 자신을 연다 (자신만 active)
                li.classList.add('active');
                setExpandedForLi(li, true);
            } else {
                // 이미 열려있었다면 자신과 하위를 모두 닫기
                clearBranch(li);
            }
        }
        // 하위메뉴 없는 a는 기본 이동 유지
    }

    // ===== 바인딩/해제 =====
    function bindDeviceWeb() {
        // 호버 가능한 환경에서만 mouseenter 사용 (터치 노트북 배려)
        if (mqHover.matches) {
            getDepth1().forEach(item => item.addEventListener('mouseenter', onMouseEnter));
            navigation.addEventListener('mouseleave', onMouseLeave);
        }
        navigation.addEventListener('focusin', onFocusIn);
        navigation.addEventListener('focusout', onFocusOut);

        // 모바일 흔적 정리
        if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
        navigation.classList.remove('mNavActive');
        body.classList.remove('activeNavigation');
        clearMobileActives();
    }
    function resetDeviceWeb() {
        if (mqHover.matches) {
            getDepth1().forEach(item => item.removeEventListener('mouseenter', onMouseEnter));
            navigation.removeEventListener('mouseleave', onMouseLeave);
        }
        navigation.removeEventListener('focusin', onFocusIn);
        navigation.removeEventListener('focusout', onFocusOut);
        closeAll();
    }

    function bindDeviceMobile() {
        if (menuButton) {
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.addEventListener('click', onMenuToggle);
        }
        document.addEventListener('keydown', onEscToClose);

        // 하위메뉴 버튼화: click(캡처)에서 선제 차단
        navigation.addEventListener('click', onMobileNavActivate, true);

        closeAll(); // 웹 상태 정리
    }
    function resetDeviceMobile() {
        if (menuButton) {
            menuButton.removeEventListener('click', onMenuToggle);
            menuButton.setAttribute('aria-expanded', 'false');
        }
        document.removeEventListener('keydown', onEscToClose);

        navigation.removeEventListener('click', onMobileNavActivate, true);

        navigation.classList.remove('mNavActive');
        body.classList.remove('activeNavigation');
        clearMobileActives();
    }

    // ===== 모드 전환 =====
    let mode = null; // 'mobile' | 'web'
    function applyMode() {
        const next = mqMobile.matches ? 'mobile' : 'web';
        if (mode === next) return;
        mode = next;

        if (next === 'mobile') {
            resetDeviceWeb();
            bindDeviceMobile();
        } else {
            resetDeviceMobile();
            bindDeviceWeb();
        }
    }

    // 초기 적용 + 변화 감지
    applyMode();
    mqMobile.addEventListener('change', applyMode);
    mqHover.addEventListener('change', applyMode);
}