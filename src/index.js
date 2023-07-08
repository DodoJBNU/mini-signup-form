// TODO: 이 곳에 정답 코드를 작성해주세요.
// 1. autofocus 구현
// 대상 : ID 입력 input
// 이벤트 : 페이지가 로드 되었을 때

// 핸들러: Focus()
const $id = document.getElementById('id')
const $idMsg = document.getElementById('id-msg')
window.addEventListener('load', () => {
    $id.focus()
})

// 2. 유효성 검사 로직
// 대상: ID, PW,PW 확인 input
// 이벤트 : (1)input의 focus out시, (2)가입하기 버튼 눌렀을 때.
// 핸들러 : (1)해당 input의 유효성 검사. (2) 모든 필드의 유효성 검사.

const $pw = document.getElementById('pw')
const $pwMsg = document.getElementById('pw-msg')

const $pwCheck = document.getElementById('pw-check')
const $pwCheckMsg = document.getElementById('pw-check-msg')

const ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')
const PW_REGEX = new RegExp('^[a-zA-Z0-9]{8,16}$')

const ID_ERROR_MSG = {
    required: '필수 정보입니다.',
    invalid: '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
}

const checkIdRegex = (value) => {
    if (value.length === 0) {
        return 'required'
    } else {
        return ID_REGEX.test(value) ? true : 'invalid'
    }
}
const checkIdValidation = (value) => {
    //console.log(e.target.value)
    //console.log($id.value)
    const isValidId = checkIdRegex(value)
    // 3. 커스텀 에러 메시지 추가.
    if (isValidId !== true) {
        $id.classList.add('border-red-600')
        $idMsg.innerText = ID_ERROR_MSG[isValidId]
    } else {
        $id.classList.remove('border-red-600')
        $idMsg.innerText = ''
    }
    return isValidId
}
$id.addEventListener('focusout', () => checkIdValidation($id.value))

const PW_ERROR_MSG = {
    required: '필수 정보입니다.',
    invalid: '8~16자 영문 대 소문자, 숫자를 사용하세요.',
}

const checkPwRegex = (value) => {
    if (value.length === 0) {
        return 'required'
    } else {
        return PW_REGEX.test(value) ? true : 'invalid'
    }
}

const checkPwValidation = (value) => {
    // 3. 커스텀 에러 메시지 추가.
    const isValidPw = checkPwRegex(value)
    if (isValidPw !== true) {
        $pw.classList.add('border-red-600')
        $pwMsg.innerText = PW_ERROR_MSG[isValidPw]
    } else {
        $pw.classList.remove('border-red-600')
        $pwMsg.innerText = ''
    }
    return isValidPw
}
$pw.addEventListener('focusout', () => checkPwValidation($pw.value))

const PW_CHECK_ERROR_MSG = {
    required: '필수 정보입니다.',
    invalid: '비밀번호가 일치하지 않습니다.',
}

const checkPwCheckRegex = (value) => {
    if (value.length === 0) {
        return 'required'
    } else {
        return $pw.value === value ? true : 'invalid'
    }
}
const checkPwCheckValidation = (value) => {
    const isValidPwCheck = checkPwCheckRegex(value)
    if (isValidPwCheck !== true) {
        $pwCheck.classList.add('border-red-600')
        $pwCheckMsg.innerText = PW_CHECK_ERROR_MSG[isValidPwCheck]
    } else {
        $pwCheck.classList.remove('border-red-600')
        $pwCheckMsg.innerText = ''
    }
    return isValidPwCheck
}
$pwCheck.addEventListener('focusout', () =>
    checkPwCheckValidation($pwCheck.value)
)

// 4. 입력 확인 모달 창 구현
const $submit = document.getElementById('submit')
const $modal = document.getElementById('modal')

const $confirmId = document.getElementById('confirm-id')
const $confirmPw = document.getElementById('confirm-pw')

const $cancleBtn = document.getElementById('cancel-btn')
const $approveBtn = document.getElementById('approve-btn')

$submit.addEventListener('click', (e) => {
    e.preventDefault()
    const isValidForm =
        checkIdValidation($id.value) === true &&
        checkPwValidation($pw.value) === true &&
        checkPwCheckValidation($pwCheck.value) === true
    if (isValidForm) {
        $confirmId.innerText = $id.value
        $confirmPw.innerText = $pw.value
        $modal.showModal()
    }
})

$cancleBtn.addEventListener('click', () => {
    $modal.close()
})

$approveBtn.addEventListener('click', () => {
    window.alert('가입되었습니다 🥳')
    $modal.close()
    location.reload()
})

// 5. 폰트 사이즈 조절 기능

const $increaseFontBtn = document.getElementById('increase-font-btn')
const $decreaseFontBtn = document.getElementById('decrease-font-btn')

const $html = document.documentElement

const MAX_FONT_SIZE = 20
const MIN_FONT_SIZE = 12

const getHtmlFontSize = () => {
    return parseFloat(window.getComputedStyle($html).fontSize)
}
$increaseFontBtn.addEventListener('click', () => {
    onClickFontSizeControl('increase')
    // const nextFontSize = getHtmlFontSize() + 1
    // $html.style.fontSize = nextFontSize

    // if (nextFontSize >= MAX_FONT_SIZE) {
    //     $increaseFontBtn.disabled = true
    // }
    // if (nextFontSize > MIN_FONT_SIZE) {
    //     $decreaseFontBtn.disabled = false
    // }
})

$decreaseFontBtn.addEventListener('click', () => {
    onClickFontSizeControl('decrease')
    // const nextFontSize = getHtmlFontSize() - 1
    // $html.style.fontSize = nextFontSize

    // if (nextFontSize <= MIN_FONT_SIZE) {
    //     $decreaseFontBtn.disabled = true
    // }
    // if (nextFontSize < MAX_FONT_SIZE) {
    //     $increaseFontBtn.disabled = false
    // }
})

const onClickFontSizeControl = (flag) => {
    const fontSize = getHtmlFontSize()
    let newFontSize = flag === 'increase' ? fontSize + 1 : fontSize - 1
    $html.style.fontSize = newFontSize

    $decreaseFontBtn.disabled = newFontSize <= MIN_FONT_SIZE
    $increaseFontBtn.disabled = newFontSize >= MAX_FONT_SIZE
}
