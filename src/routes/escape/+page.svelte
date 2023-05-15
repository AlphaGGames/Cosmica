
<script>
	let url = "";
	import { goto } from "$app/navigation";

	let searchIt = () => {
		if (url) {
			goto(`/escape/https://google.com/search?q=${url}`)
		} else {
			alert("Please enter a URL");
		}
	}
</script>

<div class="holder">
	<div class="bar">
		<input placeholder="Search Blockless" bind:value={url}/>
		<button on:click={searchIt}>Go</button>
	</div>
	
</div>




<style>
	.holder {
		margin-top: 20vh;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.holder .bar {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
	}
	.bar input {
		all: unset;
		color: white;
		width: 100%;
		height: 100%;
		padding: 10px;
		border: none;
		border-radius: 50px 0 0 50px;
		margin-right: 5px;
		background: transparent;
		background: linear-gradient(to right, rgba(255, 16, 96, 0.2), rgba(255, 172, 6, 0.2));
	}
	.bar input:hover {
		background: linear-gradient(to right, rgba(255, 16, 96, 0.3), rgba(255, 172, 6, 0.3));
	}
	.bar input:focus {
		outline: none;
		background: linear-gradient(to right, rgba(255, 16, 96, 0.4), rgba(255, 172, 6, 0.4));
	}

	.holder button {
		padding: 10px;
		border: none;
		border-radius: 0px 50px 50px 0px;
		background: transparent;
		color: #fff;
		font-size: 1.5rem;
		background: rgba(255, 172, 6, 0.2);
		cursor: pointer;
	}
	.holder button:hover {
		background: rgba(255, 172, 6, 0.4);
	}
	
</style>
