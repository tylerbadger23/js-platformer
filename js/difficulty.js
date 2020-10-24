let dif_selecter = document.getElementById("difficulty-select")
let save_btn = document.getElementById("save_btn")

dif_selecter.addEventListener("change", change_dificulty)

let temp_dificulty = {
    queue: false,
    player_height: jump_speed,
    enemy_speed: enemy_move_speed,
    difficulty: difficulty_level
}

dif_selecter.value = difficulty_level;

// event listeners
function change_dificulty () {
    if(dif_selecter.value == difficulty_level) {
        temp_dificulty.queue = false;
         hide_save_btn () 
    } else {
        temp_dificulty.queue = true;
        show_save_btn ()
        switch (dif_selecter.value) {
            case "easy":
                temp_dificulty.difficulty = "easy"
                temp_dificulty.enemy_speed = 1300
                temp_dificulty.player_height = 600
                break;
            case "chill":
                temp_dificulty.difficulty = "chill"
                temp_dificulty.enemy_speed = 1100
                temp_dificulty.player_height = 555
                break;
            case "normal":
                temp_dificulty.difficulty = "normal"
                temp_dificulty.enemy_speed = 900
                temp_dificulty.player_height = 535
                break;
            case "hard":
                temp_dificulty.difficulty = "hard"
                temp_dificulty.enemy_speed = 600
                temp_dificulty.player_height = 525
                break;
        
            default:
                temp_dificulty.difficulty = "easy"
                temp_dificulty.enemy_speed = 1300
                temp_dificulty.player_height = 600
        }
    }
    
    
}

function hide_save_btn () {
    save_btn.classList.add("inactive_btn")
    save_btn.classList.remove("show_btn")
}

function show_save_btn () {
    save_btn.classList.add("show_btn")
    save_btn.classList.remove("inactive_btn")
}

function set_player_jump_interval (interval = Number) {
    jump_speed = interval;
    player.style.setProperty("animation-duration", `${jump_speed}ms`);
}

function set_enemy_movement_speed (interval = Number) { // ms 1000 = 1 second
    enemy_move_speed = interval;
    enemy.style.setProperty("animation-duration", `${enemy_move_speed}ms`);
}

function save_new_settings () {
    if(temp_dificulty.queue == false) {
        hide_save_btn () 
    } else {
        set_enemy_movement_speed(temp_dificulty.enemy_speed);
        set_player_jump_interval(temp_dificulty.player_height);
        temp_dificulty.queue = false;

        localStorage.setItem("dificulty", temp_dificulty.difficulty);
        localStorage.setItem("enemy_speed", temp_dificulty.enemy_speed);
        localStorage.setItem("player_height", temp_dificulty.player_height);
        reset_stats()
    }
}

reset_stats()

set_enemy_movement_speed(temp_dificulty.enemy_speed);
set_player_jump_interval(temp_dificulty.player_height);