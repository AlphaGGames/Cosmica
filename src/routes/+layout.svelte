<script>
	import Navbar from "$lib/Navbar.svelte";
</script>
<Navbar />
<div class="content">
	<slot></slot>
</div>


<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: sans-serif;
		background: #111;
		color: #f1f1f1;
	}
	.content {
		width: 80%;
		padding-left: 10%;
		padding-top: 10px;
	}
</style>