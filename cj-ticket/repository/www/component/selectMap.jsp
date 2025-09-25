<section class="reservationFind">
    <h3>예약 조회</h3>
    <form name="" method="post" action="">
        <fieldset>
            <legend>예약조회</legend>
            <ol class="reserveStep">
                <li class="map">
                    <div class="mapInnerWrap">
                        <div class="title-area">
                            <strong class="title">지역선택<span>Step1</span></strong>
                            <div class="mapSelect">
                                <button type="button" class="initialSelect"><svg><use href="/site/www/images/main/sprite-main.svg#icon-initial"></use></svg><span>Select 초기화</span></button>
                                <div class="main-customSelect">
                                    <select name="" title="구 선택">
                                        <option>구 선택</option>
                                        <option value="1">청원구</option>
                                        <option value="2">흥덕구</option>
                                        <option value="3">상당구</option>
                                        <option value="4">서원구</option>
                                    </select>
                                    <i><svg><use href="/site/www/images/main/sprite-main.svg#icon-arr-simple"></use></svg></i>
                                </div>
                                <div class="main-customSelect">
                                    <select name="" title="읍/면/동 선택">
                                        <option>구 선택</option>
                                        <option value="1">읍면동1</option>
                                        <option value="2">읍면동2</option>
                                        <option value="3">읍면동3</option>
                                        <option value="4">읍면동4</option>
                                    </select>
                                    <i><svg><use href="/site/www/images/main/sprite-main.svg#icon-arr-simple"></use></svg></i>
                                </div>
                            </div>
                        </div>
                        <div class="mapArea">
                            <button type="button"><span><i>청원구</i></span></button>
                        </div>
                    </div>
                </li>
                <li class="category">
                    <strong class="title">분류 선택<span>Step2</span></strong>
                    <div class="categoryWrap">
                        <label for="CATEGORY_KEY1" class="category1">
                            <input type="radio" id="CATEGORY_KEY1" name="CATEGORY_KEY" value="CATEGORY_KEY1">
                            <span>
                                    관광&middot;체험
                                    <em class="count"><i>999</i><svg><use href="/site/www/images/main/sprite-main.svg#icon-comment-arr"></use></svg></em>
                                </span>
                        </label>
                        <label for="CATEGORY_KEY2" class="category2">
                            <input type="radio" id="CATEGORY_KEY2" name="CATEGORY_KEY" value="CATEGORY_KEY2">
                            <span>
                                    시설예약
                                    <em class="count"><i>999</i><svg><use href="/site/www/images/main/sprite-main.svg#icon-comment-arr"></use></svg></em>
                                </span>
                        </label>
                        <label for="CATEGORY_KEY3" class="category3">
                            <input type="radio" id="CATEGORY_KEY3" name="CATEGORY_KEY" value="CATEGORY_KEY3">
                            <span>
                                    교육&middot;강좌
                                    <em class="count"><i>22</i><svg><use href="/site/www/images/main/sprite-main.svg#icon-comment-arr"></use></svg></em>
                                </span>
                        </label>
                        <label for="CATEGORY_KEY4" class="category4">
                            <input type="radio" id="CATEGORY_KEY4" name="CATEGORY_KEY" value="CATEGORY_KEY4">
                            <span>
                                    공연&middot;영화
                                    <em class="count"><i>1</i><svg><use href="/site/www/images/main/sprite-main.svg#icon-comment-arr"></use></svg></em>
                                </span>
                        </label>
                        <label for="CATEGORY_KEY5" class="category5">
                            <input type="radio" id="CATEGORY_KEY5" name="CATEGORY_KEY" value="CATEGORY_KEY5">
                            <span>
                                    교육&middot;강좌
                                    <em class="count"><i>89</i><svg><use href="/site/www/images/main/sprite-main.svg#icon-comment-arr"></use></svg></em>
                                </span>
                        </label>
                    </div>
                </li>
                <li class="state">
                    <strong class="title">예약상태 선택<span>Step3</span></strong>
                    <div class="stateWrap">
                        <div class="radioWrap">
                            <label for="STATE_KEY1">
                                <input type="radio" id="STATE_KEY1" name="STATE_KEY" value="STATE_KEY1">
                                <span>전체</span>
                            </label>
                            <label for="STATE_KEY2">
                                <input type="radio" id="STATE_KEY2" name="STATE_KEY" value="STATE_KEY2">
                                <span>접수중</span>
                            </label>
                            <label for="STATE_KEY3">
                                <input type="radio" id="STATE_KEY3" name="STATE_KEY" value="STATE_KEY3">
                                <span>접수대기</span>
                            </label>
                        </div>
                        <p>
                            <svg><use href="/site/www/images/main/sprite-main.svg#icon-comment"></use></svg>
                            {청원구} {오창읍}의 체험견학 프로그램 전체 프로그램을 검색합니다.
                        </p>
                        <button type="submit">
                            <svg><use href="/site/www/images/main/sprite-main.svg#icon-search-normal"></use></svg>
                            검색
                        </button>
                    </div>
                </li>
            </ol>
        </fieldset>
    </form>
</section>