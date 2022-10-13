// Html based declarations

const init = document.getElementById('start')
const finish = document.getElementById('end')
const clockValue = document.getElementById('clock')
const checkValue = document.getElementById('check')
const container = document.querySelector('.container')
const btngroup = document.getElementById('button-group')

const btn = document.getElementById('config-btn')
const screen = document.getElementById('config')
const icon = document.getElementById('iconbtn')
const icon2 = document.getElementById('iconbtn2')

// Ticking sound
const hourradio = document.getElementById('hour')
const minuteradio = document.getElementById('minute')
const secondradio = document.getElementById('second')
const noneradio = document.getElementById('none')

// Css based declarations

const timeValueContainer = document.getElementById('timeContainer')

// Local script based declarations

let counter = 0
let counterpd = 0
var clockTime
var boolean = false
var selected = 'none'
var lasthour
var lastminute
const pdcounters = []
const DoneTune = new Audio('../assets/tunes/relax.wav')
const back2Work = new Audio('../assets/tunes/work.wav')
const tick = new Audio('../assets/tunes/tick.wav')

// Get values for clock
init.addEventListener('click', () => {
    const timeInput = document.querySelectorAll('#time')
    const isChecked = document.getElementById('check').checked
    const arr = []
    clearArray(arr)

    back2Work.play()
    
    if(isChecked){
        const timePDInput = document.querySelectorAll('#timepd')
        pushArray(timePDInput, arr)
        pushArray(timeInput, arr)
    } else pushArray(timeInput, arr)
    
    arr.forEach(element => {
        const isPomodoro = element.getAttribute('id') == 'timepd'
        const isTime = element.placeholder


        if(element.value != '') {
            if(isTime == 'hour') {
                if(isPomodoro) counterpd += element.value * 3600
                else counter += element.value * 3600
            }
            else if(isTime == 'minute') {
                if(isPomodoro) counterpd += element.value * 60
                else counter += element.value * 60
            }
            else {
                if(isPomodoro) counterpd += element.value * 1
                else counter += element.value * 1
            }
            element.value = ''
        }
    });
    if(counter != 0) {
        if(isChecked && counterpd != 0) pdcounters.push(counter, counterpd)
        clock(counter)
    }
    counter = 0
    counterpd = 0
})

// Update modes before init
checkValue.addEventListener('click', () => {
    const timePDInput = document.querySelectorAll('.pomodoro')

    timePDInput.forEach(element => {
        toggleClasses(element, 'inactive')
    });

    toggleClasses(container, 'large')
})

// Stops the clock
finish.addEventListener('click', () => {
    const isChecked = document.getElementById('check').checked

    DoneTune.play()

    toggleClasses(init, 'inactive')
    toggleClasses(finish, 'inactive')
    toggleClasses(timeValueContainer, 'inactive')
    if(isChecked) {
        toggleClasses(container, 'large') 
        toggleClasses(btngroup, 'closer_large')
    }
    if(!isChecked) toggleClasses(btngroup, 'closer')
    clearArray(pdcounters)
    clearInterval(clockTime)
    clockValue.textContent = '00:00:00'
})

// Clock visual
function clock(num) {
    const isChecked = document.getElementById('check').checked

    const initIsVisible = init.classList.contains('inactive')
    const finishIsVisible = finish.classList.contains('inactive')
    const TimeContainerIsVisible = timeValueContainer.classList.contains('inactive')
    
    if(!initIsVisible && finishIsVisible && !TimeContainerIsVisible){
        toggleClasses(init, 'inactive')
        toggleClasses(finish, 'inactive')
        toggleClasses(timeValueContainer, 'inactive')
        if(isChecked) {
            toggleClasses(container, 'large') 
            toggleClasses(btngroup, 'closer_large')
        }
        if(!isChecked) toggleClasses(btngroup, 'closer')
    }

    // Starts the clock
    clockTime = setInterval(() => {
        
        const hourIsChecked = hourradio.checked
        const minuteIsChecked = minuteradio.checked
        const secondIsChecked = secondradio.checked

        
        let hour = Math.floor(num / 3600)
        let minute = Math.floor(num / 60) % 60
        let second = Math.floor(num % 60)
        
        if(minute == 60) minute = 0

        if(hourIsChecked) if(lasthour != hour) tick.play()
        if(minuteIsChecked) if(lastminute != minute) tick.play()
        if(secondIsChecked) tick.play()

        lasthour = hour
        lastminute = minute

        
        clockValue.textContent = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
        
        num--


        if(num < 0) {
            if(!isChecked) {
                toggleClasses(init, 'inactive')
                toggleClasses(finish, 'inactive')
                toggleClasses(btngroup, 'closer')
                toggleClasses(timeValueContainer, 'inactive')
                clockValue.textContent = '00:00:00'
                DoneTune.play()
                clearInterval(clockTime)
            } else toggleModes()
        }
    }, 1000)
}

// Push array items onto new Array
function pushArray(element, outputArray) {
    element.forEach(element => {
        outputArray.push(element)
    });
}

function clearArray(array) {
    for(i = 0; i < array.length + 1; i++) {
        array.pop()
    }
}

// Changes mode when in pomodoro
function toggleModes() {
    clearInterval(clockTime)
    clockValue.textContent = '00:00:00'
    
    if(boolean) boolean = false
    else boolean = true
    
    if(boolean) {
        DoneTune.play()
        clock(pdcounters[1])
    }
    else {
        back2Work.play()
        clock(pdcounters[0])
    }

    // False = counter
    // True = rest
}

function toggleClasses(element, classItem) {
    const check = element.classList.contains(classItem)

    check ? element.classList.remove(classItem) : element.classList.add(classItem)
}

// Config tab

// Initiates change
btn.addEventListener('click', () => {
    const isVisible = screen.classList.contains('viewable')
    const isDark = icon.classList.contains('shift')

    if(isVisible) screen.classList.remove('viewable')
    else screen.classList.add('viewable')

    if(isDark) {
        icon.classList.remove('shift')
        icon2.classList.add('shift')
    }
    else {
        icon.classList.add('shift')
        icon2.classList.remove('shift')
    }
})

// Checks initial state
function Start() {
    const isDark = icon.classList.contains('shift')
    if(!isDark) {
        icon.classList.remove('shift')
        icon2.classList.add('shift')
    }
    
    else {
        icon.classList.add('shift')
        icon2.classList.remove('shift')
    }
}

Start()