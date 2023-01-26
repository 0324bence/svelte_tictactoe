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
        currplayer: 1 | 2 = 1,
        won = 0;

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
    let board = new Board(width, height, goal);

    function TileClick(col: number, row: number) {
        if (won == 0 && board.table[col][row] == 0) {
            board.table[col][row] = currplayer;
            const win = board.CheckForWin([col, row], currplayer);
            if (!win) {
                currplayer == 1 ? (currplayer = 2) : (currplayer = 1);
            } else {
                won = currplayer;
            }
        }
    }

    function Reset() {
        board = new Board(width, height, goal);
        currplayer = 1;
    }
</script>

<div id="container">
    <div id="player-name-container">
        <span id="player1" class={currplayer == 1 ? "active" : ""}>Player 1</span>
        <span id="player2" class={currplayer == 2 ? "active" : ""}>Player 2</span>
    </div>
    {#if won}
        <div id="wintext">
            <h1>{won == 1 ? "Player 1" : "Player 2"} won</h1>
        </div>
    {/if}
    <div id="gamearea" style:aspect-ratio={width + " / " + height}>
        {#each board.table as cols, colindex}
            <div class="col">
                {#each cols as tile, rowindex}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class="field" on:click={() => TileClick(colindex, rowindex)}>
                        {#if tile == 1}
                            <svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                width="50px"
                                height="50px"
                                viewBox="0 0 50 50"
                                enable-background="new 0 0 50 50"
                                xml:space="preserve"
                            >
                                <g id="Layer_3">
                                    <line
                                        id="path2"
                                        fill="none"
                                        stroke="#000000"
                                        stroke-width="3"
                                        stroke-miterlimit="10"
                                        x1="8.5"
                                        y1="41.5"
                                        x2="41.5"
                                        y2="8.5"
                                    />
                                    <line
                                        id="path3"
                                        fill="none"
                                        stroke="#000000"
                                        stroke-width="3"
                                        stroke-miterlimit="10"
                                        x1="41.5"
                                        y1="41.5"
                                        x2="8.5"
                                        y2="8.5"
                                    />
                                </g>
                            </svg>
                        {/if}
                        {#if tile == 2}
                            <svg
                                version="1.1"
                                id="circle"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                width="50px"
                                height="50px"
                                viewBox="0 0 100 100"
                                enable-background="new 0 0 50 50"
                                xml:space="preserve"
                            >
                                <circle
                                    fill="none"
                                    stroke="#000"
                                    stroke-width="5"
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    stroke-dasharray="360"
                                    stroke-linecap="round"
                                    transform="rotate(-90 ) translate(-100 0)"
                                >
                                    <animate attributeName="stroke-dashoffset" values="360;0" dur="0.20s" />
                                </circle>
                            </svg>
                        {/if}
                    </div>
                {/each}
            </div>
        {/each}
    </div>
    <div id="buttons">
        <button class="reset-button" on:click={Reset}>Reset</button>
    </div>
</div>

<style lang="scss">
    @import "@/assets/variables.scss";
    #container {
        width: 40%;
        min-height: 100vh;
        padding: 0 3rem 0 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        color: $foreground_color;
        gap: 1rem;

        #gamearea {
            width: 100%;
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
                    display: grid;
                    place-items: center;
                    aspect-ratio: 1 / 1;
                    // width: 100%;
                    // height: 100%;

                    svg {
                        height: 90%;
                        width: 90%;
                    }
                    #path2 {
                        stroke-dasharray: 430;
                        stroke-dashoffset: 800;
                        animation: x 0.1s linear;
                        animation-fill-mode: forwards;
                    }
                    #path3 {
                        stroke-dasharray: 430;
                        stroke-dashoffset: 800;
                        animation: x 0.1s linear;
                        animation-fill-mode: forwards;
                        animation-delay: 0.15s;
                    }
                    @keyframes x {
                        from {
                            stroke-dasharray: 430;
                        }
                        to {
                            stroke-dasharray: 400;
                        }
                    }
                }
            }
        }

        #player-name-container {
            display: flex;
            flex-wrap: wrap;
            width: 90%;
            align-items: center;
            justify-content: space-around;

            span {
                text-align: center;
                font-size: 3rem;
                position: relative;
                overflow: hidden;
            }
            #player1 {
                &::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    opacity: 1;
                    width: 100%;
                    height: 5%;
                    background-color: $foreground_color;
                    transition: transform 0.2s;
                    transform: translateX(-105%);
                }
                &.active::after {
                    transform: translateX(0);
                }
            }
            #player2 {
                &::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    opacity: 1;
                    width: 100%;
                    height: 5%;
                    background-color: $foreground_color;
                    transition: transform 0.2s;
                    transform: translateX(105%);
                }
                &.active::after {
                    transform: translateX(0);
                }
            }
        }

        #buttons {
            .reset-button {
                @include button;
                width: 20rem;
                border: none;
                outline: none;
            }
        }
    }

    @media screen and (max-width: 768px) {
        #container {
            width: 100%;
        }
    }
</style>
