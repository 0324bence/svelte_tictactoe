<script lang="ts">
    let width = 3,
        height = 3,
        goal = 3;

    //create properties based on parameters
    let cols = (() => {
            let ret = "";
            for (let i = 0; i < width; i++) {
                ret += "1fr ";
            }
            return ret;
        })(),
        rows = (() => {
            let ret = "";
            for (let i = 0; i < height; i++) {
                ret += "1fr ";
            }
            return ret;
        })();

    $: {
        const max = Math.max(width, height);
        if (max < goal) goal = max;
        const min = Math.min(width, height);
        if (min > goal) goal = min;
    }
    //keep properties in range
    $: {
        const min = Math.min(width, 12);
        if (min < width) width = min;
        if (0 > width) width = 0;

        //react to parameter change
        cols = (() => {
            let ret = "";
            const count = width || 1;
            for (let i = 0; i < count; i++) {
                ret += "1fr ";
            }
            return ret;
        })();
    }
    $: {
        const min = Math.min(height, 12);
        if (min < height) height = min;
        if (0 > height) height = 0;

        //react to parameter change
        rows = (() => {
            let ret = "";
            const count = height || 1;
            for (let i = 0; i < count; i++) {
                ret += "1fr ";
            }
            return ret;
        })();
    }

    //keep goal between values
</script>

<div id="container">
    <h1>Create</h1>
    <div id="dimensions">
        <input type="number" bind:value={width} max="12" class="dimensions-input" />
        <span>X</span>
        <input type="number" bind:value={height} max="12" class="dimensions-input" />
    </div>
    <div id="goal">
        <h3>Goal</h3>
        <input type="number" bind:value={goal} max={Math.max(width, height)} class="dimensions-input" />
    </div>
    <div id="preview-container">
        <h2>Preview</h2>
        <div id="preview" style:grid-template-columns={cols} style:grid-template-rows={rows}>
            {#each new Array((width || 1) * (height || 1)) as i}
                <div class="rect" />
            {/each}
        </div>
    </div>
    <div id="create-container">
        <a href="" id="create">Create</a>
    </div>
</div>

<style lang="scss">
    @import "@/assets/variables.scss";

    #container {
        width: 100%;
        height: 100vh;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        background-color: $background_color;
        font-size: 2rem;

        #create-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            #create {
                @include button;
                display: block;
                width: 20rem;
            }
        }

        input {
            font-size: 2rem;
            background-color: $foreground_color;
            color: $background_color;
            border: none;
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        }

        #dimensions {
            display: flex;
            justify-content: center;
            gap: 0.6rem;
            align-items: center;
            input {
                width: 4.2rem;
                text-align: center;
            }
            span {
                font-weight: bolder;
                color: $foreground_color;
            }
        }

        #goal {
            display: flex;
            flex-direction: column;
            align-items: center;

            input {
                width: 5rem;
                text-align: center;
            }
        }

        #preview-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;

            #preview {
                box-sizing: content-box;
                background-color: black;
                display: grid;
                place-content: center;
                gap: 3px;
                padding: 3px;
            }

            .rect {
                background-color: $foreground_color;
                width: 3rem;
                height: 3rem;
            }
        }

        h1,
        h2,
        h3 {
            color: $foreground_color;
        }

        h1 {
            font-size: 9rem;
        }

        h2 {
            font-size: 5rem;
        }

        h3 {
            font-size: 3rem;
        }
    }
</style>
