<script lang="ts">
    import { onMount } from "svelte";
    import io from "../../lib/realtime";

    type messageType = { from: string; message: string; date: Date };
    let messages = new Array<messageType>();

    let username = "Default name";

    onMount(() => {
        io.on("message", message => {
            // Listen to the message event
            messages = [...messages, message];
        });
        io.on("name", name => {
            // Another listener for the name:
            username = name; // Update the name so it can be displayed
        });
    });

    function sendMessage() {
        io.emit("message", "Button pressed"); // Send the message
    }
</script>

<h1>Welcome {username}</h1>
{#each messages as message}
    <h2>[{message.from}] {message.message}</h2>
{/each}
<button on:click={sendMessage}>Send</button>
