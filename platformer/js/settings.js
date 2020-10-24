// Player & Enemy
let enemy_move_speed = localStorage.getItem("enemy_speed") || 1300;
let jump_speed = localStorage.getItem("player_height") || 600;
let canJump = true; // player is Grounded

let playing_game = false
let showing_start_screen = true
let num_plays = 0;
// Score & Game  

let score
let difficulty_level = localStorage.getItem("dificulty") || "easy";


console.log(`${enemy_move_speed} + ${jump_speed} + ${difficulty_level}`)