<script lang="ts">
    import type { ActionData } from "./$types";

    export let form: ActionData;

    console.log(form);
</script>

<div id="container">
    <div id="player-name-container">
        <span>Player 1</span>
        <span>Player 2</span>
    </div>
</div>

<style lang="scss">
    @import "@/assets/variables.scss";
    #container {
        width: 30%;
        height: 100vh;
        padding: 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        color: $foreground_color;

        #player-name-container {
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-between;

            span {
                font-size: 3rem;
            }
        }
    }
</style>
