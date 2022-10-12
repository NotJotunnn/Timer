const init = document.getElementById('start')
const finish = document.getElementById('end')
const clockValue = document.getElementById('clock')
const checkValue = document.getElementById('check')
const container = document.querySelector('.container')

// Css based declarations

const timeValueContainer = document.getElementById('timeContainer')

let counter = 0
var clockTime
var boolean = false
// TODO: Add audio file for notif/tune

// Get values for clock
init.addEventListener('click', () => {
    const timeInput = document.querySelectorAll('#time')
    const isChecked = document.getElementById('check').checked
    const arr = []
    clearArray(arr)
    
    if(isChecked){
        const timePDInput = document.querySelectorAll('#timepd')
        pushArray(timePDInput, arr)
        pushArray(timeInput, arr)
    } else pushArray(timeInput, arr)
    
    arr.forEach(element => {
        if(element.value != '') {
            if(element.placeholder == 'hour') counter += element.value * 3600
            else if(element.placeholder == 'minute') {
                counter += element.value * 60
            }
            else counter += element.value * 1
            element.value = ''
        }
    });
    if(counter != 0) clock(counter)
    counter = 0
})

// Update mode
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

    console.log(isChecked)

    toggleClasses(init, 'inactive')
    toggleClasses(finish, 'inactive')
    toggleClasses(timeValueContainer, 'inactive')
    if(isChecked) toggleClasses(container, 'large')
    clearInterval(clockTime)
    clockValue.textContent = '00:00:00'
})

// Clock visual
function clock(num, pdnum) {
    const isChecked = document.getElementById('check').checked
    
    toggleClasses(init, 'inactive')
    toggleClasses(finish, 'inactive')
    toggleClasses(timeValueContainer, 'inactive')
    if(isChecked) toggleClasses(container, 'large')

    // Starts the clock
    clockTime = setInterval(() => {
        
        
        let hour = Math.floor(num / 3600)
        let minute = Math.floor(num / 60) % 60
        let second = Math.floor(num % 60)
        
        if(minute == 60) minute = 0
        
        
        clockValue.textContent = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
        
        num--

        if(num < 0) {
            clearInterval(clockTime)
            toggleClasses(init, 'inactive')
            toggleClasses(finish, 'inactive')
            toggleClasses(timeValueContainer, 'inactive')

            // TODO: simplify init's components into functions to be used here
            if(isChecked) {
                const mode = toggleModes(boolean)
            }
        }
    }, 1000)
}

// Push items onto Array
function pushArray(element, outputArray) {
    element.forEach(element => {
        outputArray.push(element)
    });
}

function clearArray(array) {
    array.forEach(element => {
        array.pop()
    });
}

function toggleModes(boolean) {
    if(boolean) return boolean = false
    return boolean = true
}

function toggleClasses(element, classItem) {
    const check = element.classList.contains(classItem)

    if(check) return element.classList.remove(classItem)

    element.classList.add(classItem)
}