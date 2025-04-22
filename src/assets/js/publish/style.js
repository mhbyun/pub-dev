// src/assets/js/publish/style.js

export default () => {

  console.log("publish/style.js 들어옴")
  if (typeof window === 'undefined') return

  // aside 토글
  const handleAsideToggle = () => {
    document.body.classList.toggle('aside-hide')
  }

  const initAside = () => {
    const menuLinks = document.getElementsByClassName('aside-ctrl')
    Array.from(menuLinks).forEach(link => {
      link.addEventListener('click', handleAsideToggle)
    })
  }

  const handleResize = () => {
    const body = document.body
    const screenWidth = window.innerWidth

    if (screenWidth <= 1024) {
      body.classList.add('aside-hide')
    } else {
      body.classList.remove('aside-hide')
    }
  }

  const initDropdown = () => {
    document.querySelectorAll('.dropdown-tit').forEach((toggle) => {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation()
        const currentDrop = e.currentTarget.closest('.dropdown-wrap')
        const activeDrops = currentDrop.parentElement.querySelectorAll('.dropdown-wrap.active')
        activeDrops.forEach((drop) => {
          if (drop !== currentDrop) drop.classList.remove('active')
        })
        currentDrop.classList.toggle('active')
      })
    })

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown-wrap')) {
        document.querySelectorAll('.dropdown-wrap').forEach(w => w.classList.remove('active'))
      }
    })
  }

  const init = () => {

    handleResize()
    initAside()
    // initDropdown()
    initTabs()

    window.addEventListener('resize', handleResize)

  }

  // DOM이 완전히 준비된 이후 실행
  window.requestAnimationFrame(() => {
    setTimeout(init, 100)
  })


}

export function initTabs() {
  function showTabContent(tab) {
    const parent = tab?.parentElement?.nextElementSibling
    const target = document.querySelector(tab?.dataset?.target)

    if (!parent || !target) return // ❗ 널 체크로 중단

    Array.from(tab.parentElement.children).forEach((sibling) => sibling.classList.remove('active'))
    Array.from(parent.children).forEach((content) => content.classList.remove('active'))

    tab.classList.add('active')
    target.classList.add('active')
  }

  const firstTabs = document.querySelectorAll("[class*='-tab-title']")
  firstTabs.forEach((tabWrap) => {
    const firstTab = tabWrap.querySelector('.tab-title.active')
    if (firstTab) showTabContent(firstTab) // ❗ null이면 무시
  })

  const allTabs = document.querySelectorAll('.tab-title')
  if (!allTabs.length) return // ❗탭이 아예 없으면 함수 중단

  allTabs.forEach((tab) => {
    tab.addEventListener('click', () => showTabContent(tab))
  })
}

