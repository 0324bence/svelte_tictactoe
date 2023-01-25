<script lang="ts">
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import { redirect } from "@sveltejs/kit";
    import type { ActionData } from "./$types";
    import { Board } from "./game";

    export let form: ActionData;

    let width = 0,
        height = 0,
        goal = 0,
        rows = "",
        cols = "";

    if (form?.data?.width && form?.data?.goal && form?.data?.height) {
        width = parseInt(form?.data?.width);
        height = parseInt(form?.data?.height);
        goal = parseInt(form?.data?.goal);
    } else {
        if (browser) {
            goto("/");
        } else {
            redirect(302, "/");
        }
    }
    const board = new Board(width, height, goal);

    console.log(board);
</script>

<div id="container">
    <div id="player-name-container">
        <span>Player 1</span>
        <span>Player 2</span>
    </div>
    <div id="gamearea" style:aspect-ratio={width + " / " + height}>
        {#each board.table as cols}
            <div class="col">
                {#each cols as tile}
                    <div class="field" />
                {/each}
            </div>
        {/each}
    </div>
    <div id="buttons" />
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

        #gamearea {
            width: 140%;
            display: flex;
            align-items: stretch;
            justify-content: flex-start;
            background-color: black;
            padding: 3px;
            gap: 3px;

            .col {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: stretch;
                justify-content: flex-start;
                gap: inherit;

                .field {
                    flex: 1;
                    background-color: $foreground_color;
                    // width: 100%;
                    // height: 100%;
                }
            }
        }

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
