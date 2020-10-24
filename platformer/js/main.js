

const player = document.getElementById("player")
const enemy = document.getElementById("enemy")
const start_playing_text = document.getElementById("start_playing")
const time_text = document.getElementById("time")
const difficulty_text = document.getElementById("difficulty")

let active_timer = 0;
let game_loop; // GAME LOOP
let t; // Game startup interval
// Event Listener
document.body.onkeyup = function (e) {
    if(e.keyCode == 32) player_jump () // check for space bar then jump
}

document.body.addEventListener("click", (e) => {
    player_jump()
});



function start_game () { // starts game and timer with game loop
    reset_stats()
    if(showing_start_screen) {
        // start a coundown timer then show all elements
        start_countdown ().then((timer => {
            clearInterval(timer)
            player.style.display = "block"
            enemy.classList.add("move_enemy");
            enemy.style.display = "block"
            playing_game = true;
            start_playing_text.classList.add("hidden")
            game_loop = setInterval(() => {
                console.log(`Game Loop!`)
                check_collision() // checks colision every .01 seconds
                active_timer += .010;
                time_text.innerHTML = `Time: ${active_timer.toFixed(2)}`;
            }, 10)
        }))

    } 

    if(!showing_start_screen) { // this means its showing the death text
        start_playing_text.innerText = "Click to play again!";
        showing_start_screen = true;
    }
    
}

function end_game () {
        clearInterval(game_loop) // kill game loop
        clearInterval(t)
        player.style.display = "none"
        enemy.classList.remove("move_enemy");
        enemy.style.display = "none"
        playing_game = false;
        num_plays += 1;
        
        show_finished_screen();
}


// Methods

function player_jump() {
    if(canJump && playing_game)  {
        canJump = false
        player.classList.add("jump") 
        setTimeout(() => {
            land();
        }, jump_speed)
    }
}


function land () {
    player.classList.remove("jump");
    canJump = true;
}

function check_collision () {
    
    // Get cordinates relative top game board
    let player_top = parseInt(window.getComputedStyle(player).getPropertyValue("top"))
    player_left = parseInt(window.getComputedStyle(player).getPropertyValue("left"))
    let player_bottom = player_top + 25;
    let enemy_left = parseInt(window.getComputedStyle(enemy).getPropertyValue("left"))
    let enemy_top = parseInt(window.getComputedStyle(enemy).getPropertyValue("top"))
    
    //console.log(`ETop ${enemy_top}, player_bottom: ${player_bottom}`);
    // check if they overlap
    if (enemy_left > 24 && enemy_left < 47 && enemy_top < player_bottom) {
        console.log('Collision')
        end_game()
    }   
}

function set_player_jump_interval (interval = Number) {
    jump_speed = interval;
    player.style.setProperty("animation-duration", `${jump_speed}ms`);
}

function set_enemy_movement_speed (interval = Number) { // ms 1000 = 1 second
    enemy_move_speed = interval;
    enemy.style.setProperty("animation-duration", `${enemy_move_speed}ms`);
}

function start_countdown () {
    return new Promise((resolve, reject) => {
        console.log("start_countdown")
        let time = 0;
        start_playing_text.style.background = "rgb(29, 33, 44)"
        start_playing_text.style.color = "cornflowerblue"
        t = setInterval (() => {
            
            time += 100;
            if(t > 0 && time <= 1000) {
                start_playing_text.innerText = "3";
            } else if (time > 1000 && time <= 2000) {
                start_playing_text.innerText = "2";
            }
            else if (time > 2000 && time <= 3000) {
                start_playing_text.innerText = "1";
            } else {
                start_playing_text.innerText = "Go!";
                time = 0;
                clearInterval(t)
            }


            
        }, 100)
        setTimeout(() => {
            resolve(t)
        }, 3300)
    });
}

function show_finished_screen () {
    clearInterval(t)
    showing_start_screen = false;
    start_playing_text.classList.remove("hidden")
    start_playing_text.style.display = "block"
    start_playing_text.style.backgroundColor = "white"
    start_playing_text.style.color = "rgb(29, 33, 44)"

    start_playing_text.innerHTML = "You Died!"
}

//resets stats text
function reset_stats () {
    active_timer = 0.0;
    
    time_text.innerHTML = `Time: ${active_timer}s`;
    difficulty_text.innerHTML = `Difficulty: ${localStorage.getItem("dificulty").toUpperCase()}`;
}